import * as React from "react";
import { colors } from "styles/colors";

import { InlineStylesType } from "types";

import ChartViewSelector from "./chartviewselector";
import ChartView from "./charts/chartview";

interface IAppProps {}
const styles: InlineStylesType = {
  root: {},
  control_container: {
    height: "75px",
    width: "100%",
    display: "inline-block",
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
  chart_container: {
    height: "calc(100% - 75px)",
    width: "100%",
    display: "inline-block",
  },
};

const ViewContainer: React.FunctionComponent<IAppProps> = () => {
  return (
    <React.Fragment>
      <div style={styles.control_container}>
        <ChartViewSelector />
      </div>
      <div style={styles.chart_container}>
        <ChartView />
      </div>
    </React.Fragment>
  );
};

export default ViewContainer;
