import type { Filters } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const sortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Popular", value: "popular" }
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
