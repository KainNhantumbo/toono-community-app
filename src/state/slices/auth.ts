import type { Auth } from "@/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Auth = { id: "", email: "", name: "", token: "", profile_image: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    mutateAuth: (state, action: PayloadAction<Auth>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { mutateAuth } = authSlice.actions;
export default authSlice.reducer;
