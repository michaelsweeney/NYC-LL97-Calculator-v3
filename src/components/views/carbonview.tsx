import * as React from "react";
import * as d3 from "d3";

import { Button } from "@mui/material";
import SVGWrapper from "./svgwrapper";
import { formatNumber } from "./d3helpers";

import { useAppSelector } from "store/hooks";
import { bindD3Element } from "./d3helpers";
import { ChartHeaderLined } from "styles/typography";
import {
  CarbonSummaryByYearObj,
  D3WrapperCallbackPropTypes,
  InlineStylesType,
} from "types";

import { colors } from "styles/colors";

type DType = CarbonSummaryByYearObj;

const styles: InlineStylesType = {
  root: {},
  header: {
    height: "50px",
    padding: 10,
    boxSizing: "border-box",
  },
  main: {
    height: "calc(100% - 50px)",
    boxSizing: "border-box",
  },
};

const CarbonView: React.FunctionComponent = () => {
  const { annual_carbon_summary_by_year } = useAppSelector(
    (state) => state.building_outputs
  );

  const createCarbonLayout = (container: D3WrapperCallbackPropTypes) => {
    const { container_ref, container_dimensions } = container;

    // make svg and establish dimensions / groups for chart vs table.
    let container_width = container_dimensions.width;
    let container_height = container_dimensions.height;

    let table_height = 100;

    let table_margins = {
      t: 15,
      l: 100,
      r: 100,
      b: 15,
    };

    let plot_margins = {
      t: 0,
      l: 100,
      r: 100,
      b: 40,
    };

    let table_dims = {
      width: container_width - table_margins.l - table_margins.r,
      height: table_height,
    };

    let plot_dims = {
      width: container_width - plot_margins.l - plot_margins.r,
      height: container_height - plot_margins.t - plot_margins.b - table_height,
    };

    let svg = bindD3Element(container_ref, "svg", "carbonview-svg")
      .attr("height", container_height)
      .attr("width", container_width);

    let table_g = bindD3Element(svg, "g", "table-g");
    table_g.attr(
      "transform",
      `translate(${table_margins.l},${table_margins.t})`
    );

    let plot_g = bindD3Element(svg, "g", "plot-g");
    plot_g.attr(
      "transform",
      `translate(${plot_margins.l},${plot_margins.t + table_height})`
    );

    let data = annual_carbon_summary_by_year;

    if (data) {
      /* ---------------------------- */
      /* -------- CARBON PLOT VIEW ------- */
      /* ---------------------------- */

      let ypaddingtop = 1.15;

      let bar_carbon_g = bindD3Element(plot_g, "g", "bar-carbon-g");
      let bar_excess_g = bindD3Element(plot_g, "g", "bar-excess-g");

      let line_threshold_g = bindD3Element(plot_g, "g", "line-threshold-g");

      let text_g = bindD3Element(plot_g, "g", "text-g");

      let y_label = bindD3Element(text_g, "text", "y-label-text");

      y_label
        .text("Tons Carbon per Year (tCO2e)")
        .attr("transform", "rotate(270)")
        .attr("y", -plot_margins.l / 2 - 10)
        .attr("x", -plot_margins.t + -plot_dims.height / 2)
        .attr("text-anchor", "middle")
        .style("font-family", "CircularStd-Medium")
        .style("font-size", "14px");

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

      bar_carbon_g
        .selectAll(".carbon-rect")
        .data(data)
        .join("rect")
        .attr("class", "carbon-rect")
        .attr("fill", colors.secondary.main as string)
        .attr("x", (d: DType) => xScale(d.year.toString()))
        .attr("width", xScale.bandwidth())
        .attr("y", (d: DType) => yScale(d.carbon_total_absolute))
        .attr(
          "height",
          (d: DType) => yScale(0) - yScale(d.carbon_total_absolute)
        );

      bar_excess_g
        .selectAll(".carbon-excess-rect")
        .data(data)
        .join("rect")
        .attr("class", "carbon-excess-rect")
        .attr("fill", colors.reds.light)
        .attr("x", (d: DType) => xScale(d.year.toString()))
        .attr("width", xScale.bandwidth())
        .attr("y", (d: DType) => yScale(d.carbon_total_absolute))
        .attr(
          "height",
          (d: DType) =>
            yScale(d.threshold_absolute as number) -
            yScale(d.carbon_total_absolute)
        );

      let threshold_line_thickness = 3;
      let createThresholdLine = d3
        .line<DType>()
        .curve(d3.curveStepAfter)
        .x((d) => {
          return xScale(
            d.threshold_absolute !== null ? d.year.toString() : "2024"
          ) as number;
        })

        .y((d) => {
          return yScale(
            d.threshold_absolute !== null
              ? d.threshold_absolute
              : yScale.domain()[1]
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
        .style("stroke-width", threshold_line_thickness)
        .style("stroke-dasharray", "5");

      /* ---------------------------- */
      /* -------- TABLE VIEW -------- */
      /* ---------------------------- */
      const summary_years = [2024, 2030, 2035, 2040, 2050];

      const text_vertical_spacing = 20;

      const index_width = 180;

      const col_width = Math.max(70, (table_dims.width - index_width) / 6);

      const font_size = 12;

      const summary_array = summary_years.map((yr) => {
        return {
          year: yr.toString(),
          consumption: formatNumber(
            data?.find((d) => d.year === yr)?.carbon_total_absolute as number
          ),
          threshold: formatNumber(
            data?.find((d) => d.year === yr)?.threshold_absolute as number
          ),
          fine: formatNumber(data?.find((d) => d.year === yr)?.fine as number),
          is_fine: (data?.find((d) => d.year === yr)?.fine as number) > 0,
        };
      });

      const table_rect = bindD3Element(table_g, "rect", "table-outline");

      table_rect
        .attr("y", -font_size)
        .attr("width", table_dims.width)
        .attr("height", table_dims.height)
        .attr("fill", "none")
        .attr("stroke", "black");

      let table_columns = table_g
        .selectAll(".summary-column-g")
        .data(summary_array)
        .join("g")
        .attr("class", "summary-column-g")
        .attr(
          "transform",
          (d: any, i: number) => `translate(${col_width * i},0)`
        )
        .attr("data-array-index", (d: any, i: number) => i)
        .attr("data-year", (d: any) => d.year)
        .attr("data-threshold", (d: any) => d.threshold)
        .attr("data-consumption", (d: any) => d.consumption)
        .attr("data-fine", (d: any) => d.fine)
        .attr("data-isfine", (d: any) => d.is_fine);

      let table_row_labels = [
        "Year",
        "Consumption (tCO2e/yr)",
        "Threshold (tCO2e/yr)",
        "Fine ($/yr)",
      ];

      let table_row_keys = ["year", "consumption", "threshold", "fine"];

      const getKeyValObj = (d: string, el: any) => {
        //@ts-ignore
        let key = d;
        let obj =
          summary_array[+el.parentNode.getAttribute("data-array-index")];
        let val = [obj[d as keyof typeof obj]];
        return { key, val, obj };
      };

      let table_index = table_g
        .selectAll(".summary-column-row-g")
        .data(table_row_labels)
        .join("text")
        .attr("class", "summary-column-row-g")
        .attr("y", (d: any, i: number) => i * text_vertical_spacing);

      table_index
        .text((d: any) => d)
        .style("font-size", font_size)
        .style("font-family", "CircularStd-Black");

      let table_data = table_columns
        .selectAll(".summary-table-text")
        .data(table_row_keys)
        .join("text")
        .attr("class", "summary-table-text");

      table_data
        .attr("x", index_width)
        .attr("y", (d: any, i: number) => i * text_vertical_spacing)
        .style("font-family", (d: any) =>
          d === "year" ? "CircularStd-Black" : "CircularStd-Book"
        )
        .style("fill", function (d: any) {
          //@ts-ignore
          let { key, val, obj } = getKeyValObj(d, this);
          return obj.is_fine ? colors.reds.medium : "black";
        })
        .style("font-size", "12px")
        .style("text-anchor", "middle")
        .style("cursor", "pointer")
        .text(function (d: any) {
          //@ts-ignore
          let { val } = getKeyValObj(d, this);
          return val;
        });

      /* ---------------------------- */
      /* ---- HOVER INTERACTIONS ---- */
      /* ---------------------------- */

      table_columns.on("mouseover", function (d: any) {
        console.log(d);
        //@ts-ignore
        console.log(this);
        //@ts-ignore
        // let { key, val, obj } = getKeyValObj(d, this);
        // console.log(key, val, obj);
      });
    }
  };

  return (
    <>
      <div style={styles.header}>
        <span>
          <ChartHeaderLined>Carbon Threshold Summary</ChartHeaderLined>
        </span>
        <span>
          <Button size="small" color="secondary" variant="contained">
            T
          </Button>
        </span>
      </div>
      <div style={styles.main}>
        <SVGWrapper createChartCallback={createCarbonLayout} />
      </div>
    </>
  );
};

export default CarbonView;

export const a = () => {
  return (
    <div></div>
    //       <div style={styles.yearBoxContainer}>
    //         {year_box_array.map((d, i) => {
    //           return (
    //             <React.Fragment key={i}>
    //               <YearBox
    //                 key={i}
    //                 header={d.year}
    //                 is_active={d.is_fine}
    //                 value_array={[d.consumption, d.threshold, d.fine]}
    //               />
    //             </React.Fragment>
    //           );
    //         })}
    //         <div style={styles.yearBoxTextLabels}>
    //           <div>
    //             {" "}
    //             <br></br>
    //           </div>
    //           <div>Consumption (tCO2e/yr)</div>
    //           <div>Threshold (tCO2e/yr)</div>
    //           <div>Est Penalty ($)</div>
    //         </div>
    //       </div>
    //     </div>
  );
};
