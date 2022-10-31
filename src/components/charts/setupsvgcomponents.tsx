import * as d3 from "d3";
import { ChartViewStackType, WidthHeightDimensionTypes } from "types";
import { bindD3Element } from "./d3helpers";
import { range_year_lengths } from "locallaw/lookups";

import { chart_background_color } from "styles/colors";

export const setupSVGComponents = (
  container_dimensions: WidthHeightDimensionTypes,
  container_ref: HTMLDivElement
) => {
  let container_width = container_dimensions.width;
  let container_height = container_dimensions.height;

  let container_padding = {
    t: 25,
    l: 100,
    r: 75,
    b: 25,
  };

  let y_padding = 1;

  let legend_height = 50;
  let table_height = 150;

  let table_dims = {
    x: container_padding.l,
    y: container_padding.t,
    width: container_width - container_padding.l - container_padding.r,
    height: table_height,
  };

  let plot_dims = {
    x: container_padding.l,
    y: container_padding.t + table_height,
    width: container_width - container_padding.l - container_padding.r,
    height:
      container_height -
      container_padding.t -
      legend_height -
      table_height -
      container_padding.b,
  };

  let legend_dims = {
    x: container_padding.l,
    y: container_padding.t + plot_dims.height,
    width: container_width - container_padding.l - container_padding.r,
    height: legend_height,
  };

  let svg = bindD3Element(container_ref, "svg", "chart-svg")
    .attr("height", container_height)
    .attr("width", container_width);

  let table_g = bindD3Element(svg, "g", "table-g").attr(
    "transform",
    `translate(${table_dims.x},${table_dims.y})`
  );

  let plot_g = bindD3Element(svg, "g", "plot-g").attr(
    "transform",
    `translate(${plot_dims.x},${plot_dims.y})`
  );

  let legend_g = bindD3Element(svg, "g", "legend-g").attr(
    "transform",
    `translate(${legend_dims.x},${
      container_padding.t + table_dims.height + plot_dims.height
    })`
  );

  let axis_g = bindD3Element(plot_g, "g", "axis-g");
  let y_axis_g = bindD3Element(axis_g, "g", "y-axis-g");

  let bar_g = bindD3Element(plot_g, "g", "bar-g");
  let gridlines_g = bindD3Element(plot_g, "g", "gridlines-g");

  let vertical_line_g = bindD3Element(plot_g, "g", "vert-line-g");

  let plot_border = bindD3Element(plot_g, "line", "bottom-plot-line")
    .attr("x1", 0)
    .attr("x2", plot_dims.width)
    .attr("y1", plot_dims.height)
    .attr("y2", plot_dims.height)
    .attr("stroke", "black")
    .attr("stroke-width", 1);

  let y_label = bindD3Element(axis_g, "text", "y-label")
    .attr("x", -plot_dims.height / 2)
    .attr("y", -60)
    .attr("transform", "rotate(270)")
    .style("text-anchor", "middle");

  let xScale = d3
    .scaleLinear()
    .domain([2020 as number, 2050 + range_year_lengths["2050-"]])
    .range([0, plot_dims.width]);

  let width_per_year =
    plot_dims.width / (xScale.domain()[1] - xScale.domain()[0]);

  let vline_data = [2024, 2030, 2035, 2040, 2050];

  vertical_line_g
    .selectAll(".vertical-line-white")
    .data(vline_data)
    .join("line")
    .attr("class", "vertical-line-white")
    .attr("x1", (d: number) => xScale(d))
    .attr("x2", (d: number) => xScale(d))
    .attr("y1", () => table_dims.y - table_height)
    .attr("y2", plot_dims.height)
    .style("stroke", chart_background_color)
    .style("stroke-width", "6px");

  vertical_line_g
    .selectAll(".vertical-line-solid")
    .data(vline_data)
    .join("line")
    .attr("class", "vertical-line-solid")
    .attr("x1", (d: number) => xScale(d))
    .attr("x2", (d: number) => xScale(d))
    .attr("y1", () => table_dims.y - table_height)
    .attr("y2", plot_dims.height)
    .style("stroke", "black")
    .style("stroke-width", "2px");

  return {
    svg,
    plot_g,
    legend_g,
    table_g,
    axis_g,
    y_axis_g,
    bar_g,
    gridlines_g,
    vertical_line_g,
    container_padding,
    y_padding,
    plot_dims,
    legend_dims,
    table_dims,
    plot_border,
    y_label,
    xScale,
    width_per_year,
  };
};
