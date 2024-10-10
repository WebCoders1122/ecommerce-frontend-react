import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import {
  fetchBrands,
  fetchCategories,
  fetchProductById,
  fetchProductsBy__Query,
} from "./productListAPI";

export interface ProductSliceStateType {
  leading: boolean;
  products: ProductType[];
  error: string;
  brands: CategoryType[];
  categories: CategoryType[];
  totalProducts: number;
  product: ProductType;
}

const initialState: ProductSliceStateType = {
  leading: false,
  products: [],
  error: "",
  brands: [],
  categories: [],
  totalProducts: 0,
  product: {
    id: 0,
    title: "",
    description: "",
    category: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [""],
    brand: "",
    sku: "",
    weight: 0,
    dimensions: { width: 0, height: 0, depth: 0 },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    reviews: [
      {
        rating: 0,
        comment: "",
        date: "",
        reviewerName: "",
        reviewerEmail: "",
      },
    ],
    returnPolicy: "",
    minimumOrderQuantity: 0,
    meta: {
      createdAt: "",
      updatedAt: "",
      barcode: "",
      qrCode: "",
    },
    images: [""],
    thumbnail: "",
  },
};
// to fetch products on any query
export const fetchProductsByQuery = createAsyncThunk(
  "products/fetchProductsByQuery",
  async ({
    filters,
    sort,
    pagination,
  }: {
    filters?: FilterOptionsType[];
    sort?: SortOptionsType;
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
// to fetch brands
export const fetchBrandsAsync = createAsyncThunk(
  "products/fetchBrands",
  async () => {
    const response: CategoryType[] = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
);
// to fetch categories
export const fetchCategoriesAsync = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response: CategoryType[] = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response;
  },
);
//to fetch product by id
export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    const response: ProductType = await fetchProductById(id);
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
          state.products = action.payload.products;
          state.totalProducts = action.payload.totalProducts;
          state.error = "";
        },
      )
      .addCase(fetchProductsByQuery.rejected, state => {
        state.leading = false;
        state.error = "Error fetching products";
      })
      // todo: add loading
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
  // You can define your selectors here. These selectors receive the slice
  selectors: {
    selectAllProducts: products => products.products,
    selectLeading: products => products.leading,
    selectBrands: products => products.brands,
    selectCategories: products => products.categories,
    selectTotalProducts: products => products.totalProducts,
    selectProduct: products => products.product,
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
  selectProduct,
} = ProductSlice.selectors;

//exporting reducer
export default ProductSlice.reducer;
