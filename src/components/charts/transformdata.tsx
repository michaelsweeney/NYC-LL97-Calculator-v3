import {
  BuildingOutputSliceTypes,
  ChartViewUnitType,
  ChartViewStackType,
  CarbonChartDataTypes,
  CostChartDataTypes,
  YearRangeTypes,
  ChartViewViewType,
  BarKeyTypes,
} from "types";

import * as d3 from "d3";
import { range_year_lengths } from "locallaw/lookups";

export const getCostChartData = (
  data: BuildingOutputSliceTypes,
  stack_type: ChartViewStackType,
  unit_type: ChartViewUnitType
) => {
  let data_year_filter = data.annual_result_array.filter((d) =>
    [2022, 2024, 2030, 2035, 2040, 2050].includes(d.year)
  );
  let unit_key = unit_type === "absolute" ? "absolute" : "per_sf";

  let keys =
    stack_type === "enduse"
      ? ["fuel_four", "fuel_two", "steam", "gas", "elec", "fine"]
      : ["total", "fine"];

  let chart_data: CostChartDataTypes[] = data_year_filter.map((d) => {
    return {
      elec: d.utility_cost[unit_key as keyof typeof d.utility_cost].elec,
      gas: d.utility_cost[unit_key as keyof typeof d.utility_cost].gas,
      steam: d.utility_cost[unit_key as keyof typeof d.utility_cost].steam,
      fuel_two:
        d.utility_cost[unit_key as keyof typeof d.utility_cost].fuel_two,
      fuel_four:
        d.utility_cost[unit_key as keyof typeof d.utility_cost].fuel_four,
      total: d.utility_cost[unit_key as keyof typeof d.utility_cost]
        .total as number,
      fine: d.fine[unit_key as keyof typeof d.fine],
      year: d.year,
      period: d.period as YearRangeTypes,
      period_length: range_year_lengths[d.period],
      is_fine: d.is_fine,
      stack_keys: keys as BarKeyTypes[],
    };
  });

  //@ts-ignore
  let stack_data = d3.stack().keys(chart_data[0].stack_keys)(chart_data);
  let legend_data = keys;
  return { chart_data, stack_data, legend_data };
};

export const getCarbonChartData = (
  data: BuildingOutputSliceTypes,
  stack_type: ChartViewStackType,
  unit_type: ChartViewUnitType
) => {
  let data_year_filter = data.annual_result_array.filter((d) =>
    [2022, 2024, 2030, 2035, 2040, 2050].includes(d.year)
  );
  let unit_key = unit_type === "absolute" ? "absolute" : "per_sf";

  let keys =
    stack_type === "enduse"
      ? ["fuel_four", "fuel_two", "steam", "gas", "elec"]
      : ["under", "excess"];

  let chart_data: CarbonChartDataTypes[] = data_year_filter.map((d) => {
    return {
      elec: d.carbon[unit_key as keyof typeof d.carbon].elec,
      gas: d.carbon[unit_key as keyof typeof d.carbon].gas,
      steam: d.carbon[unit_key as keyof typeof d.carbon].steam,
      fuel_two: d.carbon[unit_key as keyof typeof d.carbon].fuel_two,
      fuel_four: d.carbon[unit_key as keyof typeof d.carbon].fuel_four,
      fine: d.fine[unit_key as keyof typeof d.fine],
      threshold: d.threshold[unit_key as keyof typeof d.threshold],
      year: d.year,
      period: d.period as YearRangeTypes,
      period_length: range_year_lengths[d.period],
      is_fine: d.is_fine,
      total: d.carbon[unit_key as keyof typeof d.carbon].total as number,
      under: d3.min([
        d.threshold[unit_key as keyof typeof d.threshold] as number,
        d.carbon[unit_key as keyof typeof d.carbon].total as number,
      ]) as number,
      excess: d.excess_carbon[unit_key as keyof typeof d.excess_carbon],
      stack_keys: keys as BarKeyTypes[],
    };
  });

  let legend_data: any = [];
  keys.forEach((key) => {
    let keysum = d3.sum(
      chart_data.map((d) => d[key as keyof typeof d]) as number[]
    );
    if (keysum > 0) {
      legend_data.push(key);
    }

    console.log(chart_data[key as keyof typeof chart_data]);
  });
  //@ts-ignore
  let stack_data = d3.stack().keys(chart_data[0].stack_keys)(chart_data);
  return { chart_data, stack_data, legend_data };
};
