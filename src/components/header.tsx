import * as React from "react";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { HeaderTitle, HeaderBuildingTitle } from "styles/typography";
import { InlineStylesType } from "types";
import NavMenu from "./navmenu";

import CalcLogo from "./calclogo";

interface IAppProps {}

const left_width = "400px";
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
    boxSizing: "border-box",
    paddingLeft: "15px",
    paddingRight: "15px",
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

const Header: React.FunctionComponent<IAppProps> = () => {
  const dispatch = useAppDispatch();
  const { property_name } = useAppSelector(
    (state) => state.ll84_query.ll84_selected_property
  );

  const handleLL84NameClick = () => {
    dispatch(uiActions.setIsBuildingSummaryModalOpen(true));
  };

  return (
    <React.Fragment>
      <div style={styles.left}>
        <CalcLogo />
      </div>
      <div style={styles.middle}>
        <div>
          <HeaderBuildingTitle onClick={handleLL84NameClick}>
            {property_name}
          </HeaderBuildingTitle>
        </div>
      </div>
      <div style={styles.right}>
        <NavMenu />
      </div>
    </React.Fragment>
  );
};

export default Header;
