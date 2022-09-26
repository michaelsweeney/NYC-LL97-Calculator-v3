import {
  BuildingInputTypes,
  BuildingOutputSliceTypes,
  YearFuelTypeObj,
  YearValueObj,
  UtilityConsumptionType,
  CarbonSummaryByYearObj,
} from "types";
import {
  co2_limits_by_building_type,
  fine_per_ton_co2,
  elec_carbon_coefficients,
  non_electric_tons_per_kbtu_coefficients,
} from "./lookups";

const LL97OutputsFromBuildingInputs = (ll97_in: BuildingInputTypes) => {
  let {
    building_types,
    utilities,
    electric_onsite_generation,
    electric_coefficient_method,
  } = ll97_in;

  let total_area = 0;
  let co2limit_2024 = 0;
  let co2limit_2030 = 0;
  let co2limit_2035 = 0;

  let carbon_coefficient_array =
    elec_carbon_coefficients[
      electric_coefficient_method as keyof typeof elec_carbon_coefficients
    ];

  Object.values(building_types).forEach((type) => {
    let limit_2024 =
      +co2_limits_by_building_type[
        type.building_type as keyof typeof co2_limits_by_building_type
      ][0] * +type.building_area;
    let limit_2030 =
      +co2_limits_by_building_type[
        type.building_type as keyof typeof co2_limits_by_building_type
      ][1] * +type.building_area;
    let limit_2035 =
      +co2_limits_by_building_type[
        type.building_type as keyof typeof co2_limits_by_building_type
      ][2] * +type.building_area;
    co2limit_2024 = co2limit_2024 + limit_2024;
    co2limit_2030 = co2limit_2030 + limit_2030;
    co2limit_2035 = co2limit_2035 + limit_2035;
    total_area = total_area + +type.building_area;
  });

  let is_greater_than_25k_sf: boolean = total_area > 25e3 ? true : false;

  let elec_native =
    +utilities.elec.consumption -
    +electric_onsite_generation.photovoltaic.consumption;

  let gas_native = +utilities.gas.consumption;
  let steam_native = +utilities.steam.consumption;
  let fuel_two_native = +utilities.fuel_two.consumption;
  let fuel_four_native = +utilities.fuel_four.consumption;

  let elec_kbtu = elec_native * 3.412;
  let gas_kbtu = +utilities.gas.consumption * 100;
  let steam_kbtu = +utilities.steam.consumption * 1194;
  let fuel_two_kbtu = +utilities.fuel_two.consumption * 138;
  let fuel_four_kbtu = +utilities.fuel_four.consumption * 146;

  let elec_cost = elec_native * 3.412 * utilities.elec.rate;
  let gas_cost = +utilities.gas.consumption * +utilities.gas.rate;
  let steam_cost = +utilities.steam.consumption * +utilities.steam.rate;
  let fuel_two_cost =
    +utilities.fuel_two.consumption * +utilities.fuel_two.rate;
  let fuel_four_cost =
    +utilities.fuel_four.consumption * +utilities.fuel_four.rate;

  let elec_kbtu_per_sf = elec_kbtu / total_area;
  let gas_kbtu_per_sf = gas_kbtu / total_area;
  let steam_kbtu_per_sf = steam_kbtu / total_area;
  let fuel_two_kbtu_per_sf = fuel_two_kbtu / total_area;
  let fuel_four_kbtu_per_sf = fuel_four_kbtu / total_area;

  let elec_cost_per_sf = elec_cost / total_area;
  let gas_cost_per_sf = gas_cost / total_area;
  let steam_cost_per_sf = steam_cost / total_area;
  let fuel_two_cost_per_sf = fuel_two_cost / total_area;
  let fuel_four_cost_per_sf = fuel_four_cost / total_area;

  let elec_native_per_sf = elec_native / total_area;
  let gas_native_per_sf = gas_native / total_area;
  let steam_native_per_sf = steam_native / total_area;
  let fuel_two_native_per_sf = fuel_two_native / total_area;
  let fuel_four_native_per_sf = fuel_four_native / total_area;

  let annual_cost_by_fuel: UtilityConsumptionType = {
    elec: elec_cost,
    gas: gas_cost,
    steam: steam_cost,
    fuel_two: fuel_two_cost,
    fuel_four: fuel_four_cost,
  };

  let annual_site_energy_by_fuel: UtilityConsumptionType = {
    elec: elec_kbtu,
    gas: gas_kbtu,
    steam: steam_kbtu,
    fuel_two: fuel_two_kbtu,
    fuel_four: fuel_four_kbtu,
  };
  let annual_native_energy_by_fuel: UtilityConsumptionType = {
    elec: elec_native,
    gas: gas_native,
    steam: steam_native,
    fuel_two: fuel_two_native,
    fuel_four: fuel_four_native,
  };

  let annual_cost_per_sf_by_fuel: UtilityConsumptionType = {
    elec: elec_cost_per_sf,
    gas: gas_cost_per_sf,
    steam: steam_cost_per_sf,
    fuel_two: fuel_two_cost_per_sf,
    fuel_four: fuel_four_cost_per_sf,
  };
  let annual_site_per_sf_by_fuel: UtilityConsumptionType = {
    elec: elec_kbtu_per_sf,
    gas: gas_kbtu_per_sf,
    steam: steam_kbtu_per_sf,
    fuel_two: fuel_two_kbtu_per_sf,
    fuel_four: fuel_four_kbtu_per_sf,
  };

  let annual_native_energy_per_sf_by_fuel: UtilityConsumptionType = {
    elec: elec_native_per_sf,
    gas: gas_native_per_sf,
    steam: steam_native_per_sf,
    fuel_two: fuel_two_native_per_sf,
    fuel_four: fuel_four_native_per_sf,
  };

  let annual_carbon_by_year_by_fuel = [] as YearFuelTypeObj[];
  let annual_carbon_per_sf_by_year_by_fuel = [] as YearFuelTypeObj[];
  let annual_carbon_summary_by_year = [] as CarbonSummaryByYearObj[];

  carbon_coefficient_array.forEach((yobj) => {
    let { year, value } = yobj; // value is kg per mwh
    // value is tons per kbtu

    let elec_tons = elec_kbtu * value;

    let gas_tons = gas_kbtu * non_electric_tons_per_kbtu_coefficients.gas;
    let steam_tons = steam_kbtu * non_electric_tons_per_kbtu_coefficients.steam;
    let fuel_two_tons =
      fuel_two_kbtu * non_electric_tons_per_kbtu_coefficients.fuel_two;
    let fuel_four_tons =
      fuel_four_kbtu * non_electric_tons_per_kbtu_coefficients.fuel_four;

    let threshold = null;

    let carbon_tons_total =
      elec_tons + gas_tons + steam_tons + fuel_two_tons + fuel_four_tons;

    if (year <= 2023) {
      threshold = null;
    } else if (year <= 2029) {
      threshold = co2limit_2024;
    } else if (year <= 2034) {
      threshold = co2limit_2030;
    } else if (year <= 2050) {
      threshold = co2limit_2035;
    }

    let excess_carbon;
    if (threshold !== null) {
      excess_carbon = Math.max(carbon_tons_total - threshold, 0);
    } else {
      excess_carbon = 0;
    }

    let fine = excess_carbon * fine_per_ton_co2;

    annual_carbon_by_year_by_fuel.push({
      year: year,
      consumption: {
        elec: elec_tons,
        gas: gas_tons,
        steam: steam_tons,
        fuel_two: fuel_two_tons,
        fuel_four: fuel_four_tons,
      },
    });
    annual_carbon_per_sf_by_year_by_fuel.push({
      year: year,
      consumption: {
        elec: elec_tons / total_area,
        gas: gas_tons / total_area,
        steam: steam_tons / total_area,
        fuel_two: fuel_two_tons / total_area,
        fuel_four: fuel_four_tons / total_area,
      },
    });
    annual_carbon_summary_by_year.push({
      year: year,
      threshold_absolute: threshold,
      threshold_by_sf: threshold ? threshold / total_area : null,
      fine: fine,
      fine_by_sf: fine / total_area,
      carbon_total_absolute: carbon_tons_total,
      carbon_total_by_sf: carbon_tons_total / total_area,
    });
  });

  let ll97_output_obj: BuildingOutputSliceTypes = {
    is_greater_than_25k_sf: is_greater_than_25k_sf,
    total_area: total_area,

    co2limit_2024_thru_2029: co2limit_2024,
    co2limit_2030_thru_2034: co2limit_2030,
    co2limit_2035_thru_2050: co2limit_2035,

    elec_carbon_coefficients_by_year: carbon_coefficient_array,

    annual_cost_by_fuel: annual_cost_by_fuel,
    annual_site_energy_by_fuel: annual_site_energy_by_fuel,
    annual_native_energy_by_fuel: annual_native_energy_by_fuel,
    annual_cost_per_sf_by_fuel: annual_cost_per_sf_by_fuel,
    annual_site_per_sf_by_fuel: annual_site_per_sf_by_fuel,
    annual_native_energy_per_sf_by_fuel: annual_native_energy_per_sf_by_fuel,
    annual_carbon_by_year_by_fuel: annual_carbon_by_year_by_fuel,
    annual_carbon_per_sf_by_year_by_fuel: annual_carbon_per_sf_by_year_by_fuel,
    annual_carbon_summary_by_year: annual_carbon_summary_by_year,
  };

  console.log(ll97_output_obj);

  return ll97_output_obj;
};

export { LL97OutputsFromBuildingInputs };
