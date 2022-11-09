import * as React from "react";

import InputBuilding from "./inputbuilding";
import InputUtilities from "./inpututilities";
import InputOnsiteGeneration from "./inputonsitegeneration";
// import CoefficientSelector from "./coefficientselector";
import { SubHeaderLined } from "styles/typography";
import { InlineStylesType } from "types";
import styled from "styled-components";

const SidebarSubHeader = styled(SubHeaderLined)`
  margin-left: 15px;
`;

const Sidebar = () => {
  return (
    <div>
      <SidebarSubHeader>Building Inputs</SidebarSubHeader>
      <InputBuilding />
      <SidebarSubHeader>Utility Inputs</SidebarSubHeader>
      <InputUtilities />
      <SidebarSubHeader>Onsite Generation</SidebarSubHeader>
      <InputOnsiteGeneration />
    </div>
  );
};

export default Sidebar;
