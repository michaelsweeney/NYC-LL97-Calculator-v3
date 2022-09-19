import * as React from "react";
import * as d3 from "d3";
import D3Wrapper from "./d3wrapper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { bindD3Element } from "./d3helpers";
import { CarbonSummaryByYearObj } from "types";

const CarbonView: React.FunctionComponent = () => {
  const { active_view_dimensions } = useAppSelector((state) => state.ui);

  const { building_outputs } = useAppSelector((state) => state);
  let { annual_carbon_summary_by_year } = building_outputs;

  const createChart = (ref: HTMLElement) => {
    if (annual_carbon_summary_by_year) {
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

      let barpadding = 5;
      let ypaddingtop = 1.15;

      let barwidth = plot_dims.width / data.length - 10;

      let axisfontsize = "12px";

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
        .scaleTime()
        .domain(d3.extent(data.map((d) => d.year)) as [number, number])
        .range([0 + barpadding, plot_dims.width - barpadding]);

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

      let yaxis = d3.axisLeft(yScale).ticks(5).tickSizeOuter(0);

      y_axis_g.call(yaxis);

      y_axis_g.selectAll("text").attr("font-size", axisfontsize);

      let xaxis_text = x_axis_g
        .selectAll(".tick")
        .data(data.map((d) => d.year))
        .join("text")
        .attr("class", "tick")
        .attr(
          "y",
          (d: any, i: number) => xScale(d) + barpadding + barwidth / 2 + i * 0.4 // 0.4 can probably be calculated but it accounts for the alignment of text along with bar centers.
        )
        .attr("x", -5)
        .attr("font-size", axisfontsize)
        .style("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .text((d: any) => d.toString());

      let borderline_g = bindD3Element(plot_g, "g", "borderline-g");
      bindD3Element(borderline_g, "line", "bottom-line")
        .attr("x1", 0)
        .attr("x2", plot_dims.width + barwidth + barpadding + barpadding)
        .attr("y1", yScale(0))
        .attr("y2", yScale(0))
        .style("stroke", "black")
        .style("stroke-width", 1);

      bindD3Element(borderline_g, "line", "right-line")
        .attr("x1", plot_dims.width + barwidth + barpadding + barpadding)
        .attr("x2", plot_dims.width + barwidth + barpadding + barpadding)
        .attr("y1", yScale(0))
        .attr("y2", yScale(yScale.domain()[1]))
        .style("stroke", "black")
        .style("stroke-width", 1);

      bindD3Element(borderline_g, "line", "top-line")
        .attr("x1", 0)
        .attr("x2", plot_dims.width + barwidth + barpadding + barpadding)
        .attr("y1", yScale(yScale.domain()[1]))
        .attr("y2", yScale(yScale.domain()[1]))
        .style("stroke", "black")
        .style("stroke-width", 1);

      // let x_axis_text = x_axis_g.selectAll("text").nodes();
      // if (x_axis_text.length === years.length) {
      //   x_axis_text[years.length - 1].remove();
      // }

      /* -- DATA LINES AND RECTANGLES -- */

      bar_carbon_g
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", "carbon-rect")
        .attr("x", (d: CarbonSummaryByYearObj) => xScale(d.year) + barpadding)
        .attr("y", (d: CarbonSummaryByYearObj) =>
          yScale(d.carbon_total_absolute)
        )

        .attr("fill", "red")
        .attr("width", barwidth)
        .attr(
          "height",
          (d: CarbonSummaryByYearObj) =>
            yScale(0) - yScale(d.carbon_total_absolute)
        );

      let createThresholdLine = d3
        .line()
        .x(
          (d: any) =>
            xScale(d.threshold_absolute ? d.year : 2024) +
            barwidth / 2 +
            barpadding
        )
        .y((d: any) => yScale(d.threshold_absolute ? d.threshold_absolute : 0));

      let threshold_path = bindD3Element(
        line_threshold_g,
        "path",
        "threshold-path"
      );

      threshold_path
        .datum(data)
        .attr("d", createThresholdLine)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width");
    }
  };

  return <D3Wrapper createChartCallback={createChart} />;
};

export default CarbonView;
