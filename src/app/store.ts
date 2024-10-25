import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/ProductList/productListSlice";
import AuthReducer from "../features/auth/authSlice";
import CartReducer from "../features/cart/cartSlice";
import OrderReducer from "../features/order/orderSlice";
import UserReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    auth: AuthReducer,
    cart: CartReducer,
    order: OrderReducer,
    user: UserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
