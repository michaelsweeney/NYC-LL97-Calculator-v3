import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "types";

const initialState: types.BuildingInputTypes = {
  building_inputs: [
    {
      building_id: 0,
      building_type: "B_norm",
      building_area: 50000,
    },
    {
      building_id: 1,
      building_type: "A",
      building_area: 3000,
    },
  ],
  utility_inputs: {
    elec: {
      consumption: 750000,
      rate: 0.193,
    },
    gas: {
      consumption: 10000,
      rate: 1.001,
    },
    steam: {
      consumption: 250,
      rate: 32.8,
    },
    fuel_two: {
      consumption: 500,
      rate: 1.43,
    },
    fuel_four: {
      consumption: 0,
      rate: 1.43,
    },
  },
};

export const UiSlice = createSlice({
  name: "building_inputs",
  initialState: initialState,
  reducers: {
    createDemoBuilding: (
      state,
      action: PayloadAction<{ key: string; bool: boolean }>
    ) => {
      return;
    },
    createDefaultBuilding: (
      state,
      action: PayloadAction<{ key: string; bool: boolean }>
    ) => {
      return;
    },
  },
});

export const { createDefaultBuilding, createDemoBuilding } = UiSlice.actions;

export default UiSlice.reducer;
