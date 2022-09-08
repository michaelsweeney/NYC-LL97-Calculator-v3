import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "types";

const initialState: types.UiSliceTypes = {
  is_info_modal_open: false,
  is_load_modal_open: false,
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
  },
});

export const uiActions = uiSlice.actions;

export const { setIsInfoModalOpen, setIsLoadModalOpen } = uiSlice.actions;

export default uiSlice.reducer;
