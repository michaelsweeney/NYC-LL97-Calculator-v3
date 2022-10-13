import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UiSliceTypes, ViewTypes } from "types";

const initialState: UiSliceTypes = {
  is_info_modal_open: false,
  is_load_modal_open: false,
  is_building_summary_modal_open: false,
  active_view: "carbon",
  is_print_mode: true,
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
    setIsBuildingSummaryModalOpen: (state, action: PayloadAction<boolean>) => {
      state.is_building_summary_modal_open = action.payload;
    },
    setActiveView: (state, action: PayloadAction<ViewTypes>) => {
      state.active_view = action.payload;
    },
    setIsPrintMode: (state, action: PayloadAction<boolean>) => {
      state.is_print_mode = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
