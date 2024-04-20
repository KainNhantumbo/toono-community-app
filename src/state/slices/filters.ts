import type { Filters } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


const initialState: Filters = { search: "", sort: "", limit: "", offset: "" };

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
