import {
  CarbonSummaryByYearObj,
  D3WrapperCallbackPropTypes,
  UtilityConsumptionType,
} from "types";
import * as d3 from "d3";

import { bindD3Element } from "../d3helpers";
import { colors, fuel_colors } from "styles/colors";

type PropTypes = {
  container: D3WrapperCallbackPropTypes;
  annual_carbon_summary_by_year: CarbonSummaryByYearObj[];
  is_stacked: boolean;
  annual_cost_by_fuel: UtilityConsumptionType;
};

const createCostGraph = (props: PropTypes) => {
  const {
    container,
    annual_carbon_summary_by_year,
    annual_cost_by_fuel,
    is_stacked,
  } = props;
  const { container_ref, container_dimensions } = container;

  let container_width = container_dimensions.width;
  let container_height = container_dimensions.height;

  let margins = {
    t: 150,
    l: 100,
    r: 150,
    b: 100,
  };
  let svg = bindD3Element(container_ref, "svg", "costview-svg")
    .attr("height", container_height)
    .attr("width", container_width);

  let plot_g = bindD3Element(svg, "g", "plot-g");
  plot_g.attr("transform", `translate(${margins.l},${margins.t})`);

  if (annual_carbon_summary_by_year && annual_cost_by_fuel) {
    /* ---------------------------- */
    /* ---- SETUP ----------------- */
    /* ---------------------------- */

    const total_annual_utility_cost = d3.sum(
      Object.values(annual_cost_by_fuel)
    );

    const max_fine = d3.max(
      annual_carbon_summary_by_year.map((d) => d.fine)
    ) as number;
    const max_yval = max_fine + total_annual_utility_cost;

    let plot_dims = {
      width: container_width - margins.l - margins.r,
      height: container_height - margins.t - margins.b,
    };

    let ypaddingtop = 1.15;

    let xScale = d3
      .scaleBand()
      .domain(annual_carbon_summary_by_year.map((d) => d.year.toString()))
      .range([0, plot_dims.width])
      .align(0.5)
      .paddingInner(0.2)
      .paddingOuter(0.4);

    let yScale = d3
      .scaleLinear()
      .domain([0, max_yval * ypaddingtop])
      .range([plot_dims.height, 0]);
    /* ---------------------------- */
    /* ---- SIMPLE COST BAR VIEW--- */
    /* ---------------------------- */

    let bar_utility_g = bindD3Element(plot_g, "g", "bar-utility-g");
    let bar_fine_g = bindD3Element(plot_g, "g", "bar-fine-g");

    let x_axis_g = bindD3Element(plot_g, "g", "x-axis-g").attr(
      "transform",
      `translate(${0}, ${plot_dims.height})`
    );

    let y_axis_g = bindD3Element(plot_g, "g", "y-axis-g");
    let right_axis_g = bindD3Element(plot_g, "g", "right-axis-g");
    let top_axis_g = bindD3Element(plot_g, "g", "top-axis-g");

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

    bar_utility_g
      .selectAll(".utility-rect")
      .data(annual_carbon_summary_by_year)
      .join("rect")
      .attr("class", "utility-rect")
      .attr("fill", colors.secondary.main)
      .attr("x", (d: any) => xScale(d.year.toString()))
      .attr("width", xScale.bandwidth())
      .attr("y", (d: any) => yScale(total_annual_utility_cost))
      .attr(
        "height",
        (d: any) => yScale(0) - yScale(total_annual_utility_cost)
      );

    bar_fine_g
      .selectAll(".carbon-fine-rect")
      .data(annual_carbon_summary_by_year)
      .join("rect")
      .attr("class", "carbon-fine-rect")
      .attr("fill", colors.reds.light)
      .attr("x", (d: any) => xScale(d.year.toString()))
      .attr("width", xScale.bandwidth())
      .attr("y", (d: any) => yScale(d.fine + total_annual_utility_cost))
      .attr("height", (d: any) => yScale(0) - yScale(d.fine));

    /* ---------------------------- */
    /* -- STACKED COST VIEW ------- */
    /* ---------------------------- */
    let stacked_bar_g = bindD3Element(plot_g, "g", "stacked-bar-g");

    let to_stack = annual_carbon_summary_by_year.map((d) => {
      return {
        year: d.year,
        fine: d.fine,
        elec: annual_cost_by_fuel.elec,
        steam: annual_cost_by_fuel.steam,
        gas: annual_cost_by_fuel.gas,
        fuel_two: annual_cost_by_fuel.fuel_two,
        fuel_four: annual_cost_by_fuel.fuel_four,
      };
    });

    let subgroups = ["fuel_four", "fuel_two", "gas", "steam", "elec", "fine"];

    let stacked_data = d3.stack().keys(subgroups)(to_stack);

    let fine_color = colors.primary.main;

    let colors_with_fine = { ...fuel_colors, fine: fine_color };

    let colormap = [
      ...subgroups.map(
        (d) => colors_with_fine[d as keyof typeof colors_with_fine]
      ),
    ];

    let colorScale = d3.scaleOrdinal().domain(subgroups).range(colormap);

    let stacked_year_g = stacked_bar_g
      .selectAll(".stacked-year-g")
      .data(stacked_data)
      .join("g")
      .attr("class", "stacked-year-g")
      .attr("fill", (d: any) => {
        return colorScale(d.key);
      });

    stacked_year_g
      .selectAll(".stacked-rect")
      .data((d: any) => d)
      .join("rect")
      .attr("class", "stacked-rect")
      .attr("x", (d: any) => xScale(d.data.year.toString()))
      .attr("y", (d: any) => yScale(d[1]))
      .attr("height", (d: any) => yScale(d[0]) - yScale(d[1]))
      .attr("width", xScale.bandwidth());

    /* ---------------------------- */
    /* ----  VIEW LOGIC  ---------- */
    /* ---------------------------- */

    if (is_stacked) {
      bar_fine_g.remove();
      bar_utility_g.remove();
    } else {
      stacked_bar_g.remove();
    }
  }
};

export default createCostGraph;
