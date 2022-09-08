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
  building_types: BuildingType[];
  utilities: UtilityConsumptionType;
  is_default_rates: boolean;
};

export type UiSliceTypes = {
  is_load_modal_open: boolean;
  is_info_modal_open: boolean;
};
