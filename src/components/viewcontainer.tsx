import * as React from "react";

import { InlineStylesType } from "types";

import ChartController from "./charts/chartcontroller";
import ChartView from "./charts/chartview";

interface IAppProps {}
const styles: InlineStylesType = {
  root: {},
  control_container: {
    height: "85px",
    width: "100%",
    display: "inline-block",
  },
  chart_container: {
    height: "calc(100% - 85px)",
    width: "100%",
    display: "inline-block",
  },
  button: {
    marginRight: "5px",
  },
};

const ViewContainer: React.FunctionComponent<IAppProps> = () => {
  return (
    <React.Fragment>
      <div style={styles.control_container}>
        <ChartController />
      </div>
      <div style={styles.chart_container}>
        <ChartView />
      </div>
    </React.Fragment>
  );
};

export default ViewContainer;
