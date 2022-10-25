import * as React from "react";

import { useRef, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import ViewsContainer from "./viewscontainer";
import Sidebar from "./sidebar";
import { useAppSelector } from "store/hooks";
import { InlineStylesType } from "types";
import { colors } from "styles/colors";
import NoFineDialogue from "./nofinedialogue";
import NoInputDialogue from "./noinputdialogue";
/* 

 status dialogues to implement:
 NoFine -- within container
 NoInputDialogue -- within container
 
 - Add a Load Demo Button to context menu.

*/

const sidebar_width = "400px";

interface IAppProps {}

const borderWidth = "4px";

const styles: InlineStylesType = {
  root: {
    width: "100vw",
    height: "100vh",
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    height: "100px",
    borderBottom: `${borderWidth} solid ${colors.grays.light}`,
    boxSizing: "border-box",
  },
  middle: {
    width: "100%",
    height: "calc(100% - 190px)",
    boxSizing: "border-box",
  },
  footer: {
    width: "100%",
    height: "90px",
    borderTop: `${borderWidth} solid ${colors.grays.light}`,
    boxSizing: "border-box",
  },
  sidebar: {
    width: sidebar_width,
    height: "100%",
    borderRight: `${borderWidth} solid ${colors.grays.light}`,
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
    backgroundColor: "rgba(230,230,230)",
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
            <ViewsContainer />
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
