import { CarbonSummaryByYearObj, D3WrapperCallbackPropTypes } from "types";
import * as d3 from "d3";

import { bindD3Element } from "./d3helpers";
import { colors } from "styles/colors";
type DType = CarbonSummaryByYearObj;

const createCarbonGraph = (
  container: D3WrapperCallbackPropTypes,
  data: CarbonSummaryByYearObj[]
) => {
  const { container_ref, container_dimensions } = container;

  // make svg and establish dimensions / groups for chart vs table.
  let container_width = container_dimensions.width;
  let container_height = container_dimensions.height;

  let plot_margins = {
    t: 0,
    l: 100,
    r: 100,
    b: 40,
  };

  let plot_dims = {
    width: container_width - plot_margins.l - plot_margins.r,
    height: container_height - plot_margins.t - plot_margins.b,
  };

  let svg = bindD3Element(container_ref, "svg", "carbonview-svg")
    .attr("height", container_height)
    .attr("width", container_width);

  let plot_g = bindD3Element(svg, "g", "plot-g");
  plot_g.attr("transform", `translate(${plot_margins.l},${plot_margins.t})`);

  if (data) {
    /* ---------------------------- */
    /* -------- CARBON PLOT VIEW ------- */
    /* ---------------------------- */

    let ypaddingtop = 1.15;

    let bar_carbon_g = bindD3Element(plot_g, "g", "bar-carbon-g");
    let bar_excess_g = bindD3Element(plot_g, "g", "bar-excess-g");

    let line_threshold_g = bindD3Element(plot_g, "g", "line-threshold-g");

    let text_g = bindD3Element(plot_g, "g", "text-g");

    let y_label = bindD3Element(text_g, "text", "y-label-text");

    y_label
      .text("Tons Carbon per Year (tCO2e)")
      .attr("transform", "rotate(270)")
      .attr("y", -plot_margins.l / 2 - 10)
      .attr("x", -plot_margins.t + -plot_dims.height / 2)
      .attr("text-anchor", "middle")
      .style("font-family", "CircularStd-Medium")
      .style("font-size", "14px");

    let x_axis_g = bindD3Element(plot_g, "g", "x-axis-g").attr(
      "transform",
      `translate(${0}, ${plot_dims.height})`
    );

    let y_axis_g = bindD3Element(plot_g, "g", "y-axis-g");
    let right_axis_g = bindD3Element(plot_g, "g", "right-axis-g");
    let top_axis_g = bindD3Element(plot_g, "g", "top-axis-g");

    let xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.year.toString()))
      .range([0, plot_dims.width])
      .align(0.5)
      .paddingInner(0.2)
      .paddingOuter(0.4);

    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        (d3.max([
          ...data.map((d) => d.carbon_total_absolute),
          ...data
            .map((d) => d.threshold_absolute)
            .map((d) => {
              if (d === null) {
                return 0;
              } else {
                return d;
              }
            }),
        ]) as number) * ypaddingtop,
      ])
      .range([plot_dims.height, 0]);

    y_axis_g.call(d3.axisLeft(yScale).ticks(5).tickSizeOuter(0));
    x_axis_g.call(d3.axisBottom(xScale).tickSizeOuter(0));

    x_axis_g
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("x", -10)
      .attr("y", -3)
      .attr("transform", "rotate(-90)");

    right_axis_g
      .attr("transform", `translate(${plot_dims.width},${0})`)
      .call(d3.axisRight(yScale).ticks(0).tickSizeInner(0).tickSizeOuter(0));

    top_axis_g
      .attr("transform", `translate(${0},${0})`)
      .call(d3.axisTop(xScale).ticks(0).tickSizeInner(0).tickSizeOuter(0));

    right_axis_g.selectAll(".tick").remove();
    top_axis_g.selectAll(".tick").remove();

    bar_carbon_g
      .selectAll(".carbon-rect")
      .data(data)
      .join("rect")
      .attr("class", "carbon-rect")
      .attr("fill", colors.secondary.main as string)
      .attr("x", (d: DType) => xScale(d.year.toString()))
      .attr("width", xScale.bandwidth())
      .attr("y", (d: DType) => yScale(d.carbon_total_absolute))
      .attr(
        "height",
        (d: DType) => yScale(0) - yScale(d.carbon_total_absolute)
      );

    bar_excess_g
      .selectAll(".carbon-excess-rect")
      .data(data)
      .join("rect")
      .attr("class", "carbon-excess-rect")
      .attr("fill", colors.reds.light)
      .attr("x", (d: DType) => xScale(d.year.toString()))
      .attr("width", xScale.bandwidth())
      .attr("y", (d: DType) => yScale(d.carbon_total_absolute))
      .attr(
        "height",
        (d: DType) =>
          yScale(d.threshold_absolute as number) -
          yScale(d.carbon_total_absolute)
      );

    let threshold_line_thickness = 3;
    let createThresholdLine = d3
      .line<DType>()
      .curve(d3.curveStepAfter)
      .x((d) => {
        return xScale(
          d.threshold_absolute !== null ? d.year.toString() : "2024"
        ) as number;
      })

      .y((d) => {
        return yScale(
          d.threshold_absolute !== null
            ? d.threshold_absolute
            : yScale.domain()[1]
        );
      });

    let threshold_path = bindD3Element(
      line_threshold_g,
      "path",
      "threshold-path"
    );

    threshold_path
      .datum(data)
      .attr("d", createThresholdLine)
      .style("fill", "none")
      .style("stroke", colors.reds.dark)
      .style("stroke-width", threshold_line_thickness)
      .style("stroke-dasharray", "5");
  }
};

export default createCarbonGraph;
