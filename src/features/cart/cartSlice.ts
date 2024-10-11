import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { addToCart } from "./cartAPI";

export interface CartSliceState {
  cartProducts: ProductToAddType[];
  loading: boolean;
  error: string;
}

const initialState: CartSliceState = {
  cartProducts: [],
  loading: false,
  error: "",
};

// to add product in cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (product: ProductToAddType) => {
    const response = await addToCart(product);
    return response;
  },
);

// to get products from cart

export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: create => ({}),
  extraReducers: builder => {
    builder
      .addCase(addToCartAsync.pending, state => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addToCartAsync.rejected, state => {
        state.loading = false;
        state.error = "Failed to add to cart";
      });
  },
  selectors: {
    selectCartProducts: cart => cart.cartProducts,
    selectStatus: cart => cart.loading,
    selectError: cart => cart.error,
  },
});

// Action creators are generated for each case reducer function.
// export const { decrement, increment, incrementByAmount, incrementAsync } =
//   cartSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectCartProducts, selectStatus, selectError } =
  cartSlice.selectors;

export default cartSlice.reducer;
