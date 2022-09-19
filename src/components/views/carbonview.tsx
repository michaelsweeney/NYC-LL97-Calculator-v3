import * as React from "react";
import * as d3 from "d3";
import { D3Wrapper } from "./d3wrapper";
const CarbonView: React.FunctionComponent = () => {
  const createChart = (ref: HTMLElement) => {
    let plot_dimensions = ref.getBoundingClientRect();
    console.log(plot_dimensions);
    let svg = d3
      .select(ref)
      .selectAll("svg")
      .data([0])
      .join("svg")
      .attr("class", "carbonview-svg'");

    let rect = svg.selectAll("rect").data([0]).join("rect");

    rect
      .attr("width", plot_dimensions.width / 2)
      .attr("height", plot_dimensions.height / 2)
      .attr("fill", "black");
  };

  return (
    <div>
      <D3Wrapper createChartCallback={createChart} dependencies={[]} />
    </div>
  );
};

export default CarbonView;
