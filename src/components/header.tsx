import * as React from "react";
import { Button } from "@mui/material";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { colors } from "styles/colors";
import { InlineStylesType } from "types";
import NavMenu from "./navmenu";
import BeExLogo from "./beexlogo";

interface IAppProps {}

const styles: InlineStylesType = {
  root: {},
  left: {
    width: "225px",
    height: "100%",
    display: "inline-block",
    verticalAlign: "middle",
    paddingLeft: "25px",
    paddingRight: "15px",
    boxSizing: "border-box",
  },
  middle: {
    width: "calc(100% - 325px)",
    textAlign: "center",
    height: "100%",
    display: "inline-block",
    verticalAlign: "middle",
    boxSizing: "border-box",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  right: {
    width: "100px",
    paddingRight: "25px",
    display: "inline-block",
    verticalAlign: "middle",
    textAlign: "right",
    boxSizing: "border-box",
  },

  headerTitleText: {
    color: colors.main.secondary,
    fontSize: "26px",
    fontFamily: "CircularStd-Black",
  },
  loadedBuildingTitle: {
    color: colors.main.secondary,
    fontSize: "20px",

    fontFamily: "CircularStd-Medium",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "red",
      fontSize: "30px",
    },
  },
};

const Header: React.FunctionComponent<IAppProps> = () => {
  const dispatch = useAppDispatch();
  const { property_name, address_1 } = useAppSelector(
    (state) => state.ll84_query.ll84_selected_property
  );

  const handleLL84NameClick = () => {
    dispatch(uiActions.setIsBuildingSummaryModalOpen(true));
  };

  return (
    <div style={styles.root}>
      <div style={styles.left}>
        <BeExLogo width="200" height="100" />
      </div>
      <div style={styles.middle}>
        <div style={styles.headerTitleText}>
          NYC LL97 Carbon Emissions Calculator
        </div>
        <div onClick={handleLL84NameClick} style={styles.loadedBuildingTitle}>
          {property_name}
        </div>
      </div>
      <div style={styles.right}>
        <NavMenu />
      </div>
    </div>
  );
};

export default Header;
