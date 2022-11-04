import * as d3 from "d3";
import SVGWrapper from "./svgwrapper";
import { D3WrapperCallbackPropTypes } from "types";
import { useAppSelector } from "store/hooks";

import { getCarbonChartData, getCostChartData } from "./transformdata";
import { setupSVGComponents } from "./setupsvgcomponents";

import { createCarbonChart } from "./createcarbonchart";
import { createCostChart } from "./createcostchart";
import { createLegend } from "./createlegend";
import { createTable } from "./createtable";

const ChartView = () => {
  const { view_type, stack_type, unit_type } = useAppSelector(
    (state) => state.ui.chart_view
  );

  const { window_size } = useAppSelector((state) => state.ui);
  const { building_outputs } = useAppSelector((state) => state);

  const createLayout = (props: D3WrapperCallbackPropTypes) => {
    const { container_dimensions, container_ref } = props;

    let container_padding = {
      t: 60,
      l: 100,
      r: 75,
      b: 25,
    };

    let y_padding = 1.15;

    let legend_height = 40;
    let table_height = 130;

    let svg_components = setupSVGComponents(
      container_dimensions,
      container_ref,
      container_padding,
      y_padding,
      legend_height,
      table_height
    );

    let cost_chart_data = getCostChartData(
      building_outputs,
      stack_type,
      unit_type
    );

    let carbon_chart_data = getCarbonChartData(
      building_outputs,
      stack_type,
      unit_type
    );

    if (view_type === "cost") {
      createCostChart({
        chart_data: cost_chart_data.chart_data,
        stack_data: cost_chart_data.stack_data,
        svg_components,
        unit_type,
        stack_type,
      });

      createLegend({
        legend_data: cost_chart_data.legend_data,
        svg_components,
      });

      createTable({
        chart_data: cost_chart_data.chart_data,
        svg_components,
        stack_type,
        view_type,
        unit_type,
        window_size,
      });
    } else {
      createCarbonChart({
        chart_data: carbon_chart_data.chart_data,
        stack_data: carbon_chart_data.stack_data,
        svg_components,
        unit_type,
        stack_type,
      });

      createLegend({
        legend_data: carbon_chart_data.legend_data,
        svg_components,
      });

      createTable({
        chart_data: cost_chart_data.chart_data,
        svg_components,
        stack_type,
        view_type,
        unit_type,
        window_size,
      });
    }
  };
  return <SVGWrapper createChartCallback={createLayout} />;
};

export default ChartView;
