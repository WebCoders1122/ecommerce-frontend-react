import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { fetchProducts } from "./productListAPI"

export interface ProductSliceStateType {
  leading: boolean
  products: ProductType[]
  error: string
}

const initialState: ProductSliceStateType = {
  leading: false,
  products: [],
  error: "",
}

//creating async function to fetch products
export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response: ProductType[] = await fetchProducts()
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const ProductSlice = createAppSlice({
  name: "products",
  initialState,
  reducers: create => ({
    // increment: create.reducer(state => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // }),
    // Use the `PayloadAction` type to declare the contents of `action.payload`
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
    // incrementAsync: create.asyncThunk(
    //   async (amount: number) => {
    //     const response = await fetchProducts(amount)
    //     // The value we return becomes the `fulfilled` action payload
    //     return response.data
    //   },
    //   {
    //     pending: state => {
    //       state.status = "loading"
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle"
    //       state.value += action.payload
    //     },
    //     rejected: state => {
    //       state.status = "failed"
    //     },
    //   },
    // ),
  }),
  extraReducers: builder => {
    builder
      .addCase(fetchAllProductsAsync.pending, state => {
        state.leading = true
        state.error = ""
      })
      .addCase(
        fetchAllProductsAsync.fulfilled,
        (state, action: PayloadAction<ProductType[]>) => {
          state.leading = false
          state.products = action.payload
          state.error = ""
        },
      )
      .addCase(fetchAllProductsAsync.rejected, state => {
        state.leading = false
        state.error = "Error fetching products"
      })
  },
  // You can define your selectors here. These selectors receive the slice
  selectors: {
    selectAllProducts: products => products.products,
    selectLeading: products => products.leading,
  },
})

// exporting actions
// export const { write actions here } =
//   ProductSlice.actions

//exporiting selectors
export const { selectAllProducts, selectLeading } = ProductSlice.selectors

//exporting reducer
export default ProductSlice.reducer
