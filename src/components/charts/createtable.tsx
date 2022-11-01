import * as d3 from "d3";

import { bindD3Element, formatCurrency, formatNumber } from "./d3helpers";
import { CostChartDataTypes, CarbonChartDataTypes } from "types";

type DataType = CostChartDataTypes | CarbonChartDataTypes;

export const createTable = (props: {
  svg_components: { [key: string]: any };
  chart_data: CostChartDataTypes[] | CarbonChartDataTypes[];
}) => {
  const { svg_components, chart_data } = props;

  const { table_g, xScale, table_dims } = svg_components;

  let row_height = 30;

  let data_filtered = chart_data.filter((d) => d.year !== 2022);

  let table_columns = table_g
    .selectAll(".table-column")
    .data(data_filtered)
    .join("g")
    .attr("class", "table-column")
    .attr(
      "transform",
      (d: DataType) => `translate(${xScale(d.year + d.period_length / 2)},0)`
    );

  table_columns.each(function (d: DataType, i: number) {
    console.log(d);
    //@ts-ignore
    let el = d3.select(this);

    let title = bindD3Element(el, "text", "period-title")
      .attr("text-anchor", "middle")

      .text(d.period)
      .style("font-weight", 700);

    let row_1 = bindD3Element(el, "text", "row-1-val")
      .text(formatNumber(d.total))
      .attr("text-anchor", "middle")
      .attr("y", row_height * 1)
      .attr("fill", () => (d.fine > 0 ? "red" : "black"));

    let row_2 = bindD3Element(el, "text", "row-2-val")
      .text(formatNumber(d.total))
      .attr("text-anchor", "middle")
      .attr("y", row_height * 2)
      .attr("fill", () => (d.fine > 0 ? "red" : "black"));

    let row_3 = bindD3Element(el, "text", "row-3-val")
      .text(formatCurrency(d.fine))
      .attr("text-anchor", "middle")
      .attr("y", row_height * 3)
      .attr("fill", () => (d.fine > 0 ? "red" : "black"));
  });
};
