import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { createNewOrder } from "./orderAPI";

export interface OrderSliceState {
  orders: OrderType[];
  status: "idle" | "loading" | "failed";
}

const initialState: OrderSliceState = {
  orders: [],
  status: "idle",
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
      state.status = "idle";
      state.orders.push(action.payload);
    });
  },
  selectors: {
    selectOrders: state => state.orders,
  },
});

// Action creators are generated for each case reducer function.
// export const { decrement, increment, incrementByAmount, incrementAsync } =
//   cartSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectOrders } = cartSlice.selectors;

export default cartSlice.reducer;
