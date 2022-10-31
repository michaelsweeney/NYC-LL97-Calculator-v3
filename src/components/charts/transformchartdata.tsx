import {
  BuildingOutputSliceTypes,
  ChartViewViewType,
  ChartViewUnitType,
  ChartViewStackType,
  CarbonChartDataTypes,
  CostChartDataTypes,
  BarKeyTypes,
  YearRangeTypes,
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

  let cost_chart_data: CostChartDataTypes[] = data_year_filter.map((d) => {
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
      stack_keys:
        stack_type === "enduse"
          ? ["fuel_four", "fuel_two", "steam", "gas", "elec", "fine"]
          : ["total", "fine"],
    };
  });

  return cost_chart_data;
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

  let carbon_chart_data: CarbonChartDataTypes[] = data_year_filter.map((d) => {
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
      stack_keys:
        stack_type === "enduse"
          ? ["fuel_four", "fuel_two", "steam", "gas", "elec"]
          : ["under", "excess"],
    };
  });
  return carbon_chart_data;
};
