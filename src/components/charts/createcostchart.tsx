import * as d3 from "d3";
import {
  CostChartDataTypes,
  ChartViewUnitType,
  ChartViewStackType,
  D3StackType,
} from "types";
import { getMaxValFromStack, getHoverPosition } from "./d3helpers";
import {
  bar_colors,
  lightened_bar_colors,
  darkened_bar_colors,
} from "styles/colors";
import { getHoverText } from "./hovertext";

export const createCostChart = (props: {
  chart_data: CostChartDataTypes[];
  stack_data: D3StackType;
  svg_components: { [key: string]: any };
  unit_type: ChartViewUnitType;
  stack_type: ChartViewStackType;
}) => {
  let { chart_data, stack_data, svg_components, unit_type, stack_type } = props;

  let { xScale, title_text, hover_div, table_g } = svg_components;

  title_text.text("Annual Cost Summary");

  let yScale = d3
    .scaleLinear()
    .range([svg_components.plot_dims.height, 0])
    .domain([
      0,
      (getMaxValFromStack(stack_data) as number) * svg_components.y_padding,
    ]);

  let colorScale = d3
    .scaleOrdinal()
    .domain(chart_data[0].stack_keys)
    .range(chart_data[0].stack_keys.map((d) => bar_colors[d]));
  let colorScaleHover = d3
    .scaleOrdinal()
    .domain(chart_data[0].stack_keys)
    .range(chart_data[0].stack_keys.map((d) => darkened_bar_colors[d]));
  let yaxis = d3
    .axisLeft(yScale)
    .ticks(5)
    .tickFormat(d3.format(unit_type === "absolute" ? "$~s" : ".1"));
  svg_components.y_axis_g.call(yaxis);
  svg_components.y_axis_g.selectAll("line").remove();
  svg_components.y_axis_g.selectAll(".domain").remove();

  svg_components.gridlines_g
    .call(
      d3.axisLeft(yScale).ticks(5).tickSize(-svg_components.plot_dims.width)
    )
    .style("stroke-dasharray", "1 1");
  svg_components.gridlines_g.selectAll("text").remove();
  svg_components.gridlines_g.selectAll(".domain").remove();

  svg_components.y_label.text(() => {
    return unit_type === "absolute" ? "$/yr" : "$/sf/yr";
  });

  function handleBarMouseover(event: any, data: any) {
    let { year } = data.data;

    /* ---- set other rect styles in year-group ---- */
    stacked_rects.nodes().forEach((node: any) => {
      let node_data = JSON.parse(node.getAttribute("data-object"));
      if (year === node_data.year) {
        //@ts-ignore
        d3.select(node).attr("fill", (d: any) =>
          colorScaleHover(node_data.key)
        );
      }
    });

    /* ---- set table styles in year-group ---- */
    table_g
      .selectAll(".table-column-g")
      .nodes()
      .forEach((el: any) => {
        let node_year = +el.getAttribute("data-year");
        if (year === node_year) {
          d3.select(el)
            .selectAll(".table-val-text")
            .style("font-family", "CircularStd-Bold");
          d3.select(el)
            .selectAll(".period-title-text")
            .style("font-family", "CircularStd-Black");
        }
      });
    /* ---- set hover style and position ---- */
    hover_div.style("visibility", "visible");

    let { left_position, top_position } = getHoverPosition(event, "top");

    hover_div.style("left", left_position).style("top", top_position);
    let data_filter = chart_data.find(
      (d) => d.year === year
    ) as typeof chart_data[0];

    getHoverText(data_filter, unit_type, stack_type, "cost");
  }

  function handleBarMouseout(event: any, data: any) {
    let { year } = data.data;

    /* ---- reset other rect styles in year-group ---- */
    stacked_rects.nodes().forEach((node: any) => {
      let node_data = JSON.parse(node.getAttribute("data-object"));
      if (year === node_data.year) {
        //@ts-ignore
        d3.select(node).attr("fill", (d: any) => colorScale(node_data.key));
      }
    });

    /* ---- reset table styles in year-group ---- */
    table_g
      .selectAll(".table-column-g")
      .nodes()
      .forEach((el: any) => {
        let node_year = +el.getAttribute("data-year");
        if (year === node_year) {
          // style table columns
          d3.select(el)
            .selectAll(".table-val-text")
            .style("font-family", "CircularStd-Medium");
          d3.select(el)
            .selectAll(".period-title-text")
            .style("font-family", "CircularStd-Bold");
        }
      });

    /* ---- set hover style and position ---- */
    hover_div.style("visibility", "hidden");
  }

  let stacked_group_g = svg_components.bar_g
    .selectAll(".stacked-group-g")
    .data(stack_data)
    .join("g")
    .attr("class", "stacked-group-g")
    .attr("fill", (d: any, i: number) => colorScale(d.key))
    .attr("data-key", (d: any) => d.key);

  let stacked_rects = stacked_group_g
    .selectAll(".stacked-rect")
    .data((d: any, i: number) => d)
    .join("rect")
    .attr("class", "stacked-rect")
    .attr("data-object", function (d: any) {
      let obj = {
        year: d.data.year,
        bottom: d[0],
        top: d[1],
        //@ts-ignore
        key: this.parentNode.getAttribute("data-key"),
      };
      return JSON.stringify(obj);
    })
    .attr("x", (d: any) => xScale(d.data.year))
    .attr("y", (d: any) => yScale(d[1]))
    .attr("height", (d: any) => {
      return yScale(d[0]) - yScale(d[1]);
    })
    .attr("width", (d: any) => {
      return d.data.period_length * svg_components.width_per_year;
    })
    .style("cursor", "pointer")
    .on("mouseover", handleBarMouseover)
    .on("mouseout", handleBarMouseout);

  svg_components.threshold_g.remove();
};
