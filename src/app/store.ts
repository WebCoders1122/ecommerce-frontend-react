import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/ProductList/productListSlice";
import AuthReducer from "../features/auth/authSlice";
import CartReducer from "../features/cart/cartSlice";
import OrderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    auth: AuthReducer,
    cart: CartReducer,
    order: OrderReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
