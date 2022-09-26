import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { uiActions } from "store/uislice";
import { buildingInputActions } from "store/buildinginputslice";
import { LL84SelectionToLL97Inputs } from "locallaw/ll84_query_to_ll97_inputs";
import { LL97OutputsFromBuildingInputs } from "locallaw/ll97_output_calcs";
import { LL84QueryPropertyTypes } from "types";
import { buildingOutputActions } from "store/buildingoutputslice";
import { ll84QueryActions } from "store/ll84queryslice";
import * as d3 from "d3";
const V2TestComponent = () => {
  const { building_outputs } = useAppSelector((state) => state);

  let total_carbon = building_outputs.annual_carbon_summary_by_year
    ? building_outputs.annual_carbon_summary_by_year[0].carbon_total_absolute
    : 0;
  let total_carbon_by_sf = building_outputs.annual_carbon_summary_by_year
    ? building_outputs.annual_carbon_summary_by_year[0].carbon_total_by_sf
    : 0;

  let fine_2024 = building_outputs.annual_carbon_summary_by_year
    ? building_outputs.annual_carbon_summary_by_year.find(
        (f) => f.year === 2024
      )?.fine
    : 0;
  let fine_2030 = building_outputs.annual_carbon_summary_by_year
    ? building_outputs.annual_carbon_summary_by_year.find(
        (f) => f.year === 2030
      )?.fine
    : 0;

  let fine_2036 = building_outputs.annual_carbon_summary_by_year
    ? building_outputs.annual_carbon_summary_by_year.find(
        (f) => f.year === 2036
      )?.fine
    : 0;

  let cost_yr = building_outputs.annual_cost_by_fuel
    ? d3.sum(Object.values(building_outputs.annual_cost_by_fuel))
    : 0;

  let site_yr = building_outputs.annual_site_energy_by_fuel
    ? d3.sum(Object.values(building_outputs.annual_site_energy_by_fuel))
    : 0;
  let site_eui = building_outputs.annual_site_per_sf_by_fuel
    ? d3.sum(Object.values(building_outputs.annual_site_per_sf_by_fuel))
    : 0;

  return (
    <div>
      <div>Total Carbon: {Math.round(total_carbon)}</div>
      <div>Carbon Per Sf:{Math.round(total_carbon_by_sf * 10000) / 10000}</div>
      <div>
        Limit 2024 {Math.round(building_outputs.co2limit_2024_thru_2029)}
      </div>
      <div>
        Limit 2030 {Math.round(building_outputs.co2limit_2030_thru_2034)}
      </div>
      <div>
        Limit 2035 {Math.round(building_outputs.co2limit_2035_thru_2050)}
      </div>
      <div>Fine 2024: {Math.round(fine_2024 as number)}</div>
      <div>Fine 2030: {Math.round(fine_2030 as number)}</div>
      <div>Fine 2035: {Math.round(fine_2036 as number)}</div>
      <div>Cost/yr: {cost_yr}</div>
      <div>Site energy/yr: {site_yr}</div>
      <div>Site EUI: {site_eui}</div>
    </div>
  );
};

export default V2TestComponent;
