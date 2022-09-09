import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { StringObjectType, LL84QueryProperties, UiSliceTypes } from "types";

const initialState: UiSliceTypes = {
  is_info_modal_open: false,
  is_load_modal_open: true,
  ll84_query_input: "",
  ll84_year_selection: "ll84_2020_cal_2019",
  ll84_query_results: [],
};

export const uiSlice = createSlice({
  name: "ui_slice",
  initialState: initialState,
  reducers: {
    setIsInfoModalOpen: (state, action: PayloadAction<boolean>) => {
      state.is_info_modal_open = action.payload;
    },
    setIsLoadModalOpen: (state, action: PayloadAction<boolean>) => {
      state.is_load_modal_open = action.payload;
    },
    setLL84QueryInput: (state, action: PayloadAction<string>) => {
      state.ll84_query_input = action.payload;
    },
    setLL84YearSelection: (state, action: PayloadAction<string>) => {
      state.ll84_year_selection = action.payload;
    },
    setLL84QueryResultsResponse: (
      state,
      action: PayloadAction<LL84QueryProperties[]>
    ) => {
      state.ll84_query_results = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export const { setIsInfoModalOpen, setIsLoadModalOpen } = uiSlice.actions;

export default uiSlice.reducer;
