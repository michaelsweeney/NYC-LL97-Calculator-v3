import { Table, TableBody, TableContainer } from "@mui/material";

import * as React from "react";

import InputBuilding from "./inputbuilding";
import InputUtilities from "./inpututilities";
import InputOnsiteGeneration from "./inputonsitegeneration";
import CoefficientSelector from "./coefficientselector";
import { InlineStylesType } from "types";

const styles: InlineStylesType = {
  root: {},
};

interface IAppProps {}

const Sidebar: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div style={styles.root}>
      <div>Building Inputs</div>
      <InputBuilding />
      <div>Utility Inputs</div>
      <InputUtilities />
      <div>Onsite Generation</div>
      <InputOnsiteGeneration />
      Carbon Coefficients
      <CoefficientSelector />
    </div>
  );
};

export default Sidebar;
