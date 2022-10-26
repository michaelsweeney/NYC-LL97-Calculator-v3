import { useAppSelector } from "store/hooks";

import ControlToggle from "./controltoggle";

const ChartController = () => {
  const { view_type, stack_type, unit_type } = useAppSelector(
    (state) => state.ui.chart_view
  );

  return (
    <div>
      <ControlToggle
        label="Chart Type"
        toggle_key="view_type"
        options={["carbon", "cost"]}
        value={view_type}
      />
      <ControlToggle
        label="Unit Type"
        toggle_key="unit_type"
        options={["absolute", "normalized"]}
        value={unit_type}
      />

      <ControlToggle
        label="Stack By"
        toggle_key="stack_type"
        options={["summary", "enduse"]}
        value={stack_type}
      />
    </div>
  );
};

export default ChartController;
