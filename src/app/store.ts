import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/ProductList/productListSlice";
import AuthReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    auth: AuthReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
