import * as d3 from "d3";
import {
  CostChartDataTypes,
  ChartViewUnitType,
  ChartViewStackType,
  D3StackType,
} from "types";
import { bindD3Element, getMaxValFromStack } from "./d3helpers";
import { chart_background_color, bar_colors } from "styles/colors";
import { bar_keys_to_labels } from "locallaw/lookups";

export const createLegend = (props: {
  svg_components: { [key: string]: any };
  legend_data: string[];
}) => {
  let { legend_data, svg_components } = props;

  let { legend_g } = svg_components;

  const legend_obj = legend_data.map((d) => {
    return {
      key: d,
      label: bar_keys_to_labels[d as keyof typeof bar_keys_to_labels],
      color: bar_colors[d as keyof typeof bar_colors],
      label_length:
        bar_keys_to_labels[d as keyof typeof bar_keys_to_labels].length,
    };
  });

  let positions: { [key: string]: string | number }[] = [];

  let text_length_multiplier = 9;
  let rect_size = 20;
  let text_padding_left = 5;
  legend_obj.forEach((o, i) => {
    if (i === 0) {
      positions.push({
        key: o.key,
        position: 0,
      });
    } else {
      let prev_obj_length = legend_obj[i - 1].label_length;
      let prev_obj_position = positions[i - 1].position as number;

      positions.push({
        key: o.key,
        prev_obj_length: prev_obj_length,
        prev_obj_position: prev_obj_position,
        position:
          prev_obj_length * text_length_multiplier +
          rect_size * 2 +
          text_padding_left +
          prev_obj_position,
      });
    }
  });

  let legend_rects = legend_g
    .selectAll(".legend-rect")
    .data(legend_obj)
    .join("rect")
    .attr("class", "legend-rect")
    .attr("x", (d: typeof legend_obj[0], i: number) => positions[i].position)
    .attr("y", 0)
    .attr("width", rect_size)
    .attr("height", rect_size)
    .attr("fill", (d: typeof legend_obj[0]) => d.color);

  let legend_text = legend_g
    .selectAll(".legend-text")
    .data(legend_obj)
    .join("text")
    .attr("class", "legend-text")
    .attr(
      "x",
      (d: typeof legend_obj[0], i: number) =>
        (positions[i].position as number) + text_padding_left + rect_size
    )

    .attr("y", rect_size / 2 + 5)
    .text((d: typeof legend_obj[0]) => d.label);

  let text_widths: any[] = [];
  legend_text.nodes().forEach((e: any, i: number) => {
    text_widths.push({
      val: d3.select(e).text(),
      width: e.getBBox().width,
    });
  });

  console.log(text_widths);
};
