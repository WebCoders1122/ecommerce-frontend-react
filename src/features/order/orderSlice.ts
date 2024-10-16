import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { createNewOrder } from "./orderAPI";

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

export const cartSlice = createAppSlice({
  name: "order",
  initialState,
  reducers: create => ({}),
  extraReducers: builder => {
    builder.addCase(createNewOrderAsync.fulfilled, (state, action) => {
      state.placement = true;
      state.orders.push(action.payload);
      state.currentOrder = action.payload;
    });
  },
  selectors: {
    selectOrders: state => state.orders,
    selectPlacement: state => state.placement,
    selectCurrentOrder: state => state.currentOrder,
  },
});

// Action creators are generated for each case reducer function.
// export const { decrement, increment, incrementByAmount, incrementAsync } =
//   cartSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectOrders, selectPlacement, selectCurrentOrder } =
  cartSlice.selectors;

export default cartSlice.reducer;
