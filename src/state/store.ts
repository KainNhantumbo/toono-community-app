import { configureStore } from "@reduxjs/toolkit";
import FiltersReducer from "@/state/slices/filters";

export const store = configureStore({
  reducer: { filters: FiltersReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
