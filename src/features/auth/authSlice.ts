import { createAppSlice } from "../../app/createAppSlice"
import { fetchAuth } from "./authAPI"

export interface AuthSliceState {
  value: number
  status: "idle" | "loading" | "failed"
}

const initialState: AuthSliceState = {
  value: 0,
  status: "idle",
}

export const authSlice = createAppSlice({
  name: "auth",
  initialState,
  reducers: create => ({}),
  selectors: {
    selectAuth: auth => auth.value,
  },
})

// Action creators are generated for each case reducer function.
// export const { increment } = authSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectAuth } = authSlice.selectors
