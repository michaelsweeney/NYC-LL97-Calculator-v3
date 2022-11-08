import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  LL84QueryPropertyTypes,
  LL84QuerySliceTypes,
  LL84YearTypes,
} from "types";

const initialState: LL84QuerySliceTypes = {
  ll84_query_input: "",
  ll84_year_selection: "ll84_2022_cal_2021",
  ll84_query_results: [] as LL84QueryPropertyTypes[],
  ll84_selected_property: {} as LL84QueryPropertyTypes,
  is_ll84_loaded: false,
  is_ll84_overridden: false,
};

export const ll84QuerySlice = createSlice({
  name: "ll84_query_slice",
  initialState: initialState,
  reducers: {
    setLL84QueryInput: (state, action: PayloadAction<string>) => {
      state.ll84_query_input = action.payload;
    },
    setLL84YearSelection: (state, action: PayloadAction<LL84YearTypes>) => {
      state.ll84_year_selection = action.payload;
    },
    setIsLL84Loaded: (state, action: PayloadAction<boolean>) => {
      state.is_ll84_loaded = action.payload;
    },
    setIsLL84Overriden: (state, action: PayloadAction<boolean>) => {
      state.is_ll84_overridden = action.payload;
    },
    setLL84QueryResultsResponse: (
      state,
      action: PayloadAction<LL84QueryPropertyTypes[]>
    ) => {
      state.ll84_query_results = action.payload;
    },
    setSelectedLL84Property: (
      state,
      action: PayloadAction<LL84QueryPropertyTypes>
    ) => {
      state.ll84_selected_property = action.payload;
      state.is_ll84_loaded = true;
      state.is_ll84_overridden = false;
    },
  },
});

export const ll84QueryActions = ll84QuerySlice.actions;

export default ll84QuerySlice.reducer;
