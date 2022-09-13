import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  LL84QueryPropertyTypes,
  BuildingOutputSliceTypes,
  LL84YearTypes,
} from "types";

const initialState: any = {}; //BuildingOutputSliceTypes = {};

export const buildingOutputSlice = createSlice({
  name: "building_outputs",
  initialState: initialState,
  reducers: {
    doSomething: (state, action: PayloadAction<any>) => {
      return;
    },
  },
});

export const buildingOutputActions = buildingOutputSlice.actions;

export default buildingOutputSlice.reducer;
