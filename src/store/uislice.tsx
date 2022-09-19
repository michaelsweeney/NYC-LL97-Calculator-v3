import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UiSliceTypes, ViewTypes, WidthHeightDimensionTypes } from "types";

const initialState: UiSliceTypes = {
  is_info_modal_open: false,
  is_load_modal_open: false,
  is_building_summary_modal_open: false,
  active_view: "carbon",
  active_view_dimensions: {
    width: 50,
    height: 50,
  },
  are_dimensions_initialized: false,
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

    setActiveWindowDimensions: (
      state,
      action: PayloadAction<WidthHeightDimensionTypes>
    ) => {
      state.active_view_dimensions = action.payload;
      state.are_dimensions_initialized = true;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
