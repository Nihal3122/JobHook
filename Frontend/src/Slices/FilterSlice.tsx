import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {},
  reducers: {
    updateFilter: (state, action) => {
      state = { ...state, ...action.payload };
      return state;
    },
    resetFilter: (state) => {
      state = {};
      return state;
    },
  },
});

export default filterSlice.reducer;
export const { updateFilter, resetFilter } = filterSlice.actions;
