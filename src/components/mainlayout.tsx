import * as React from "react";

import { useRef, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import ViewContainer from "./viewcontainer";
import Sidebar from "./sidebar";
import { useAppSelector } from "store/hooks";
import { InlineStylesType } from "types";
import { colors } from "styles/colors";
import NoFineDialogue from "./nofinedialogue";
import NoInputDialogue from "./noinputdialogue";
import { chart_background_color } from "styles/colors";

const sidebar_width = "340px";
const border_color = colors.secondary.main;
interface IAppProps {}

const border_width = "4px";

const styles: InlineStylesType = {
  root: {
    width: "100vw",
    height: "100vh",
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    height: "100px",
    borderBottom: `${border_width} solid ${border_color}`,
    boxSizing: "border-box",
  },
  middle: {
    width: "100%",
    height: "calc(100% - 100px - 50px)",
    boxSizing: "border-box",
  },
  footer: {
    width: "100%",
    height: "50px",
    borderTop: `${border_width} solid ${border_color}`,
    boxSizing: "border-box",
  },
  sidebar: {
    width: sidebar_width,
    height: "100%",
    borderRight: `${border_width} solid ${border_color}`,
    padding: "10px",
    display: "inline-block",
    boxSizing: "border-box",
    overflowY: "scroll",
  },
  viewContainer: {
    padding: "10px",
    width: `calc(100% - ${sidebar_width})`,
    height: "100%",
    display: "inline-block",
    boxSizing: "border-box",
    verticalAlign: "top",
    backgroundColor: chart_background_color,
  },
};

const MainLayout: React.FunctionComponent<IAppProps> = () => {
  const { is_greater_than_25k_sf, is_input_info_missing } = useAppSelector(
    (state) => state.building_outputs
  );

  return (
    <div style={styles.root}>
      <div style={styles.header}>
        <Header />
      </div>
      <div style={styles.middle}>
        <div style={styles.sidebar}>
          <Sidebar />
        </div>
        <div style={styles.viewContainer}>
          {is_input_info_missing ? (
            <NoInputDialogue />
          ) : !is_greater_than_25k_sf ? (
            <NoFineDialogue />
          ) : (
            <ViewContainer />
          )}
        </div>
      </div>
      <div style={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
