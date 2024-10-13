import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { addNewAddress, loginUser, registerUser } from "./authAPI";

export interface AuthSliceState {
  loggedInUser: { email: string; id: string; addresses: AddressType[] };
  error: string;
}

const initialState: AuthSliceState = {
  loggedInUser: { email: "", id: "", addresses: [] },
  error: "",
};

export const registerUserAsync = createAsyncThunk(
  "auth/register",
  async (registerData: { email: string; password: string }) => {
    const response = await registerUser(registerData);
    return response;
  },
);

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (loginData: { email: string; password: string }) => {
    const response = await loginUser(loginData);
    return response;
  },
);

// to add new address to current user
export const addNewAddressAsync = createAsyncThunk(
  "auth/addNewAddress",
  async ({ address, userId }: { address: AddressType; userId: string }) => {
    const response = await addNewAddress({ address, userId });
    return response;
  },
);

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({}),
  extraReducers: builder => {
    builder
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.loggedInUser = { email: "", id: "", addresses: [] };
        if (action.error.message) {
          state.error = action.error.message;
        }
      })
      .addCase(addNewAddressAsync.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      });
  },
  selectors: {
    selectLoggedInUser: state => state.loggedInUser,
    selectError: state => state.error,
  },
});

// Action creators are generated for each case reducer function.
// export const { increment } = authSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectLoggedInUser, selectError } = authSlice.selectors;

export default authSlice.reducer;
