import type { Auth } from "@/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialAuthState: Auth = { id: "", email: "", name: "", token: "", profile_image: "" };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    mutateAuth: (state, action: PayloadAction<Auth>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { mutateAuth } = authSlice.actions;
export default authSlice.reducer;
