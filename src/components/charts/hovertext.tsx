import { formatNumber, formatCurrency } from "./d3helpers";
import {
  CarbonChartDataTypes,
  ChartViewStackType,
  ChartViewUnitType,
  ChartViewViewType,
  CostChartDataTypes,
} from "types";
import * as d3 from "d3";

export const getHoverText = (
  data: CarbonChartDataTypes | CostChartDataTypes,
  unit_type: ChartViewUnitType,
  stack_type: ChartViewStackType,
  view_type: ChartViewViewType
) => {
  if (view_type === "carbon") {
    if (stack_type === "summary") {
      return getCarbonSummaryHoverText(data as CarbonChartDataTypes, unit_type);
    } else {
      return getCarbonEnduseHoverText(data as CarbonChartDataTypes, unit_type);
    }
  } else {
    if (stack_type === "summary") {
      return getCostSummaryHoverText(data as CostChartDataTypes, unit_type);
    } else {
      return getCostEnduseHoverText(data as CostChartDataTypes, unit_type);
    }
  }
};

export const getCarbonSummaryHoverText = (
  data_filter: CarbonChartDataTypes,
  unit_type: ChartViewUnitType
) => {
  return `
    <div>
      <div class='hover-title'>${data_filter.period}</div>
      <table>
        <tr>
          <td class='hover-td-label'>Emissions (${
            unit_type === "absolute" ? "tCO2e/yr" : "tCO2e/sf/yr"
          }): </td>
          <td class='hover-td-value'>${formatNumber(
            data_filter.total_carbon as number,
            unit_type === "absolute" ? 0 : 4
          )}</td>
        </tr>
        <tr>
          <td class='hover-td-label'>Emissions Threshold (${
            unit_type === "absolute" ? "tCO2e/yr" : "tCO2e/sf/yr"
          }): </td>
          <td class='hover-td-value'>${
            data_filter.threshold_carbon
              ? formatNumber(
                  data_filter.total_carbon as number,
                  unit_type === "absolute" ? 0 : 4
                )
              : "n/a"
          }</td>
        </tr>
        <tr>
        <td class='hover-td-label'>Excess Emissions (${
          unit_type === "absolute" ? "tCO2e/yr" : "tCO2e/sf/yr"
        }): </td>
        <td class='hover-td-value'>${
          data_filter.threshold_carbon
            ? formatNumber(
                d3.max([
                  data_filter.total_carbon - data_filter.threshold_carbon,
                  0,
                ]) as number,
                unit_type === "absolute" ? 0 : 4
              )
            : "n/a"
        }</td>
      </tr>
        <tr>
          <td class='hover-td-label'>Est Penalty (${
            unit_type === "absolute" ? "$/yr" : "$/sf/yr"
          }): </td>
          <td class='hover-td-value'>${formatCurrency(data_filter.fine)}</td>
        </tr>  
      </table>
    </div>  
  `;
};

export const getCostSummaryHoverText = (
  data_filter: CostChartDataTypes,
  unit_type: ChartViewUnitType
) => {
  return `
    <div class='hover-container'>
      <div class='hover-title'>${data_filter.period}</div>
      <table>
        <tr>
          <td class='hover-td-label'>Utility Cost (${
            unit_type === "absolute" ? "$/yr" : "$/sf/yr"
          }): </td>
          <td class='hover-td-value'>${formatCurrency(
            data_filter.total_cost as number,
            unit_type === "absolute" ? 0 : 4
          )}</td>
        </tr>
        <tr>
          <td class='hover-td-label'>Est Penalty (${
            unit_type === "absolute" ? "$/yr" : "$/sf/yr"
          }): </td>
          <td class='hover-td-value'>${
            data_filter.fine
              ? formatCurrency(
                  data_filter.fine as number,
                  unit_type === "absolute" ? 0 : 4
                )
              : "n/a"
          }</td>
        </tr>
        <tr>
          <td class='hover-td-label'>Total Cost (${
            unit_type === "absolute" ? "$/yr" : "$/sf/yr"
          }): </td>
          <td class='hover-td-value'>${formatCurrency(
            data_filter.total_cost + data_filter.fine,
            unit_type === "absolute" ? 0 : 4
          )}</td>
        </tr>  
      </table>
    </div>  
  `;
};

