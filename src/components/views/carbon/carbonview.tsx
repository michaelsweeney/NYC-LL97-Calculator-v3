import * as React from "react";
import { useState } from "react";
import * as d3 from "d3";

import { Button } from "@mui/material";
import SVGWrapper from "../svgwrapper";

import { useAppSelector } from "store/hooks";
import { ChartHeaderLined } from "styles/typography";
import {
  CarbonSummaryByYearObj,
  D3WrapperCallbackPropTypes,
  InlineStylesType,
} from "types";

import CarbonSummaryTable from "./carbonsummarytable";
import createCarbonGraph from "./createcarbongraph";

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
  tableContainer: {
    height: "125px",
    paddingTop: "15px",
    paddingLeft: "105px",
    paddingRight: "125px",
    width: "100%",
    boxSizing: "border-box",
  },
  chartContainer: {
    height: "calc(100% - 125px)",
  },
};

const CarbonView: React.FunctionComponent = () => {
  const { annual_carbon_summary_by_year } = useAppSelector(
    (state) => state.building_outputs
  );

  const [focusedYears, setFocusedYears] = useState([0]);

  console.log(focusedYears);

  const createCarbonLayout = (container: D3WrapperCallbackPropTypes) => {
    createCarbonGraph({
      container: container,
      data: annual_carbon_summary_by_year,
      focused_years: focusedYears,
      yearBlurCallback: handleYearsBlur,
      yearFocusCallback: handleYearsFocus,
    });
  };

  const handleYearsFocus = (e: number[]) => {
    setFocusedYears(e);
  };

  const handleYearsBlur = (e: number[]) => {
    setFocusedYears(e);
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
        <div style={styles.tableContainer}>
          <CarbonSummaryTable
            yearFocusCallback={handleYearsFocus}
            yearBlurCallback={handleYearsBlur}
            focused_years={focusedYears}
          />
        </div>
        <div style={styles.chartContainer}>
          <SVGWrapper createChartCallback={createCarbonLayout} />
        </div>
      </div>
    </>
  );
};

export default CarbonView;
