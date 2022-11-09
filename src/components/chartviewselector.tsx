import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import styled from "styled-components";
import { uiActions } from "store/uislice";

import ChartViewButton from "./charttogglebutton";

const MainContainer = styled.div`
  margin-left: 10px;
  margin-right: 0px;
  padding-top: 10px;
  padding-bottom: 0px;
  box-sizing: border-box;
`;

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
    <MainContainer>
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
    </MainContainer>
  );
};

export default ChartViewSelector;
