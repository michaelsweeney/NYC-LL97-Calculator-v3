import * as React from "react";
import * as d3 from "d3";
import { bindD3Element } from "./d3helpers";
import D3Wrapper from "./d3wrapper";
import { useAppSelector } from "store/hooks";
import { fuel_colors } from "styles/colors";
import {
  D3WrapperCallbackPropTypes,
  InlineStylesType,
  UtilityConsumptionType,
} from "types";

type PieDataType = {
  key: string;
  value: number;
  fill: string;
};

const styles: InlineStylesType = {
  root: {
    display: "inline-block",
    height: "100%",
    width: "100%",
    boxSizing: "border-box",
  },
  top: {
    display: "inline-block",
    height: "50%",
    width: "100%",
    boxSizing: "border-box",
  },
  bottom: {
    display: "inline-block",
    height: "50%",
    width: "100%",
    boxSizing: "border-box",
  },
  left: {
    display: "inline-block",
    width: "50%",
    height: "100%",
    boxSizing: "border-box",
  },
  right: {
    display: "inline-block",
    width: "50%",
    height: "100%",
    boxSizing: "border-box",
  },
};

const FuelSummaryView: React.FunctionComponent = () => {
  const {
    building_outputs: {
      annual_cost_per_sf_by_fuel,
      annual_site_per_sf_by_fuel,
      annual_carbon_per_sf_by_year_by_fuel,
    },
  } = useAppSelector((state) => state);

  const cost_data = annual_cost_per_sf_by_fuel;
  const eui_data = annual_site_per_sf_by_fuel;

  const carbon_2024_data = annual_carbon_per_sf_by_year_by_fuel?.find(
    (d) => d.year === 2024
  )?.consumption as UtilityConsumptionType;

  const carbon_2050_data = annual_carbon_per_sf_by_year_by_fuel?.find(
    (d) => d.year === 2050
  )?.consumption as UtilityConsumptionType;

  const createChart = (config: {
    container: D3WrapperCallbackPropTypes;
    data_obj: UtilityConsumptionType;
    title: string;
  }) => {
    const {
      container: { container_ref, container_dimensions },
      data_obj,
      title,
    } = config;

    if (data_obj) {
      /* -- DEFINE DATA AND CONSTANTS -- */

      let data: PieDataType[] = Object.keys(data_obj)
        .map((key) => {
          let d: PieDataType = {
            key: key,
            value: data_obj[key as keyof typeof data_obj],
            fill: fuel_colors[key as keyof typeof fuel_colors],
          };
          return d;
        })
        .filter((d) => d.value !== 0);

      let container_width = container_dimensions.width;
      let container_height = container_dimensions.height;

      let margins = {
        t: 10,
        l: 10,
        r: 10,
        b: 10,
      };

      let plot_dims = {
        width: container_width - margins.l - margins.r,
        height: container_height - margins.t - margins.b,
      };

      let piewidth = plot_dims.width;
      let pieheight = plot_dims.height;

      let margin = Math.max(pieheight * 0.05, 10);
      let radius = Math.min(piewidth, pieheight) / 2;

      // let colorScale = d3
      //   .scaleOrdinal()
      //   .domain(Object.keys(fuel_colors))
      //   .range(Object.values(fuel_colors));

      let svg = bindD3Element(container_ref, "svg", "fuel-summary-svg")
        .attr("height", container_height)
        .attr("width", container_width);

      let titletext = bindD3Element(svg, "text", "title-text")
        .attr("x", container_width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle");

      titletext.text(title);

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

      const donut_g = bindD3Element(svg, "g", "donut-g").attr(
        "transform",
        `translate(${margins.l + plot_dims.width / 2}, ${
          margins.t + plot_dims.height / 2
        })`
      );

      let arcs = pieFunc(data.map((e) => e.value));

      donut_g
        .selectAll(".donut-g-path")
        .data(arcs)
        .join("path")
        .attr("class", "donut-g-path")
        .attr("d", arcFunc)
        .attr("fill", (d: d3.PieArcDatum<any>) => {
          return fuel_colors[data[d.index].key as keyof typeof fuel_colors];
        });
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.top}>
        <div style={styles.left}>
          <D3Wrapper
            createChartCallback={(d) =>
              createChart({
                container: d,
                data_obj: cost_data,
                title: "Annual Cost Summary",
              })
            }
          />
        </div>
        <div style={styles.right}>
          <D3Wrapper
            createChartCallback={(d) =>
              createChart({
                container: d,
                data_obj: eui_data,
                title: "Annual Site EUI Summary",
              })
            }
          />{" "}
        </div>
      </div>
      <div style={styles.bottom}>
        <div style={styles.left}>
          <D3Wrapper
            createChartCallback={(d) =>
              createChart({
                container: d,
                data_obj: carbon_2024_data,
                title: "Carbon Intensity - 2024",
              })
            }
          />
        </div>
        <div style={styles.right}>
          <D3Wrapper
            createChartCallback={(d) =>
              createChart({
                container: d,
                data_obj: carbon_2050_data,
                title: "Carbon Intensity - 2050",
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FuelSummaryView;
