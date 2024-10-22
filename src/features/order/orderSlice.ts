import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { createNewOrder, fetchUserOrderById } from "./orderAPI";

export interface OrderSliceState {
  orders: OrderType[];
  placement: boolean;
  currentOrder: OrderType;
}

const initialState: OrderSliceState = {
  orders: [],
  placement: false,
  currentOrder: {} as OrderType,
};

//create new order
export const createNewOrderAsync = createAsyncThunk(
  "order/createNewOrder",
  async (order: OrderType) => {
    const response = await createNewOrder(order);
    return response;
  },
);
// to fetch all orders by userid
export const fetchUserOrderByIdAsync = createAsyncThunk(
  "order/fetchUserOrderById",
  async (userId: string) => {
    const response = await fetchUserOrderById(userId);
    return response;
  },
);

export const cartSlice = createAppSlice({
  name: "order",
  initialState,
  reducers: create => ({
    resetOrder: create.reducer((state, action) => {
      state.placement = false;
      state.currentOrder = {} as OrderType;
    }),
  }),
  extraReducers: builder => {
    builder
      .addCase(createNewOrderAsync.fulfilled, (state, action) => {
        state.placement = true;
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchUserOrderByIdAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
  selectors: {
    selectOrders: state => state.orders,
    selectPlacement: state => state.placement,
    selectCurrentOrder: state => state.currentOrder,
  },
});

// Action creators are generated for each case reducer function.
export const { resetOrder } = cartSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectOrders, selectPlacement, selectCurrentOrder } =
  cartSlice.selectors;

export default cartSlice.reducer;
