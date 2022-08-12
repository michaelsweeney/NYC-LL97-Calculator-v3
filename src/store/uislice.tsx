import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "types";

const initialState: any = {
  some_state: [],
};

export const UiSlice = createSlice({
  name: "ui_settings",
  initialState: initialState,
  reducers: {
    someReducer: (
      state,
      action: PayloadAction<{ key: string; bool: boolean }>
    ) => {
      return;
    },
  },
});

export const {} = UiSlice.actions;

export default UiSlice.reducer;
