import type { Filters } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const initialState: Filters = { search: "", sort: "", limit: "", offset: "" };

const filtersSlice = createSlice({
  initialState,
  name: "filters-slice",
  reducers: {
    updateFilters: (state, action: PayloadAction<Filters>) => {
      state = action.payload;
      return state;
    }
  }
});

export const { updateFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
