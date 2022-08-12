export type UtilityInputType = {
  consumption: number;
  rate: number;
};
export type UtilityConsumptionType = {
  elec: UtilityInputType;
  gas: UtilityInputType;
  steam: UtilityInputType;
  fuel_two: UtilityInputType;
  fuel_four: UtilityInputType;
};

export type BuildingType = {
  building_id: number;
  building_type: string;
  building_area: number;
};

export type BuildingInputTypes = {
  building_inputs: BuildingType[];
  utility_inputs: UtilityConsumptionType;
};
