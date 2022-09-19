import * as React from "react";
import * as d3 from "d3";
import D3Wrapper from "./d3wrapper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { bindD3Element } from "./d3helpers";
import { CarbonSummaryByYearObj } from "types";

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
      let barwidth = plot_dims.width / data.length - 10;

      /* -- PULL OUT AND PROCESS DATA ARRAYS -- */
      let svg = bindD3Element(ref, "svg", "carbonview-svg")
        .attr("height", container_height)
        .attr("width", container_width);

      let plot_g = bindD3Element(svg, "g", "plot-g");
      plot_g.attr("transform", `translate(${margins.l},${margins.t})`);

      /* -- SETUP SCALES AND AXES -- */

      let x_axis_g = bindD3Element(plot_g, "g", "x-axis-g").attr(
        "transform",
        `translate(${0}, ${plot_dims.height})`
      );

      let y_axis_g = bindD3Element(plot_g, "g", "y-axis-g");
      let bar_carbon_g = bindD3Element(plot_g, "g", "bar-carbon-g");
      let line_threshold_g = bindD3Element(plot_g, "g", "line-threshold-g");

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
      x_axis_g.call(d3.axisBottom(xScale));

      /* -- DATA LINES AND RECTANGLES -- */

      bar_carbon_g
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", "carbon-rect")
        .attr("fill", "#595954")
        .attr("x", (d) => xScale(d.year.toString()))
        .attr("y", (d) => yScale(d.carbon_total_absolute))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => yScale(0) - yScale(d.carbon_total_absolute));

      let createThresholdLine = d3
        .line()
        .curve(d3.curveStepAfter)
        .x(
          (d) =>
            xScale(d.threshold_absolute ? d.year.toString() : "2024") +
            xScale.bandwidth() / 2
        )
        .y((d) =>
          yScale(
            d.threshold_absolute
              ? d.threshold_absolute
              : data.find((d) => d.year === 2024).threshold_absolute
          )
        );

      let threshold_path = bindD3Element(
        line_threshold_g,
        "path",
        "threshold-path"
      );

      threshold_path
        .datum(data)
        .attr("d", createThresholdLine)
        .style("fill", "none")
        .style("stroke", "#BAD636")
        .style("stroke-width", 3);
    }
  };

  return <D3Wrapper createChartCallback={createChart} />;
};

export default CarbonView;
