import * as React from "react";
import * as d3 from "d3";
import { bindD3Element } from "./d3helpers";
import D3Wrapper from "./d3wrapper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { fuel_colors } from "styles/colors";

type PieDataType = {
  key: string;
  value: number;
  fill: string;
};

const FuelSummaryView: React.FunctionComponent = () => {
  const { active_view_dimensions } = useAppSelector((state) => state.ui);

  const { building_outputs } = useAppSelector((state) => state);

  const {
    annual_cost_by_fuel,
    annual_site_energy_by_fuel,
    annual_native_energy_by_fuel,
    annual_cost_per_sf_by_fuel,
    annual_site_per_sf_by_fuel,
    annual_native_energy_per_sf_by_fuel,
    annual_carbon_by_year_by_fuel,
    annual_carbon_per_sf_by_year_by_fuel,
  } = building_outputs;

  const createChart = (ref: HTMLDivElement) => {
    if (annual_cost_by_fuel) {
      /* -- DEFINE DATA AND CONSTANTS -- */

      let data: PieDataType[] = Object.keys(annual_cost_per_sf_by_fuel)
        .map((key) => {
          let d: PieDataType = {
            key: key,
            value:
              annual_cost_per_sf_by_fuel[
                key as keyof typeof annual_cost_per_sf_by_fuel
              ],
            fill: fuel_colors[key as keyof typeof fuel_colors],
          };
          return d;
        })
        .filter((d) => d.value !== 0);

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

      let piewidth = plot_dims.width;
      let pieheight = plot_dims.height;

      let margin = Math.max(pieheight * 0.05, 10);
      let radius = Math.min(piewidth, pieheight) / 2;

      let colorScale = d3
        .scaleOrdinal()
        .domain(Object.keys(fuel_colors))
        .range(Object.values(fuel_colors));

      let svg = bindD3Element(ref, "svg", "fuel-summary-svg")
        .attr("height", container_height)
        .attr("width", container_width);

      let pieFunc = d3
        .pie()
        .value((d: any) => {
          return d;
        })
        .sort(null);

      let arcFunc = d3
        .arc()
        .innerRadius((radius - margin) * 0.7)
        .outerRadius(radius - margin);

      const cost_g = bindD3Element(svg, "g", "cost-donut-g").attr(
        "transform",
        `translate(${margins.l + plot_dims.width / 2}, ${
          margins.t + plot_dims.height / 2
        })`
      );

      let arcs = pieFunc(data.map((e) => e.value));

      cost_g
        .selectAll(".cost-donut-g-path")
        .data(arcs)
        .join("path")
        .attr("class", "cost-donut-g-path")
        .attr("d", arcFunc)
        .attr("fill", (d: d3.PieArcDatum<any>) => {
          return fuel_colors[data[d.index].key as keyof typeof fuel_colors];
        });
    }
  };

  return <D3Wrapper createChartCallback={createChart} />;
};

export default FuelSummaryView;
