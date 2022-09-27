import * as React from "react";
import * as d3 from "d3";
import D3Wrapper from "./d3wrapper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { bindD3Element } from "./d3helpers";
import { CarbonSummaryByYearObj } from "types";

import { colors } from "styles/colors";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

type DType = CarbonSummaryByYearObj;

const CarbonView = () => {
  const { active_view_dimensions } = useAppSelector((state) => state.ui);

  const { building_outputs } = useAppSelector((state) => state);
  const { annual_carbon_summary_by_year } = building_outputs;
  const { annual_cost_by_fuel } = building_outputs;

  const createChart = (ref: HTMLDivElement) => {
    if (annual_cost_by_fuel && annual_carbon_summary_by_year) {
      const total_annual_utility_cost = d3.sum(
        Object.values(annual_cost_by_fuel)
      );

      // console.log(total_annual_utility_cost);
      // console.log(
      //   annual_carbon_summary_by_year.find((d) => d.year === 2024)?.fine
      // );
      // console.log(
      //   annual_carbon_summary_by_year.find((d) => d.year === 2030)?.fine
      // );
      // console.log(
      //   annual_carbon_summary_by_year.find((d) => d.year === 2035)?.fine
      // );

      const max_fine = d3.max(
        annual_carbon_summary_by_year.map((d) => d.fine)
      ) as number;
      const max_yval = max_fine + total_annual_utility_cost;

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
      let svg = bindD3Element(ref, "svg", "costview-svg")
        .attr("height", container_height)
        .attr("width", container_width);

      let plot_g = bindD3Element(svg, "g", "plot-g");
      plot_g.attr("transform", `translate(${margins.l},${margins.t})`);

      /* -- SETUP SCALES AND AXES -- */

      let bar_utility_g = bindD3Element(plot_g, "g", "bar-utility-g");
      let bar_fine_g = bindD3Element(plot_g, "g", "bar-fine-g");

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
        .domain([0, max_yval * ypaddingtop])
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

      bar_utility_g
        .selectAll(".utility-rect")
        .data(data)
        .join("rect")
        .attr("class", "utility-rect")
        .attr("fill", colors.main.secondary)
        .attr("x", (d: DType) => xScale(d.year.toString()))
        .attr("width", xScale.bandwidth())
        .attr("y", (d: DType) => yScale(total_annual_utility_cost))
        .attr(
          "height",
          (d: DType) => yScale(0) - yScale(total_annual_utility_cost)
        );

      // console.log(data);

      // console.log(total_annual_utility_cost);

      bar_fine_g
        .selectAll(".carbon-fine-rect")
        .data(data)
        .join("rect")
        .attr("class", "carbon-fine-rect")
        .attr("fill", colors.reds.light)
        .attr("x", (d: DType) => xScale(d.year.toString()))
        .attr("width", xScale.bandwidth())

        .attr("y", (d: DType) => yScale(d.fine + total_annual_utility_cost))
        .attr("height", (d: DType) => yScale(0) - yScale(d.fine));
      // .attr("y", (d: DType) => yScale(total_annual_utility_cost))
      // .attr(
      //   "height",
      //   (d: DType) => yScale(d.fine) - yScale(total_annual_utility_cost)
      // );
    }
  };

  return <D3Wrapper createChartCallback={createChart} />;
};

export default CarbonView;
