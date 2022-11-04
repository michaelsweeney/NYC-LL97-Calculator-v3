import * as React from "react";
import { colors } from "styles/colors";

import { InlineStylesType } from "types";

import ChartViewSelector from "./chartviewselector";
import ChartOptionSelector from "./chartoptionselector";
import ChartView from "./charts/chartview";

const top_height = "50px";
const bottom_height = "50px";

interface IAppProps {}
const styles: InlineStylesType = {
  root: {},
  control_container_top: {
    height: top_height,
    width: "100%",
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  chart_container: {
    height: `calc(100% - ${top_height} - ${bottom_height})`,
    width: "100%",
    display: "inline-block",
    borderTop: `1px solid ${colors.grays.light}`,
    borderBottom: `1px solid ${colors.grays.light}`,
  },
  control_container_bottom: {
    height: bottom_height,
    width: "100%",
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
};

const ViewContainer: React.FunctionComponent<IAppProps> = () => {
  return (
    <React.Fragment>
      <div style={styles.control_container_top}>
        <ChartViewSelector />
      </div>
      <div style={styles.chart_container}>
        <ChartView />
      </div>
      <div style={styles.control_container_bottom}>
        <ChartOptionSelector />
      </div>
    </React.Fragment>
  );
};

export default ViewContainer;
