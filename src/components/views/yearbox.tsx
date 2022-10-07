import * as react from "react";

import { formatNumber, formatCurrency } from "./d3helpers";
import {
  CarbonSummaryByYearObj,
  D3WrapperCallbackPropTypes,
  InlineStylesType,
} from "types";

import { colors } from "styles/colors";

const styles: InlineStylesType = {
  root: {},
  yearBox: {
    minWidth: 70,
    borderRadius: "5px",
    display: "inline-block",
    margin: "5px",
    padding: "15px",
    paddingLeft: "20px",
    paddingRight: "20px",
    textAlign: "center",
    backgroundColor: colors.grays.medium,
  },
  yearBoxActive: {
    backgroundColor: colors.main.primary,
  },
  headerText: {
    fontWeight: 600,
    marginBottom: 5,
  },
};

type YearBoxPropTypes = {
  header: number | string;
  value_array: number[] | string[];
  is_active: boolean;
};

const YearBox = (props: YearBoxPropTypes) => {
  const { header, value_array, is_active } = props;

  return (
    <div
      style={
        !is_active
          ? styles.yearBox
          : { ...styles.yearBox, ...styles.yearBoxActive }
      }
    >
      <div style={styles.headerText}>{header}</div>
      {value_array.map((e, i) => (
        <div key={i}>{e}</div>
      ))}
    </div>
  );
};
export default YearBox;
