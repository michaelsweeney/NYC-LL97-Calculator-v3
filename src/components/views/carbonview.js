import * as React from "react";
import * as d3 from "d3";
import D3Wrapper from "./d3wrapper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { bindD3Element } from "./d3helpers";
import { CarbonSummaryByYearObj } from "types";

import { colors } from "styles/colors";

const CarbonView = () => {
  const { active_view_dimensions } = useAppSelector((state) => state.ui);

  const { building_outputs } = useAppSelector((state) => state);
  let { annual_carbon_summary_by_year } = building_outputs;

  const createChart = (ref) => {
    if (annual_carbon_summary_by_year) {
      /* -- DEFINE DATA AND CONSTANTS -- */
      let data = annual_carbon_summary_by_year;
      let container_width = active_view_dimensions.width;
      let container_height = active_view_dimensions.height;

      let margins = {
        t: 150,
        l: 100,
        r: 150,
        b: 100,
      };

      let plot_dims = {
        width: container_width - margins.l - margins.r,
        height: container_height - margins.t - margins.b,
      };

      let ypaddingtop = 1.15;

      /* -- PULL OUT AND PROCESS DATA ARRAYS -- */
      let svg = bindD3Element(ref, "svg", "carbonview-svg")
        .attr("height", container_height)
        .attr("width", container_width);

      let plot_g = bindD3Element(svg, "g", "plot-g");
      plot_g.attr("transform", `translate(${margins.l},${margins.t})`);

      /* -- SETUP SCALES AND AXES -- */

      let bar_carbon_g = bindD3Element(plot_g, "g", "bar-carbon-g");
      let bar_excess_g = bindD3Element(plot_g, "g", "bar-excess-g");

      let line_threshold_g = bindD3Element(plot_g, "g", "line-threshold-g");

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
          d3.max([
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
          ]) * ypaddingtop,
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

      /* -- DATA LINES AND RECTANGLES -- */

      bar_carbon_g
        .selectAll(".carbon-rect")
        .data(data)
        .join("rect")
        .attr("class", "carbon-rect")
        .attr("fill", colors.main.secondary)
        .attr("x", (d) => xScale(d.year.toString()))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d.carbon_total_absolute))
        .attr("height", (d) => yScale(0) - yScale(d.carbon_total_absolute));

      bar_excess_g
        .selectAll(".carbon-excess-rect")
        .data(data)
        .join("rect")
        .attr("class", "carbon-excess-rect")
        .attr("fill", colors.reds.light)
        .attr("x", (d) => xScale(d.year.toString()))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d.carbon_total_absolute))
        .attr(
          "height",
          (d) => yScale(d.threshold_absolute) - yScale(d.carbon_total_absolute)
        );

      let threshold_line_thickness = 3;
      let createThresholdLine = d3
        .line()
        .curve(d3.curveStepAfter)
        .x((d) => {
          if (d.year === 2050) {
            return plot_dims.width;
          } else {
            return xScale(d.threshold_absolute ? d.year.toString() : "2024");
          }
        })

        .y((d) => {
          return yScale(
            d.threshold_absolute ? d.threshold_absolute : yScale.domain()[1]
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
        .style("stroke", colors.reds.medium)
        .style("stroke-width", threshold_line_thickness);
    }
  };

  return <D3Wrapper createChartCallback={createChart} />;
};

export default CarbonView;
