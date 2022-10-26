import SVGWrapper from "./svgwrapper";
import { bindD3Element } from "./d3helpers";
import { BarKeyTypes, D3WrapperCallbackPropTypes } from "types";
import { useAppSelector } from "store/hooks";
import { transformChartData } from "./transformchartdata";
import * as d3 from "d3";
import { bar_colors, colors } from "styles/colors";
import { getMaxValFromStack, getMinValFromStack } from "./d3helpers";
import { range_year_lengths } from "locallaw/lookups";
const ChartView = () => {
  const { view_type, stack_type, unit_type } = useAppSelector(
    (state) => state.ui.chart_view
  );
  const { building_outputs } = useAppSelector((state) => state);

  let data = transformChartData(
    building_outputs,
    view_type,
    stack_type,
    unit_type
  );

  //@ts-ignore
  let stacked_data = d3.stack().keys(data[0].stack_keys)(data);

  const createLayout = (props: D3WrapperCallbackPropTypes) => {
    const { container_dimensions, container_ref } = props;

    let container_width = container_dimensions.width;
    let container_height = container_dimensions.height;

    let container_padding = {
      t: 25,
      l: 50,
      r: 50,
      b: 25,
    };

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

    let xScale = d3
      .scaleLinear()
      .domain([2022 as number, 2050 + range_year_lengths["2050-"]])
      .range([0, plot_dims.width]);

    let width_per_year =
      plot_dims.width / (xScale.domain()[1] - xScale.domain()[0]);

    let ymax = getMaxValFromStack(stacked_data);
    //@ts-ignore
    let max_threshold = d3.max(data.map((d) => d.threshold));
    ymax = d3.max([ymax, max_threshold]);

    let yScale = d3
      .scaleLinear()
      .range([plot_dims.height, 0])
      .domain([0, ymax]);

    let colorScale = d3
      .scaleOrdinal()
      .domain(data[0].stack_keys)
      //@ts-ignore
      .range(data[0].stack_keys.map((d) => bar_colors[d]));

    let stacked_group_g = plot_g
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

    if (view_type === "carbon") {
      let line_threshold_g = bindD3Element(plot_g, "g", "line-threshold-g");

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
        .style("stroke", colors.reds.dark)
        .style("stroke-width", threshold_line_thickness);
    }
  };
  return <SVGWrapper createChartCallback={createLayout} />;
};

export default ChartView;
