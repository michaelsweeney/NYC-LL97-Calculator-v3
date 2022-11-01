import * as d3 from "d3";
import {
  CarbonChartDataTypes,
  ChartViewStackType,
  ChartViewUnitType,
  D3StackType,
} from "types";
import {
  bar_colors,
  chart_background_color,
  threshold_line_color,
} from "styles/colors";

import { bindD3Element, getMaxValFromStack } from "./d3helpers";

export const createCarbonChart = (props: {
  chart_data: CarbonChartDataTypes[];
  stack_data: D3StackType;
  svg_components: { [key: string]: any };
  unit_type: ChartViewUnitType;
  stack_type: ChartViewStackType;
}) => {
  let { chart_data, stack_data, svg_components, unit_type, stack_type } = props;

  let xScale = svg_components.xScale;

  let yScale = d3
    .scaleLinear()
    .range([svg_components.plot_dims.height, 0])
    .domain([
      0,
      d3.max([
        getMaxValFromStack(stack_data),
        d3.max(
          chart_data.map((d) => (d.threshold ? d.threshold : 0))
        ) as number,
      ]) as number,
    ]);

  let colorScale = d3
    .scaleOrdinal()
    .domain(chart_data[0].stack_keys)
    .range(chart_data[0].stack_keys.map((d) => bar_colors[d]));

  let yaxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickFormat(d3.format(unit_type === "absolute" ? "~s" : ".1"));
  svg_components.y_axis_g.call(yaxis);
  svg_components.y_axis_g.selectAll("line").remove();
  svg_components.y_axis_g.selectAll(".domain").remove();

  svg_components.gridlines_g
    .call(
      d3.axisLeft(yScale).ticks(5).tickSize(-svg_components.plot_dims.width)
    )
    .style("stroke-dasharray", "1 1");
  svg_components.gridlines_g.selectAll("text").remove();
  svg_components.gridlines_g.selectAll(".domain").remove();

  svg_components.y_label.text(() => {
    return unit_type === "absolute" ? "kg CO2e/yr" : "kg CO2e/sf/yr";
  });

  let stacked_group_g = svg_components.bar_g
    .selectAll(".stacked-group-g")
    .data(stack_data)
    .join("g")
    .attr("class", "stacked-group-g")
    .attr("fill", (d: any, i: number) => {
      return colorScale(d.key);
    });

  stacked_group_g
    .selectAll(".stacked-rect")
    .data((d: any, i: number) => d)
    .join("rect")
    .attr("class", "stacked-rect")
    .attr("x", (d: any) => xScale(d.data.year))
    .attr("y", (d: any) => yScale(d[1]))
    .attr("height", (d: any) => {
      return yScale(d[0]) - yScale(d[1]);
    })
    .attr("width", (d: any) => {
      return d.data.period_length * svg_components.width_per_year;
    });

  let threshold_line_thickness = 6;

  let createThresholdLine = d3
    .line<any>()
    .curve(d3.curveStepAfter)
    .x((d) => {
      return xScale(d.threshold !== null ? d.year : 2024) as number;
    })

    .y((d) => {
      return yScale(d.threshold !== null ? d.threshold : yScale.domain()[1]);
    });

  let line_threshold_g = bindD3Element(
    svg_components.plot_g,
    "g",
    "line-threshold-g"
  );

  let threshold_path = bindD3Element(
    line_threshold_g,
    "path",
    "threshold-path"
  );

  threshold_path
    .datum(chart_data)
    .attr("d", createThresholdLine)
    .style("fill", "none")
    .style("stroke", threshold_line_color)
    .style("stroke-width", threshold_line_thickness);

  if (stack_type === "enduse") {
    threshold_path.remove();
  }
};
