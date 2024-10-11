import { createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import {
  addToCart,
  fetchCartProductsByUserId,
  updateProductQuantity,
} from "./cartAPI";

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
export const fetchCartProductsByUserIdAsync = createAsyncThunk(
  "cart/fetchCartProducts",
  async (userId: string) => {
    const response = await fetchCartProductsByUserId(userId);
    return response;
  },
);
// to update product quantity
export const updateProductQuantityAsync = createAsyncThunk(
  "cart/updateProductQuantity",
  async (update: ProductToAddType) => {
    const response = await updateProductQuantity(update);
    return response;
  },
);

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
      })
      .addCase(fetchCartProductsByUserIdAsync.pending, state => {
        state.loading = true;
      })
      .addCase(fetchCartProductsByUserIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload;
      })
      .addCase(fetchCartProductsByUserIdAsync.rejected, state => {
        state.loading = false;
        state.error = "Failed to fetch cart products";
      })
      .addCase(updateProductQuantityAsync.pending, state => {
        state.loading = true;
      })
      .addCase(updateProductQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        let index = state.cartProducts.findIndex(
          product => product.id === action.payload.id,
        );
        state.cartProducts[index] = action.payload;
        console.log(action.payload);
      })
      .addCase(updateProductQuantityAsync.rejected, state => {
        state.loading = false;
        state.error = "Failed to update product quantity";
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
