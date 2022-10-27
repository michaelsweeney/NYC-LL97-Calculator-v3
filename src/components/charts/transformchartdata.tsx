import {
  BuildingOutputSliceTypes,
  ChartViewViewType,
  ChartViewUnitType,
  ChartViewStackType,
  BarKeyTypes,
} from "types";
import * as d3 from "d3";
import { range_year_lengths } from "locallaw/lookups";

export const transformChartData = (
  data: BuildingOutputSliceTypes,
  view_type: ChartViewViewType,
  stack_type: ChartViewStackType,
  unit_type: ChartViewUnitType
) => {
  let data_year_filter = data.annual_result_array.filter((d) =>
    [2022, 2024, 2030, 2035, 2040, 2050].includes(d.year)
  );

  let chart_data;

  let unit_key = unit_type === "absolute" ? "absolute" : "per_sf";

  if (view_type === "cost") {
    chart_data = data_year_filter.map((d) => {
      if (stack_type === "enduse") {
        return {
          elec: d.utility_cost[unit_key as keyof typeof d.utility_cost].elec,
          gas: d.utility_cost[unit_key as keyof typeof d.utility_cost].gas,
          steam: d.utility_cost[unit_key as keyof typeof d.utility_cost].steam,
          fuel_two:
            d.utility_cost[unit_key as keyof typeof d.utility_cost].fuel_two,
          fuel_four:
            d.utility_cost[unit_key as keyof typeof d.utility_cost].fuel_four,
          fine: d.fine[unit_key as keyof typeof d.fine],
          year: d.year,
          period: d.period,
          period_length: range_year_lengths[d.period],
          is_fine: d.is_fine,
          stack_keys: ["fuel_four", "fuel_two", "steam", "gas", "elec", "fine"],
        };
      }

      if (stack_type === "summary") {
        return {
          total: d.utility_cost[unit_key as keyof typeof d.utility_cost].total,
          fine: d.fine[unit_key as keyof typeof d.fine],
          year: d.year,
          period: d.period,
          period_length: range_year_lengths[d.period],
          is_fine: d.is_fine,
          stack_keys: ["total", "fine"],
        };
      }
    });
  }
  if (view_type === "carbon") {
    chart_data = data_year_filter.map((d) => {
      if (stack_type === "enduse") {
        return {
          elec: d.carbon[unit_key as keyof typeof d.carbon].elec,
          gas: d.carbon[unit_key as keyof typeof d.carbon].gas,
          steam: d.carbon[unit_key as keyof typeof d.carbon].steam,
          fuel_two: d.carbon[unit_key as keyof typeof d.carbon].fuel_two,
          fuel_four: d.carbon[unit_key as keyof typeof d.carbon].fuel_four,
          fine: d.fine[unit_key as keyof typeof d.fine],
          threshold: d.threshold[unit_key as keyof typeof d.threshold],
          year: d.year,
          period: d.period,
          period_length: range_year_lengths[d.period],
          is_fine: d.is_fine,
          stack_keys: ["fuel_four", "fuel_two", "steam", "gas", "elec"],
        };
      }

      if (stack_type === "summary") {
        return {
          total: d.carbon[unit_key as keyof typeof d.carbon].total,
          excess: d.excess_carbon[unit_key as keyof typeof d.excess_carbon],
          threshold: d.threshold[unit_key as keyof typeof d.threshold],
          //@ts-ignore
          under: d3.min([
            d.threshold[unit_key as keyof typeof d.threshold],
            d.carbon[unit_key as keyof typeof d.carbon].total,
          ]),
          fine: d.fine[unit_key as keyof typeof d.fine],
          year: d.year,
          period: d.period,
          period_length: range_year_lengths[d.period],
          is_fine: d.is_fine,
          stack_keys: ["under", "excess"],
        };
      }
    });
  }

  return chart_data;
};
