import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { loginUser, registerUser } from "./authAPI";

export interface AuthSliceState {
  loggedInUser: string;
  error: string;
}

const initialState: AuthSliceState = {
  loggedInUser: "",
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
        state.loggedInUser = "";
        if (action.error.message) {
          state.error = action.error.message;
        }
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
