import * as React from "react";
import * as d3 from "d3";
import D3Wrapper from "./d3wrapper";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { bindElement } from "./d3helpers";

const CarbonView: React.FunctionComponent = () => {
  const { active_view_dimensions } = useAppSelector((state) => state.ui);

  const createChart = (ref: HTMLElement) => {
    let container_width = active_view_dimensions.width;
    let container_height = active_view_dimensions.height;

    let margins = {
      top: 50,
      left: 50,
      right: 50,
      bottom: 50,
    };

    let plot_dimensions = {
      width: container_width - margins.left - margins.right,
      height: container_height - margins.top - margins.bottom,
    };

    // let svg = d3
    //   .select(ref)
    //   .selectAll(".carbonview-svg")
    //   .data([0])
    //   .join("svg")
    //   .attr("class", "carbonview-svg")
    //   .attr("width", container_width)
    //   .attr("height", container_height);

    console.log(ref);

    let svg = bindElement(ref, "svg", "carbonview-svg");

    let rect = bindElement(svg, "rect", "somerect");

    rect
      .attr("width", active_view_dimensions.width / 2)
      .attr("height", active_view_dimensions.height / 2)
      .attr("fill", "red");
  };

  return <D3Wrapper createChartCallback={createChart} />;
};

export default CarbonView;
