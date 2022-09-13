import InputOnsiteGeneration from "components/inputonsitegeneration";
import { BuildingInputTypes, LL97ConversionTypes } from "types";
import { co2_limits_by_building_type, fine_per_ton_co2 } from "./lookups";

const LL97OutputsFromBuildingInputs = (ll97_in: BuildingInputTypes) => {
  console.log(ll97_in);

  let {
    building_types,
    utilities,
    is_default_rates,
    electric_onsite_generation,
  } = ll97_in;

  let area = 0;
  let co2limit_2024 = 0;
  let co2limit_2030 = 0;
  let co2limit_2035 = 0;

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
    area = area + +type.building_area;
  });

  console.log(area, co2limit_2024, co2limit_2030, co2limit_2035);

  let elec_consumption_with_pv_kwh =
    +utilities.elec.consumption -
    +electric_onsite_generation.photovoltaic.consumption;

  let elec_kbtu = elec_consumption_with_pv_kwh * 3.412;
  let gas_kbtu = +utilities.gas.consumption * 100;
  let steam_kbtu = +utilities.steam.consumption * 1194;
  let fuel_two_kbtu = +utilities.fuel_two.consumption * 138;
  let fuel_four_kbtu = +utilities.fuel_four.consumption * 146;

  let elec_cost = elec_consumption_with_pv_kwh * 3.412 * utilities.elec.rate;
  let gas_cost = +utilities.gas.consumption * +utilities.gas.rate;
  let steam_cost = +utilities.steam.consumption * +utilities.steam.rate;
  let fuel_two_cost =
    +utilities.fuel_two.consumption * +utilities.fuel_two.rate;
  let fuel_four_cost =
    +utilities.fuel_four.consumption * +utilities.fuel_four.rate;

  let elec_kbtu_norm = elec_kbtu / area;
  let gas_kbtu_norm = gas_kbtu / area;
  let steam_kbtu_norm = steam_kbtu / area;
  let fuel_two_kbtu_norm = fuel_two_kbtu / area;
  let fuel_four_kbtu_norm = fuel_four_kbtu / area;

  let elec_cost_norm = elec_cost / area;
  let gas_cost_norm = gas_cost / area;
  let steam_cost_norm = steam_cost / area;
  let fuel_two_cost_norm = fuel_two_cost / area;
  let fuel_four_cost_norm = fuel_four_cost / area;

  // do carbon regressions for each year

  // let elec_carbon = elec_kbtu * 0.000084689;
  // let gas_carbon = gas_kbtu * 0.00005311;
  // let steam_carbon = steam_kbtu * 0.00004493;
  // let fuel_two_carbon = fuel_two_kbtu * 0.00007421;
  // let fuel_four_carbon = fuel_four_kbtu * 0.00007529;

  return;
};

export { LL97OutputsFromBuildingInputs };
