import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/ProductList/productListSlice";
import AuthReducer from "../features/auth/authSlice";
import CartReducer from "../features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    auth: AuthReducer,
    cart: CartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
