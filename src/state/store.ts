import { configureStore } from "@reduxjs/toolkit";
import FiltersReducer from "@/state/slices/filters";
import AuthReducer from "./slices/auth";

export const store = configureStore({
  reducer: { filters: FiltersReducer, auth: AuthReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
