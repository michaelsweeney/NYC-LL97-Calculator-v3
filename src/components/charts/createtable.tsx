import * as d3 from "d3";
import "./tablestyles.css";
import { bindD3Element, formatCurrency, formatNumber } from "./d3helpers";
import {
  CostChartDataTypes,
  CarbonChartDataTypes,
  ChartViewViewType,
  ChartViewStackType,
  ChartViewUnitType,
  WindowSizeTypes,
} from "types";
type DataType = CostChartDataTypes | CarbonChartDataTypes;

export const createTable = (props: {
  svg_components: { [key: string]: any };
  chart_data: CostChartDataTypes[] | CarbonChartDataTypes[];
  unit_type: ChartViewUnitType;
  stack_type: ChartViewStackType;
  view_type: ChartViewViewType;
  window_size: WindowSizeTypes;
}) => {
  const {
    svg_components,
    chart_data,
    unit_type,
    stack_type,
    view_type,
    window_size,
  } = props;

  const { table_g, xScale, table_dims } = svg_components;

  let dimensions = {
    row_height: 40,
    border_y_offset: 5,
    index_position: xScale(2024) - 10,
    row_text_y_offset: 5,
    idx_top_offset: 15,
    idx_bottom_offset: 1,
  };

  //@ts-ignore
  let data_filtered = chart_data.filter((d: DataType) => d.year !== 2022);

  let table_columns = table_g
    .selectAll(".table-column-g")
    .data(data_filtered)
    .join("g")
    .attr("class", "table-column-g")
    .attr("transform", (d: DataType) => `translate(${xScale(d.year)},0)`);

  let table_index = bindD3Element(table_g, "g", "table-index-g");
  let table_borders = bindD3Element(table_g, "g", "table-borders-g");

  /* ---------------------- */
  /* ---- TABLE VALUES---- */
  /* ---------------------- */
  table_columns.each(function (d: DataType, i: number) {
    let header_text = d.period;
    //@ts-ignore
    let el = d3.select(this);

    let xpos = (svg_components.width_per_year * d.period_length) / 2;
    let titlexpos = xpos;

    let row_key_map = {
      row_1: {
        carbon: {
          absolute: formatNumber(d.total_carbon as number, 0),
          normalized: formatNumber(d.total_carbon as number, 4),
        },
        cost: {
          absolute: formatCurrency(d.total_cost, 0),
          normalized: formatCurrency(d.total_cost, 2),
        },
      },
      row_2: {
        carbon: {
          absolute: formatNumber(d.threshold_carbon as number, 0),
          normalized: formatNumber(d.threshold_carbon as number, 4),
        },

        cost: {
          absolute: formatCurrency(d.fine, 0),
          normalized: formatCurrency(d.fine, 2),
        },
      },

      row_3: {
        carbon: {
          absolute: formatCurrency(d.fine as number, 0),
          normalized: formatCurrency(d.fine as number, 2),
        },
        cost: {
          absolute: formatCurrency(d.total_cost + d.fine, 0),
          normalized: formatCurrency(d.total_cost + d.fine, 2),
        },
      },
    };

    let title = bindD3Element(el, "text", "period-title-text")
      .text(header_text)
      .attr("x", titlexpos)
      .classed("period-title-text", true)
      .classed("period-title-text-small", window_size === "small");

    let row_1 = bindD3Element(el, "text", "row-1-text")
      .text(row_key_map["row_1"][view_type][unit_type])
      .attr("x", xpos)
      .attr("y", dimensions.row_height * 1 - dimensions.row_text_y_offset)
      .classed("table-val-text", true)
      .classed("table-val-text-small", window_size === "small");

    let row_2 = bindD3Element(el, "text", "row-2-text")
      .text(row_key_map["row_2"][view_type][unit_type])
      .attr("x", xpos)
      .attr("y", dimensions.row_height * 2 - dimensions.row_text_y_offset)
      .classed("table-val-text table-val-alert-text", true)
      .classed("table-val-text-small", window_size === "small");

    let row_3 = bindD3Element(el, "text", "row-3-text")
      .text(row_key_map["row_3"][view_type][unit_type])
      .attr("x", xpos)
      .attr("y", dimensions.row_height * 3 - dimensions.row_text_y_offset)
      .classed("table-val-text", true)
      .classed("table-val-text-small", window_size === "small");
  });

  /* ---------------------- */
  /* ---- INDEX LABELS ---- */
  /* ---------------------- */

  // unit_type,

  let index_name_map = {
    idx_row_1: {
      carbon: {
        absolute: {
          top: "Consumption",
          bottom: "(tCO2e/yr)",
        },
        normalized: {
          top: "Consumption",
          bottom: "(tCO2e/sf/yr)",
        },
      },
      cost: {
        absolute: {
          top: "Utility Cost",
          bottom: "($/yr)",
        },
        normalized: {
          top: "Utility Cost",
          bottom: "($/sf/yr)",
        },
      },
    },
    idx_row_2: {
      carbon: {
        absolute: {
          top: "Threshold",
          bottom: "(tCO2e/yr)",
        },
        normalized: {
          top: "Threshold",
          bottom: "(tCO2e/sf/yr)",
        },
      },
      cost: {
        absolute: {
          top: "Est Penalty",
          bottom: "($/yr)",
        },
        normalized: {
          top: "Est Penalty",
          bottom: "($/sf/yr)",
        },
      },
    },

    idx_row_3: {
      carbon: {
        absolute: {
          top: "Est Penalty",
          bottom: "($/yr)",
        },
        normalized: {
          top: "Est Penalty",
          bottom: "($/sf/yr)",
        },
      },
      cost: {
        absolute: {
          top: "Total Cost",
          bottom: "($/yr)",
        },
        normalized: {
          top: "Total Cost",
          bottom: "($/sf/yr)",
        },
      },
    },
  };

  let index_1_top = bindD3Element(table_index, "text", "index-1-text-top")
    .attr("y", dimensions.row_height * 1 - dimensions.idx_top_offset)
    .attr("x", dimensions.index_position)
    //@ts-ignore
    .text(index_name_map["idx_row_1"][view_type][unit_type]["top"])
    .classed("idx-top-text", true)
    .classed("idx-top-text-small", window_size === "small");

  let index_2_top = bindD3Element(table_index, "text", "index-2-text-top")
    .attr("y", dimensions.row_height * 2 - dimensions.idx_top_offset)
    .attr("x", dimensions.index_position)
    //@ts-ignore
    .text(index_name_map["idx_row_2"][view_type][unit_type]["top"])
    .classed("idx-top-text idx-alert-text", true)
    .classed("idx-top-text-small", window_size === "small");

  let index_3_top = bindD3Element(table_index, "text", "index-3-text-top")
    .attr("y", dimensions.row_height * 3 - dimensions.idx_top_offset)
    .attr("x", dimensions.index_position)
    //@ts-ignore
    .text(index_name_map["idx_row_3"][view_type][unit_type]["top"])
    .classed("idx-top-text", true)
    .classed("idx-top-text-small", window_size === "small");

  let index_1_bottom = bindD3Element(table_index, "text", "index-1-text-bottom")
    .attr("y", dimensions.row_height * 1 + dimensions.idx_bottom_offset)
    .attr("x", dimensions.index_position)

    //@ts-ignore
    .text(index_name_map["idx_row_1"][view_type][unit_type]["bottom"])
    .classed("idx-bottom-text", true)
    .classed("idx-bottom-text-small", window_size === "small");

  let index_2_bottom = bindD3Element(table_index, "text", "index-2-text-bottom")
    .attr("y", dimensions.row_height * 2 + dimensions.idx_bottom_offset)
    .attr("x", dimensions.index_position)
    //@ts-ignore
    .text(index_name_map["idx_row_2"][view_type][unit_type]["bottom"])
    .classed("idx-bottom-text idx-alert-text", true)
    .classed("idx-bottom-text-small", window_size === "small");

  let index_3_bottom = bindD3Element(table_index, "text", "index-3-text-bottom")
    .attr("y", dimensions.row_height * 3 + dimensions.idx_bottom_offset)
    .attr("x", dimensions.index_position)
    //@ts-ignore
    .text(index_name_map["idx_row_3"][view_type][unit_type]["bottom"])
    .classed("idx-bottom-text", true)
    .classed("idx-bottom-text-small", window_size === "small");

  /* ------------------------------------ */
  /* ---- BORDERS & HORIZONTAL LINES ---- */
  /* ------------------------------------ */
  let border_top = bindD3Element(table_borders, "line", "border-top-line")
    .attr("x1", 0)
    .attr("x2", table_dims.width)
    .attr("y1", dimensions.border_y_offset)
    .attr("y2", dimensions.border_y_offset)
    .classed("border-top", true);

  let border_bottom = bindD3Element(table_borders, "line", "border-bottom-line")
    .attr("x1", 0)
    .attr("x2", table_dims.width)
    .attr(
      "y1",
      dimensions.border_y_offset +
        dimensions.row_height * 3 +
        dimensions.border_y_offset
    )
    .attr(
      "y2",
      dimensions.border_y_offset +
        dimensions.row_height * 3 +
        dimensions.border_y_offset
    )
    .classed("border-bottom", true);

  let border_mid_line_one = bindD3Element(
    table_borders,
    "line",
    "border-mid-line-one"
  )
    .attr("x1", 0)
    .attr("x2", table_dims.width)
    .attr(
      "y1",
      dimensions.border_y_offset +
        dimensions.row_height * 1 +
        dimensions.border_y_offset
    )
    .attr(
      "y2",
      dimensions.border_y_offset +
        dimensions.row_height * 1 +
        dimensions.border_y_offset
    )
    .classed("border-mid", true);

  let border_mid_line_two = bindD3Element(
    table_borders,
    "line",
    "border-mid-line-two"
  )
    .attr("x1", 0)
    .attr("x2", table_dims.width)
    .attr(
      "y1",
      dimensions.border_y_offset +
        dimensions.row_height * 2 +
        dimensions.border_y_offset
    )
    .attr(
      "y2",
      dimensions.border_y_offset +
        dimensions.row_height * 2 +
        dimensions.border_y_offset
    )
    .classed("border-mid", true);
};