export const getCarbonEnduseHoverText = (
  data_filter: CarbonChartDataTypes,
  unit_type: ChartViewUnitType
) => {
  return `
    <div>
      <div class='hover-title'>${data_filter.period}</div>
      <table>
        <tr>
          <td class='hover-td-label'>Emissions (${
            unit_type === "absolute" ? "tCO2e/yr" : "tCO2e/sf/yr"
          }): </td>
          <td class='hover-td-value'>${formatNumber(
            data_filter.total_carbon as number,
            unit_type === "absolute" ? 0 : 4
          )}</td>
        </tr>
        <tr>
          <td class='hover-td-label'>Emissions Threshold (${
            unit_type === "absolute" ? "tCO2e/yr" : "tCO2e/sf/yr"
          }): </td>
          <td class='hover-td-value'>${
            data_filter.threshold_carbon
              ? formatNumber(
                  data_filter.total_carbon as number,
                  unit_type === "absolute" ? 0 : 4
                )
              : "n/a"
          }</td>
        </tr>
        <tr>
        <td class='hover-td-label'>Excess Emissions (${
          unit_type === "absolute" ? "tCO2e/yr" : "tCO2e/sf/yr"
        }): </td>
        <td class='hover-td-value'>${
          data_filter.threshold_carbon
            ? formatNumber(
                d3.max([
                  data_filter.total_carbon - data_filter.threshold_carbon,
                  0,
                ]) as number,
                unit_type === "absolute" ? 0 : 4
              )
            : "n/a"
        }</td>
      </tr>
        <tr>
          <td class='hover-td-label'>Est Penalty (${
            unit_type === "absolute" ? "$/yr" : "$/sf/yr"
          }): </td>
          <td class='hover-td-value'>${formatCurrency(data_filter.fine)}</td>
        </tr>  
      </table>
    </div>  
  `;
};

export const getCostEnduseHoverText = (
  data_filter: CostChartDataTypes,
  unit_type: ChartViewUnitType
) => {
  return `
    <div>
      <div class='hover-title'>${data_filter.period}</div>
      <table>
        <tr>
          <td class='hover-td-label'>Emissions (${
            unit_type === "absolute" ? "tCO2e/yr" : "tCO2e/sf/yr"
          }): </td>
          <td class='hover-td-value'>${formatNumber(
            data_filter.total_carbon as number,
            unit_type === "absolute" ? 0 : 4
          )}</td>
        </tr>
        <tr>
          <td class='hover-td-label'>Emissions Threshold (${
            unit_type === "absolute" ? "tCO2e/yr" : "tCO2e/sf/yr"
          }): </td>
          <td class='hover-td-value'>${
            data_filter.threshold_carbon
              ? formatNumber(
                  data_filter.total_carbon as number,
                  unit_type === "absolute" ? 0 : 4
                )
              : "n/a"
          }</td>
        </tr>
        <tr>
        <td class='hover-td-label'>Excess Emissions (${
          unit_type === "absolute" ? "tCO2e/yr" : "tCO2e/sf/yr"
        }): </td>
        <td class='hover-td-value'>${
          data_filter.threshold_carbon
            ? formatNumber(
                d3.max([
                  data_filter.total_carbon - data_filter.threshold_carbon,
                  0,
                ]) as number,
                unit_type === "absolute" ? 0 : 4
              )
            : "n/a"
        }</td>
      </tr>
        <tr>
          <td class='hover-td-label'>Est Penalty (${
            unit_type === "absolute" ? "$/yr" : "$/sf/yr"
          }): </td>
          <td class='hover-td-value'>${formatCurrency(data_filter.fine)}</td>
        </tr>  
      </table>
    </div>  
  `;
};
