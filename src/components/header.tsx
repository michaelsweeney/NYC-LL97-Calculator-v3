import * as React from "react";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { colors } from "styles/colors";

import {
  HeaderBuildingTitle,
  HeaderBuildingTitleGray,
  HeaderLL84Label,
} from "styles/typography";
import NavMenu from "./navmenu";
import { PrintIconButton } from "./iconbuttons";

import CalcLogo from "./calclogo";
import styled from "styled-components";

const left_width = "350px";
const right_width = "140px";

const Right = styled.div`
  width: ${right_width};
  padding-right: 25px;
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  box-sizing: border-box;
`;

const Middle = styled.div`
  width: calc(100% - ${left_width} - ${right_width});
  text-align: left;
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
`;

const Left = styled.div`
  width: ${left_width};
  display: inline-block;
  vertical-align: middle;
  padding-left: 25px;
  padding-right: 15px;
  box-sizing: border-box;
`;

const TitleContainer = styled.div`
  cursor: pointer;
  transition: color 200ms;
  &:hover div {
    color: ${colors.grays.light};
  }
`;

const PrintContainer = styled.div`
  display: inline-block;
  position: relative;
  left: 10px;
`;

const Header = () => {
  const dispatch = useAppDispatch();
  const { is_ll84_loaded, ll84_year_label, ll84_building_name } =
    useAppSelector((state) => state.ll84_query);

  const handleLL84NameClick = () => {
    dispatch(uiActions.setCurrentView("load_building_dialogue"));
  };

  return (
    <React.Fragment>
      <Left>
        <CalcLogo />
      </Left>
      <Middle>
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
      </Middle>
      <Right>
        <PrintContainer>
          <PrintIconButton
            width={25}
            height={25}
            clickCallback={() => window.print()}
          />
        </PrintContainer>

        <span style={{ display: "inline-block" }}>
          <NavMenu />
        </span>
      </Right>
    </React.Fragment>
  );
};

export default Header;
