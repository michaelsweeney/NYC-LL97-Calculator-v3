import SVGWrapper from "./svgwrapper";
import { bindD3Element } from "./d3helpers";
import { D3WrapperCallbackPropTypes } from "types";
import { useAppSelector } from "store/hooks";
import { transformChartData } from "./transformchartdata";
import * as d3 from "d3";
import { bar_colors, colors } from "styles/colors";
import { getMaxValFromStack, getMinValFromStack } from "./d3helpers";
import { range_year_lengths } from "locallaw/lookups";
import { chart_background_color } from "styles/colors";

const ChartView = () => {
  const { view_type, stack_type, unit_type } = useAppSelector(
    (state) => state.ui.chart_view
  );
  const { building_outputs } = useAppSelector((state) => state);

  const createLayout = (props: D3WrapperCallbackPropTypes) => {
    let data = transformChartData(
      building_outputs,
      view_type,
      stack_type,
      unit_type
    );
    let stack_keys = data[0].stack_keys;
    //@ts-ignore
    let stacked_data = d3.stack().keys(stack_keys)(data);

    if (data && data[0]) {
      const { container_dimensions, container_ref } = props;

      let container_width = container_dimensions.width;
      let container_height = container_dimensions.height;

      let container_padding = {
        t: 25,
        l: 100,
        r: 75,
        b: 30,
      };

      let y_padding = 1;

      let legend_height = 150;

      let plot_dims = {
        x: container_padding.l,
        y: container_padding.t + legend_height,
        width: container_width - container_padding.l - container_padding.r,
        height:
          container_height -
          container_padding.t -
          legend_height -
          container_padding.b,
      };

      let legend_dims = {
        x: container_padding.l,
        y: container_padding.t,
        width: container_width - container_padding.l - container_padding.r,
        height: legend_height,
      };

      /* ------------------------------------------ */
      /* ------ SVG AND SVG GROUPS ---------------- */
      /* ------------------------------------------ */
      let svg = bindD3Element(container_ref, "svg", "chart-svg")
        .attr("height", container_height)
        .attr("width", container_width);

      let plot_g = bindD3Element(svg, "g", "plot-g").attr(
        "transform",
        `translate(${plot_dims.x},${plot_dims.y})`
      );

      let legend_g = bindD3Element(svg, "g", "legend-g").attr(
        "transform",
        `translate(${legend_dims.x},${legend_dims.y})`
      );
      let table_g = bindD3Element(svg, "g", "table-g").attr(
        "transform",
        `translate(${legend_dims.x},${legend_dims.y})`
      );

      let axis_g = bindD3Element(plot_g, "g", "axis-g");
      let y_axis_g = bindD3Element(axis_g, "g", "y-axis-g");

      let bar_g = bindD3Element(plot_g, "g", "bar-g");
      let gridlines_g = bindD3Element(plot_g, "g", "gridlines-g");

      let vertical_line_g = bindD3Element(plot_g, "g", "vert-line-g");
      let line_threshold_g = bindD3Element(plot_g, "g", "line-threshold-g");
      /* ------------------------------------------ */
      /* ------ SCALES ---------------------------- */
      /* ------------------------------------------ */

      let xScale = d3
        .scaleLinear()
        .domain([2020 as number, 2050 + range_year_lengths["2050-"]])
        .range([0, plot_dims.width]);

      let width_per_year =
        plot_dims.width / (xScale.domain()[1] - xScale.domain()[0]);
      //@ts-ignore
      let threshold_max = d3.max(data.map((d) => d.threshold));
      let yScale = d3
        .scaleLinear()
        .range([plot_dims.height, 0])
        .domain([
          0,
          d3.max([
            getMaxValFromStack(stacked_data),
            //@ts-ignore
            d3.max(data.map((d) => d.threshold)),
          ]) * y_padding,
        ]);

      let colorScale = d3
        .scaleOrdinal()
        .domain(data[0].stack_keys)
        .range(data[0].stack_keys.map((d) => bar_colors[d]));

      /* ------------------------------------------ */
      /* ------ CREATE AXES AND GRIDS ------------- */
      /* ------------------------------------------ */

      let yaxis = d3.axisLeft(yScale).ticks(5);
      y_axis_g.call(yaxis);
      y_axis_g.selectAll("line").remove();
      y_axis_g.selectAll(".domain").remove();

      gridlines_g
        .call(d3.axisLeft(yScale).ticks(5).tickSize(-plot_dims.width))
        .style("stroke-dasharray", "1 1");
      gridlines_g.selectAll("text").remove();
      gridlines_g.selectAll(".domain").remove();

      //@ts-ignore
      let vline_data = data.filter((d) =>
        [2024, 2030, 2035, 2040, 2050].includes(d.year)
      );

      vertical_line_g
        .selectAll(".vertical-line-white")
        .data(vline_data)
        .join("line")
        .attr("class", "vertical-line-white")
        .attr("x1", (d: any) => xScale(d.year))
        .attr("x2", (d: any) => xScale(d.year))
        .attr("y1", legend_dims.y - legend_height)
        .attr("y2", yScale(0))
        .style("stroke", chart_background_color)
        .style("stroke-width", "6px");

      vertical_line_g
        .selectAll(".vertical-line-solid")
        .data(vline_data)
        .join("line")
        .attr("class", "vertical-line-solid")
        .attr("x1", (d: any) => xScale(d.year))
        .attr("x2", (d: any) => xScale(d.year))
        .attr("y1", legend_dims.y - legend_height)
        .attr("y2", yScale(0))
        .style("stroke", "black")
        .style("stroke-width", "2px");

      let plot_border = bindD3Element(plot_g, "line", "bottom-plot-line")
        .attr("x1", 0)
        .attr("x2", plot_dims.width)
        .attr("y1", yScale(0))
        .attr("y2", yScale(0))
        .attr("stroke", "black")
        .attr("stroke-width", 1);

      let y_label = bindD3Element(axis_g, "text", "y-label")
        .attr("x", 0)
        .attr("y", plot_dims.height + 22)
        .style("text-anchor", "left")
        .text(() => {
          let unit = view_type === "cost" ? "$" : "kg CO2e";
          let by_unit = unit_type === "absolute" ? "" : "/SF";
          let text = unit + by_unit + "/yr";
          return text;
        });

      /* ------------------------------------------ */
      /* ------ GENERAL STACKED BAR CREATION ------ */
      /* ------------------------------------------ */
      let stacked_group_g = bar_g
        .selectAll(".stacked-group-g")
        .data(stacked_data)
        .join("g")
        .attr("class", "stacked-group-g")
        //@ts-ignore
        .attr("fill", (d, i) => {
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
          return d.data.period_length * width_per_year;
        });

      /* ------------------------------------------ */
      /* ------ CARBON THRESHOLD FOR CARBON  ------ */
      /* ------------------------------------------ */
      if (view_type === "carbon") {
        let threshold_line_thickness = 6;

        let createThresholdLine = d3
          .line<any>()
          .curve(d3.curveStepAfter)
          .x((d) => {
            return xScale(d.threshold !== null ? d.year : 2024) as number;
          })

          .y((d) => {
            return yScale(
              d.threshold !== null ? d.threshold : yScale.domain()[1]
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
          .style("stroke", "#FF5C00")
          .style("stroke-width", threshold_line_thickness);
      }
      if (view_type === "cost") {
        line_threshold_g.remove();
      }
      /* ------------------------------------------ */
      /* ------ CREATE TABLE  --------------------- */
      /* ------------------------------------------ */

      let legend_text = legend_g.selectAll(".legend-text-").data(data);
      console.log(building_outputs);

      let carbon_legend_data = data
        .map((d) => {
          return {
            year: d?.year,
            //@ts-ignore
            threshold: d?.threshold,
            //@ts-ignore
            total: d?.total,
            fine: d?.fine,
            is_fine: d?.is_fine,
          };
        })
        .filter((d) => d.threshold !== null);

      console.log(carbon_legend_data);

      /* ------------------------------------------ */
      /* ------ CREATE LEGEND --------------------- */
      /* ------------------------------------------ */
    }
  };
  return <SVGWrapper createChartCallback={createLayout} />;
};

export default ChartView;
