import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FilterSliceType = {
  search: string;
  offset: string;
  limit: string;
  sort: string;
};

const initialState: FilterSliceType = { search: "", sort: "", limit: "", offset: "" };

const filtersSlice = createSlice({
  initialState,
  name: "filters-slice",
  reducers: {
    updateFilters: (state, action: PayloadAction<FilterSliceType>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
