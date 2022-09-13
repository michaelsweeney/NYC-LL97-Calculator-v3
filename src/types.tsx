export type UtilityInputType = {
  consumption: number;
  rate?: number;
};
export type UtilityConsumptionType = {
  elec: UtilityInputType;
  gas: UtilityInputType;
  steam: UtilityInputType;
  fuel_two: UtilityInputType;
  fuel_four: UtilityInputType;
};

export type ElectricOnsiteGenerationType = {
  photovoltaic: {
    consumption: number;
  };
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
  electric_onsite_generation: ElectricOnsiteGenerationType;
};

export type LL84YearTypes =
  | "ll84_2021_cal_2020"
  | "ll84_2020_cal_2019"
  | "ll84_2019_cal_2018"
  | "ll84_2018_cal_2017";

export type UiSliceTypes = {
  is_load_modal_open: boolean;
  is_info_modal_open: boolean;
  is_building_summary_modal_open: boolean;
  ll84_query_input: string;
  ll84_year_selection: LL84YearTypes;
  ll84_query_results: LL84QueryPropertyTypes[];
  ll84_selected_property: LL84QueryPropertyTypes;
};

export type LL84QueryObjTypes = {
  key: string;
  endpoint: string;
  documentation?: string;
  label: string;
  query_columns: string[];
  column_name_map: ColumnNameMapType;
};

export type ColumnNameMapType = string[][];

export type LL84QueryPropertyTypes = {
  property_name: string;
  property_id: string;
  nyc_bbl: string;
  nyc_bin: string;
  address_1: string;
  "1st_property_use_type": string;
  "1st_property_use_sf": string;
  "2nd_property_use_type": string;
  "2nd_property_use_sf": string;
  "3rd_property_use_type": string;
  "3rd_property_use_sf": string;
  fuel_oil_2_consumption_kbtu: string;
  fuel_oil_4_consumption_kbtu: string;
  district_steam_consumption_kbtu: string;
  natural_gas_consumption_kbtu: string;
  electricity_consumption_kbtu: string;
  electricity_onsite_generated_kbtu: string;
};

export type LL97ConversionTypes = {
  bldg_type_one_area: number;
  bldg_type_one_type: string;
  bldg_type_two_area: number;
  bldg_type_two_type: string;
  bldg_type_three_area: number;
  bldg_type_three_type: string;
  elec_kwh: number;
  elec_onsite_gen_kwh: number;
  steam_mlbs: number;
  gas_therms: number;
  fuel_two_gal: number;
  fuel_four_gal: number;
};

export type YearValueObj = { year: number; value: number };
export type YearCarbonObj = {
  year: number;
  consumption: UtilityConsumptionType;
};
export type BuildingOutputSliceTypes = {
  is_greater_than_25k_sf: boolean;

  total_area: number;
  co2limit_2024_thru_2029: number;
  co2limit_2030_thru_2034: number;
  co2limit_2035_thru_2040: number;

  elec_coefficients: YearValueObj[];

  annual_cost: YearCarbonObj;
  annual_site_energy: YearCarbonObj;
  annual_native_energy: YearCarbonObj;

  annual_cost_per_sf: YearCarbonObj;
  annual_site_per_sf: YearCarbonObj;
  annual_native_energy_per_sf: YearCarbonObj;

  annual_carbon_by_fuel_by_year: YearCarbonObj[];
  annual_carbon_per_sf_by_fuel_by_year: YearCarbonObj[];
  annual_carbon_fine_by_year: YearValueObj[];
};

export type StringObjectType = { [key: string]: string };
