import styled from "styled-components";
import { colors } from "./colors";

export const SubHeaderLined = styled("div")`
  font-family: CircularStd-Black;
  font-size: 16px;
  margin-top: 10px;
  /* margin-left: 10px; */
  margin-bottom: 10px;
  &:after {
    width: 50px;
    display: block;
    height: 4px;
    margin-top: 4px;
    background-color: rgb(186, 214, 54);
    content: "";
  }
`;

export const ChartHeaderLined = styled("div")`
  display: inline-block;
  font-family: CircularStd-Black;
  font-size: 16px;
  margin-bottom: 10px;
  margin-right: 10px;
  &:after {
    width: 50px;
    display: block;
    height: 4px;
    margin-top: 4px;
    background-color: rgb(186, 214, 54);
    content: "";
  }
`;

export const MenuTitle = styled("div")`
  font-size: 20px;
  font-family: CircularStd-Bold;
  border-top: 4px solid ${colors.primary.main};
  border-bottom: 4px solid ${colors.primary.main};
  padding-top: 10px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;
`;

export const HeaderTitle = styled("div")`
  display: inline-block;
  text-align: center;
  color: ${colors.secondary.main};
  font-size: 26px;
  font-family: "CircularStd-Black";
`;

export const HeaderBuildingTitle = styled("div")`
  display: inline-block;
  text-align: center;
  color: ${colors.secondary.main};
  font-size: 20px;
  font-family: CircularStd-Medium;
  cursor: pointer;
  &:hover {
    color: ${colors.grays.dark};
  }
`;

export const FooterTextAccelerator = styled("div")`
  font-family: CircularStd-Black;
  color: ${colors.primary.main};
  font-size: "16px";
  font-weight: "700";
  & a {
    color: black;
    text-decoration: none;
  }
`;

export const FooterTextAKF = styled(FooterTextAccelerator)`
  color: ${colors.grays.dark};
  & a {
    color: ${colors.akf.red};
  }
`;
