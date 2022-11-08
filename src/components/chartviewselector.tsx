import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { uiActions } from "store/uislice";

import ChartViewButton from "./charttogglebutton";

const ChartViewSelector = () => {
  const { view_type } = useAppSelector((state) => state.ui.chart_view);
  const dispatch = useAppDispatch();

  const changeViewCallback = (d: string) => {
    dispatch(
      uiActions.setChartView({
        view_key: "view_type",
        view_value: d,
      })
    );
  };

  return (
    <div>
      <ChartViewButton
        label="carbon"
        view_key="carbon"
        is_active={view_type === "carbon"}
        callback={changeViewCallback}
      />
      <ChartViewButton
        label="cost"
        view_key="cost"
        is_active={view_type === "cost"}
        callback={changeViewCallback}
      />
    </div>
  );
};

export default ChartViewSelector;
