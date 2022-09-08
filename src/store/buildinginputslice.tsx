import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "types";

import { default_utility_rates } from "ll97/lookups";

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
      rate: default_utility_rates.elec,
    },
    gas: {
      consumption: 10000,
      rate: default_utility_rates.gas,
    },
    steam: {
      consumption: 250,
      rate: default_utility_rates.steam,
    },
    fuel_two: {
      consumption: 500,
      rate: default_utility_rates.fuel_two,
    },
    fuel_four: {
      consumption: 0,
      rate: default_utility_rates.fuel_four,
    },
  },
  is_default_rates: true,
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

    setIsDefaultRates: (
      state,
      action: PayloadAction<{ is_default_rates: boolean }>
    ) => {
      let { is_default_rates } = action.payload;
      state.is_default_rates = is_default_rates;

      if (is_default_rates) {
        state.utilities.elec.rate = default_utility_rates.elec;
        state.utilities.steam.rate = default_utility_rates.steam;
        state.utilities.gas.rate = default_utility_rates.gas;
        state.utilities.fuel_two.rate = default_utility_rates.fuel_two;
        state.utilities.fuel_four.rate = default_utility_rates.fuel_four;
      }
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
