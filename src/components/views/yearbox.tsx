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
    borderRadius: "5px",
    display: "inline-block",
    margin: "5px",
    padding: "15px",
    textAlign: "center",
    backgroundColor: colors.grays.medium,
  },
  yearBoxActive: {
    backgroundColor: colors.main.primary,
  },
  headerText: {
    fontWeight: 600,
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
      {value_array.map((e) => (
        <div>{e}</div>
      ))}
    </div>
  );
};
export default YearBox;
