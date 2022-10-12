import * as React from "react";

import InputBuilding from "./inputbuilding";
import InputUtilities from "./inpututilities";
import InputOnsiteGeneration from "./inputonsitegeneration";
// import CoefficientSelector from "./coefficientselector";
import { SubHeaderLined } from "styles/typography";
import { InlineStylesType } from "types";
import styled from "styled-components";
const styles: InlineStylesType = {
  root: {},
};

interface IAppProps {}

const SidebarSubHeader = styled(SubHeaderLined)`
  margin-left: 15px;
`;

const Sidebar: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div style={styles.root}>
      <SidebarSubHeader>Building Inputs</SidebarSubHeader>
      <InputBuilding />
      <SidebarSubHeader>Utility Inputs</SidebarSubHeader>
      <InputUtilities />
      <SidebarSubHeader>Onsite Generation</SidebarSubHeader>
      <InputOnsiteGeneration />
      {/* <SidebarHeader>Carbon Coefficients</SidebarHeader> */}
      {/* <CoefficientSelector /> */}
    </div>
  );
};

export default Sidebar;
