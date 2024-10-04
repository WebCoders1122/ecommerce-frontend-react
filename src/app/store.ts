import { configureStore } from "@reduxjs/toolkit"
import ProductReducer from "../features/ProductList/productListSlice"

export const store = configureStore({
  reducer: {
    products: ProductReducer,
  },
})

export type AppDispatch = typeof store.dispatch
