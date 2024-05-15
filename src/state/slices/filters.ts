import type { Filters } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import * as Huge from "hugeicons-react";

export const sortOptions = [
  { label: "Latest", value: "latest", icon: Huge.FallingStarIcon },
  { label: "Popular", value: "popular", icon: Huge.CrownIcon }
];

const initialState: Filters = { search: "", sort: sortOptions[0].value };

const filtersSlice = createSlice({
  initialState,
  name: "filters-slice",
  reducers: {
    mutateFilters: (state, action: PayloadAction<Filters>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { mutateFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
