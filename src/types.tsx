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
  ll84_query_input: string;
  ll84_year_selection: string;
  ll84_query_results: LL84QueryProperties[];
};

export type LL84QueryObjTypes = {
  key: string;
  endpoint: string;
  label: string;
  query_columns: string[];
  column_name_map: ColumnNameMapType;
};

export type ColumnNameMapType = string[][];

export type LL84QueryProperties = {
  property_name: string;
  property_id: string;
  nyc_bbl: string;
  nyc_bin: string;
  "1st_property_use_type": string;
  "1st_property_use_sf": string;
  "2nd_property_use_type": string;
  "2nd_property_use_sf": string;
  "3rd_property_use_type": string;
  "3rd_property_use_sf": string;
  fuel_oil_2_use_kbtu: string;
  fuel_oil_4_use_kbtu: string;
  district_steam_use_kbtu: string;
  natural_gas_use_kbtu: string;
  electricity_use_kbtu: string;
};

export type StringObjectType = { [key: string]: string };
