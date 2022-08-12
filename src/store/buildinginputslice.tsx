import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "types";

const initialState: types.BuildingInputTypes = {
  building_types: [
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
  utilities: {
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

export const buildingInputSlice = createSlice({
  name: "building_inputs",
  initialState: initialState,
  reducers: {
    setBuildingType: (
      state,
      action: PayloadAction<{ id: number; value: string }>
    ) => {
      let { id, value } = action.payload;
      let { building_types } = state;
      let to_change = building_types.find((d) => d.building_id === id);
      if (to_change) {
        to_change.building_type = value;
      }
    },

    setBuildingArea: (
      state,
      action: PayloadAction<{ id: number; value: number }>
    ) => {
      let { id, value } = action.payload;
      let { building_types } = state;
      let to_change = building_types.find((d) => d.building_id === id);
      if (to_change) {
        to_change.building_area = value;
      }
    },

    setFuelConsumption: (
      state,
      action: PayloadAction<{ fuel: string; value: number }>
    ) => {
      let { fuel, value } = action.payload;
      //@ts-ignore
      state.utilities[fuel].consumption = value;
    },

    setFuelRate: (
      state,
      action: PayloadAction<{ fuel: string; value: number }>
    ) => {
      let { fuel, value } = action.payload;
      //@ts-ignore
      state.utilities[fuel].rate = value;
    },

    removeBuildingType: (state, action: PayloadAction<{ id: number }>) => {
      let { id } = action.payload;
      state.building_types = state.building_types.filter(
        (d) => d.building_id !== id
      );
    },

    addBuildingType: (state, action: PayloadAction<{}>) => {
      let building_ids = [
        ...new Set(state.building_types.map((d) => d.building_id)),
      ];
      let new_id = Math.max(...building_ids) + 1;

      let type_to_copy = { ...state.building_types[0], building_id: new_id };

      state.building_types.push(type_to_copy);
    },
  },
});

export const buildingInputActions = buildingInputSlice.actions;

export const {
  setBuildingArea,
  setBuildingType,
  setFuelConsumption,
  setFuelRate,
  removeBuildingType,
  addBuildingType,
} = buildingInputSlice.actions;

export default buildingInputSlice.reducer;
