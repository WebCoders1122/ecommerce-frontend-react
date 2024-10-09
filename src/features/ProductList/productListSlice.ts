import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { fetchProductsBy__Query } from "./productListAPI";

export interface ProductSliceStateType {
  leading: boolean;
  products: ProductType[];
  error: string;
  brands: CategoryType[];
  categories: CategoryType[];
  totalProducts: number;
}

const initialState: ProductSliceStateType = {
  leading: false,
  products: [],
  error: "",
  brands: [
    {
      value: "Essence",
      label: "Essence",
      checked: false,
    },
    {
      value: "Glamour Beauty",
      label: "Glamour Beauty",
      checked: false,
    },
    {
      value: "Velvet Touch",
      label: "Velvet Touch",
      checked: false,
    },
    {
      value: "Chic Cosmetics",
      label: "Chic Cosmetics",
      checked: false,
    },
    {
      value: "Nail Couture",
      label: "Nail Couture",
      checked: false,
    },
    {
      value: "Calvin Klein",
      label: "Calvin Klein",
      checked: false,
    },
    {
      value: "Chanel",
      label: "Chanel",
      checked: false,
    },
    {
      value: "Dior",
      label: "Dior",
      checked: false,
    },
    {
      value: "Dolce & Gabbana",
      label: "Dolce & Gabbana",
      checked: false,
    },
    {
      value: "Gucci",
      label: "Gucci",
      checked: false,
    },
    {
      value: "Annibale Colombo",
      label: "Annibale Colombo",
      checked: false,
    },
    {
      value: "Furniture Co.",
      label: "Furniture Co.",
      checked: false,
    },
    {
      value: "Knoll",
      label: "Knoll",
      checked: false,
    },
    {
      value: "Bath Trends",
      label: "Bath Trends",
      checked: false,
    },
    {
      value: "Apple",
      label: "Apple",
      checked: false,
    },
    {
      value: "Asus",
      label: "Asus",
      checked: false,
    },
    {
      value: "Huawei",
      label: "Huawei",
      checked: false,
    },
    {
      value: "Lenovo",
      label: "Lenovo",
      checked: false,
    },
    {
      value: "Dell",
      label: "Dell",
      checked: false,
    },
    {
      value: "Fashion Trends",
      label: "Fashion Trends",
      checked: false,
    },
    {
      value: "Gigabyte",
      label: "Gigabyte",
      checked: false,
    },
    {
      value: "Classic Wear",
      label: "Classic Wear",
      checked: false,
    },
    {
      value: "Casual Comfort",
      label: "Casual Comfort",
      checked: false,
    },
    {
      value: "Urban Chic",
      label: "Urban Chic",
      checked: false,
    },
    {
      value: "Nike",
      label: "Nike",
      checked: false,
    },
    {
      value: "Puma",
      label: "Puma",
      checked: false,
    },
    {
      value: "Off White",
      label: "Off White",
      checked: false,
    },
    {
      value: "Fashion Timepieces",
      label: "Fashion Timepieces",
      checked: false,
    },
    {
      value: "Longines",
      label: "Longines",
      checked: false,
    },
    {
      value: "Rolex",
      label: "Rolex",
      checked: false,
    },
    {
      value: "Amazon",
      label: "Amazon",
      checked: false,
    },
  ],
  categories: [
    {
      value: "Beauty",
      label: "Beauty",
      checked: false,
    },
    {
      value: "Fragrances",
      label: "Fragrances",
      checked: false,
    },
    {
      value: "Furniture",
      label: "Furniture",
      checked: false,
    },
    {
      value: "Groceries",
      label: "Groceries",
      checked: false,
    },
    {
      value: "Home decoration",
      label: "Home decoration",
      checked: false,
    },
    {
      value: "Kitchen accessories",
      label: "Kitchen accessories",
      checked: false,
    },
    {
      value: "Laptops",
      label: "Laptops",
      checked: false,
    },
    {
      value: "Mens shirts",
      label: "Mens shirts",
      checked: false,
    },
    {
      value: "Mens shoes",
      label: "Mens shoes",
      checked: false,
    },
    {
      value: "Mens watches",
      label: "Mens watches",
      checked: false,
    },
    {
      value: "Mobile accessories",
      label: "Mobile accessories",
      checked: false,
    },
  ],
  totalProducts: 0,
};

export const fetchProductsByQuery = createAsyncThunk(
  "products/fetchProductsByQuery",
  async ({
    filters,
    sort,
    pagination,
  }: {
    filters?: FilterOptionsType[];
    sort?: SortOptionsType[];
    pagination?: PaginationType;
  }) => {
    const response: {
      products: ProductType[];
      totalProducts: number;
    } = await fetchProductsBy__Query({
      filters,
      sort,
      pagination,
    });
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
);

export const ProductSlice: any = createAppSlice({
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
      .addCase(fetchProductsByQuery.pending, state => {
        state.leading = true;
        state.error = "";
      })
      .addCase(
        fetchProductsByQuery.fulfilled,
        (
          state,
          action: PayloadAction<{
            products: ProductType[];
            totalProducts: number;
          }>,
        ) => {
          state.leading = false;

          //finding unique products
          state.products = action.payload.products.filter(
            product => product.brand !== undefined,
          );
          state.totalProducts = action.payload.totalProducts;
          state.error = "";
        },
      )
      .addCase(fetchProductsByQuery.rejected, state => {
        state.leading = false;
        state.error = "Error fetching products";
      });
  },
  // You can define your selectors here. These selectors receive the slice
  selectors: {
    selectAllProducts: products => products.products,
    selectLeading: products => products.leading,
    selectBrands: products => products.brands,
    selectCategories: products => products.categories,
    selectTotalProducts: products => products.totalProducts,
  },
});

// exporting actions
// export const { write actions here } =
//   ProductSlice.actions

//exporiting selectors
export const {
  selectAllProducts,
  selectLeading,
  selectBrands,
  selectCategories,
  selectTotalProducts,
} = ProductSlice.selectors;

//exporting reducer
export default ProductSlice.reducer;
