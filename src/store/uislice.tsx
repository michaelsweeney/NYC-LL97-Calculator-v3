import { height } from "@mui/system";
import { current } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UiSliceTypes, WindowDimensionTypes, ChartViewTypes } from "types";

const initialState: UiSliceTypes = {
  is_info_modal_open: false,
  is_load_modal_open: false,
  is_building_summary_modal_open: false,

  is_print_mode: false,
  window_dimensions: {
    width: 0,
    height: 0,
  },
  small_window: false,
  chart_view: {
    view_type: "carbon",
    unit_type: "absolute",
    stack_type: "summary",
  },
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

    setIsPrintMode: (state, action: PayloadAction<boolean>) => {
      state.is_print_mode = action.payload;
    },
    setWindowDimensions: (
      state,
      action: PayloadAction<WindowDimensionTypes>
    ) => {
      state.window_dimensions = action.payload;
    },
    setSmallWindow: (state, action: PayloadAction<boolean>) => {
      state.small_window = action.payload;
    },
    setChartView: (
      state,
      action: PayloadAction<{ view_key: string; view_value: string }>
    ) => {
      const { view_key, view_value } = action.payload;
      //@ts-ignore
      state.chart_view[view_key] = view_value;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
