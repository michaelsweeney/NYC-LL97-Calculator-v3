import * as d3 from "d3";

import { bindD3Element } from "./d3helpers";
import { bar_colors } from "styles/colors";
import { bar_keys_to_labels } from "locallaw/lookups";

export const createLegend = (props: {
  svg_components: { [key: string]: any };
  legend_data: string[];
}) => {
  let { legend_data, svg_components } = props;

  let { legend_g, container_dimensions, legend_dims } = svg_components;

  let rect_size = 20;
  let text_padding = 10;
  let group_padding = 15;
  let top_padding = 25;
  let left_padding = 0;

  const legend_obj = legend_data.map((d) => {
    return {
      key: d,
      label: bar_keys_to_labels[d as keyof typeof bar_keys_to_labels],
      color: bar_colors[d as keyof typeof bar_colors],
    };
  });

  let legend_item = legend_g
    .selectAll(".legend-g")
    .data(legend_obj)
    .join("g")
    .attr("class", "legend-g");

  let current_position = 0;

  legend_item.each(function (d: any, i: any) {
    //@ts-ignore
    let el = d3.select(this);
    let legend_text = bindD3Element(el, "text", "legend-text")
      .text(d.label)
      .attr("alignment-baseline", "center")
      .attr("x", rect_size + text_padding)
      .attr("y", rect_size / 2 + 5);

    let legend_rect = bindD3Element(el, "rect", "legend-rect")
      .attr("width", rect_size)
      .attr("height", rect_size)
      .attr("fill", d.color)
      .attr("x", 0)
      .attr("y", 0);

    //@ts-ignore
    let text_width = el.node().getBBox().width;

    el.attr(
      "transform",
      `translate(${left_padding + current_position},${top_padding})`
    );

    current_position += text_width + group_padding;
  });

  // legend_item
  //   .selectAll(".legend-text")
  //   .data(legend_obj)
  //   .join("text")
  //   .attr("class", "legend-text");

  // legend_item
  //   .selectAll(".legend-rect")
  //   .data(legend_obj)
  //   .join("rect")
  //   .attr("class", "legend-rect")
  //   .attr("x", 1)
  //   .attr("y", 1)
  //   .attr("width", rect_size)
  //   .attr("height", rect_size);

  // let legend_rects = legend_g
  //   .selectAll(".legend-rect")
  //   .data(legend_obj)
  //   .join("rect")
  //   .attr("class", "legend-rect")
  //   .attr("x", 1)
  //   .attr("y", 1)
  //   .attr("width", rect_size)
  //   .attr("height", rect_size)
  //   .attr("fill", (d: typeof legend_obj[0]) => d.color);

  // let legend_text = legend_g
  //   .selectAll(".legend-text")
  //   .data(legend_obj)
  //   .join("text")
  //   .attr("class", "legend-text")
  //   .attr("x", 1)
  //   .attr("y", 1)
  //   .text((d: typeof legend_obj[0]) => d.label);

  // let text_widths: { key: string; width: number }[] = [];
  // legend_text.nodes().forEach((n: any) => {
  //   text_widths.push({
  //     key: d3.select(n).text(),
  //     width: n.getBBox().width,
  //   });
  // });

  // let current_position = 0;
  // let text_padding_left = 5;

  // legend_text.nodes().forEach((d: any) => {
  //   let sel = d3.select(d);
  //   let key = sel.text();
  //   let { width } = text_widths.find(
  //     (a) => key === a.key
  //   ) as typeof text_widths[0];
  //   sel.attr("x", current_position);
  //   current_position += width;
  // });

  // legend_text.nodes().forEach((d: any) => {
  //   let sel = d3.select(d);
  //   let key = sel.text();
  //   let { width } = text_widths.find(
  //     (a) => key === a.key
  //   ) as typeof text_widths[0];
  //   sel.attr("x", current_position);
  //   current_position += width;
  // });
};
