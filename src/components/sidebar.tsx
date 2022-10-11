import { Table, TableBody, TableContainer } from "@mui/material";

import * as React from "react";

import InputBuilding from "./inputbuilding";
import InputUtilities from "./inpututilities";
import InputOnsiteGeneration from "./inputonsitegeneration";
import CoefficientSelector from "./coefficientselector";
import { InlineStylesType } from "types";
import styled from "styled-components";
const styles: InlineStylesType = {
  root: {},
};

interface IAppProps {}

const SidebarHeaderText = styled("div")`
  font-family: CircularStd-Black;
  font-size: 16px;
  margin-left: 20px;
  &:after {
    width: 50px;
    display: block;
    height: 4px;
    margin-top: 4px;
    background-color: rgb(186, 214, 54);
    content: "";
  }
`;

const Sidebar: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div style={styles.root}>
      <SidebarHeaderText>Building Inputs</SidebarHeaderText>
      <InputBuilding />
      <SidebarHeaderText>Utility Inputs</SidebarHeaderText>
      <InputUtilities />
      <SidebarHeaderText>Onsite Generation</SidebarHeaderText>
      <InputOnsiteGeneration />
      <SidebarHeaderText>Carbon Coefficients</SidebarHeaderText>
      <CoefficientSelector />
    </div>
  );
};

export default Sidebar;
