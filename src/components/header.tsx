import * as React from "react";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { colors } from "styles/colors";

import NavMenu from "./navmenu";
import { PrintIconButton, InfoIconButton } from "./iconbuttons";

import CalcLogo from "./calclogo";
import styled from "styled-components";

const left_width = "350px";
const right_width = "200px";

const HeaderBuildingTitle = styled("div")`
  display: block;
  text-align: left;
  color: ${colors.grays.dark};
  font-size: 36px;
  font-family: CircularStd-Medium;
  cursor: pointer;
  &:hover {
    color: ${colors.grays.light};
  }
`;

const HeaderLL84Label = styled("div")`
  display: block;
  text-align: left;
  color: ${colors.grays.dark};
  font-size: 20px;
  font-family: CircularStd-Book;
  margin-left: 5px;
  letter-spacing: 0.1em;
  cursor: pointer;
  &:hover {
    color: ${colors.grays.light};
  }
`;

const HeaderBuildingTitleGray = styled(HeaderBuildingTitle)`
  font-family: CircularStd-Book;
  color: rgb(180, 180, 180);
  cursor: pointer;
  transition: color 200ms;
  &:hover {
    color: ${colors.grays.light};
  }
`;

const Right = styled.div`
  width: ${right_width};
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

const TitleContainer = styled.div``;

const PrintButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
  left: 45px;
  top: -5px;
`;
const InfoIconButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
  left: 40px;
  top: -5px;
`;
const NavButtonWrapper = styled.div`
  display: inline-block;
  position: relative;
  left: 50px;
`;

const Header = () => {
  const dispatch = useAppDispatch();
  const { is_ll84_loaded, ll84_year_label, ll84_building_name } =
    useAppSelector((state) => state.ll84_query);

  const handleLL84NameClick = () => {
    dispatch(uiActions.setCurrentView("load_building_dialogue"));
  };

  const handleLL84YearClick = () => {
    dispatch(uiActions.setCurrentView("building_summary_dialogue"));
  };

  const handleInfoClick = () => {
    dispatch(uiActions.setCurrentView("calc_info_dialogue"));
  };

  return (
    <React.Fragment>
      <Left>
        <CalcLogo />
      </Left>
      <Middle>
        <div>
          {is_ll84_loaded ? (
            <TitleContainer>
              <HeaderBuildingTitle onClick={handleLL84NameClick}>
                {ll84_building_name}
              </HeaderBuildingTitle>
              <HeaderLL84Label onClick={handleLL84YearClick}>
                {ll84_year_label}
              </HeaderLL84Label>
            </TitleContainer>
          ) : (
            <HeaderBuildingTitleGray onClick={handleLL84NameClick}>
              find your building
            </HeaderBuildingTitleGray>
          )}
        </div>
      </Middle>
      <Right>
        <InfoIconButtonWrapper>
          <InfoIconButton
            width={25}
            height={25}
            clickCallback={handleInfoClick}
          />
        </InfoIconButtonWrapper>

        <PrintButtonWrapper>
          <PrintIconButton
            width={25}
            height={25}
            clickCallback={() => window.print()}
          />
        </PrintButtonWrapper>

        <NavButtonWrapper>
          <NavMenu />
        </NavButtonWrapper>
      </Right>
    </React.Fragment>
  );
};

export default Header;
