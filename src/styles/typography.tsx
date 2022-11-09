import styled from "styled-components";
import { colors } from "./colors";

export const SubHeaderLined = styled("div")`
  font-family: CircularStd-Black;
  font-size: 16px;
  margin-top: 10px;
  /* margin-left: 10px; */
  margin-bottom: 10px;
`;

export const DialogueHeader = styled("div")`
  font-family: CircularStd-Bold;
  font-size: 20px;
  margin-top: 10px;
  /* margin-left: 10px; */
  margin-bottom: 10px;
  width: 100%;
`;

export const ChartHeaderLined = styled("div")`
  display: inline-block;
  font-family: CircularStd-Black;
  font-size: 16px;
  margin-bottom: 10px;
  margin-right: 10px;
`;

export const MenuTitle = styled("div")`
  font-size: 20px;
  font-family: CircularStd-Bold;
  color: ${colors.secondary.dark};
  border-top: 4px solid ${colors.secondary.main};
  border-bottom: 4px solid ${colors.secondary.main};
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
  display: block;
  text-align: left;
  color: ${colors.grays.dark};
  font-size: 36px;
  font-family: CircularStd-Medium;
`;

export const HeaderLL84Label = styled("div")`
  display: block;
  text-align: left;
  color: ${colors.grays.dark};
  font-size: 20px;
  font-family: CircularStd-Book;
  margin-left: 5px;
  letter-spacing: 0.1em;
`;

export const HeaderBuildingTitleGray = styled(HeaderBuildingTitle)`
  font-family: CircularStd-Book;
  color: rgb(180, 180, 180);
  cursor: pointer;
  transition: color 200ms;
  &:hover {
    color: ${colors.grays.light};
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
  & span {
    color: ${colors.akf.red};
  }
`;
