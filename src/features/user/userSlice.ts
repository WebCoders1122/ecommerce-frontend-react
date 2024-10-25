import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { addNewAddress, getUserInfo } from "./userAPI";

export interface UserSliceState {
  userInfo: UserInfoType;
  error: string;
}

const initialState: UserSliceState = {
  userInfo: {} as UserInfoType,
  error: "",
};

//to get user info
export const getUserInfoAsync = createAsyncThunk(
  "user/getUserInfo",
  async (userId: string) => {
    const response = await getUserInfo(userId);
    return response;
  },
);

// to add new address to current user
export const addNewAddressAsync = createAsyncThunk(
  "user/addNewAddress",
  async ({ address, userId }: { address: AddressType; userId: string }) => {
    const response = await addNewAddress({ address, userId });
    return response;
  },
);

export const userSlice = createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({}),
  extraReducers: builder => {
    builder
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(addNewAddressAsync.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
  selectors: {
    selectUserInfo: state => state.userInfo,
    selectError: state => state.error,
  },
});

// Action creators are generated for each case reducer function.
// export const { increment } = authSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectUserInfo, selectError } = userSlice.selectors;

export default userSlice.reducer;

// todo: make addresses working
// todo: make user info type for user profile page
