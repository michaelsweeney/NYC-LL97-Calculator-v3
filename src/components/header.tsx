import * as React from "react";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { colors } from "styles/colors";

import {
  HeaderBuildingTitle,
  HeaderBuildingTitleGray,
  HeaderLL84Label,
} from "styles/typography";
import { InlineStylesType } from "types";
import NavMenu from "./navmenu";

import CalcLogo from "./calclogo";
import styled from "styled-components";

interface IAppProps {}

const left_width = "350px";
const right_width = "100px";

const styles: InlineStylesType = {
  root: {},
  left: {
    width: left_width,
    display: "inline-block",
    verticalAlign: "middle",
    paddingLeft: "25px",
    paddingRight: "15px",
    boxSizing: "border-box",
  },
  middle: {
    width: `calc(100% - ${left_width} - ${right_width})`,
    textAlign: "left",
    display: "inline-block",
    verticalAlign: "middle",
    paddingLeft: "10px",
    boxSizing: "border-box",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  right: {
    width: right_width,
    paddingRight: "25px",
    display: "inline-block",
    verticalAlign: "middle",
    textAlign: "right",
    boxSizing: "border-box",
  },
};

const TitleContainer = styled.div`
  cursor: pointer;
  transition: color 200ms;
  &:hover div {
    color: ${colors.grays.light};
  }
`;

const Header: React.FunctionComponent<IAppProps> = () => {
  const dispatch = useAppDispatch();
  const { is_ll84_loaded, ll84_year_label, ll84_building_name } =
    useAppSelector((state) => state.ll84_query);

  const handleLL84NameClick = () => {
    dispatch(uiActions.setIsLoadModalOpen(true));
  };

  return (
    <React.Fragment>
      <div style={styles.left}>
        <CalcLogo />
      </div>
      <div style={styles.middle}>
        <div>
          {is_ll84_loaded ? (
            <TitleContainer onClick={handleLL84NameClick}>
              <HeaderBuildingTitle>{ll84_building_name}</HeaderBuildingTitle>
              <HeaderLL84Label>{ll84_year_label}</HeaderLL84Label>
            </TitleContainer>
          ) : (
            <HeaderBuildingTitleGray onClick={handleLL84NameClick}>
              find your building
            </HeaderBuildingTitleGray>
          )}
        </div>
      </div>
      <div style={styles.right}>
        <NavMenu />
      </div>
    </React.Fragment>
  );
};

export default Header;
