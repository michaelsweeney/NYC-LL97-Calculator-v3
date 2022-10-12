import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import ViewsContainer from "./viewscontainer";
import Sidebar from "./sidebar";
import { InlineStylesType } from "types";
import { colors } from "styles/colors";

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
    borderBottom: `${borderWidth} solid ${colors.primary.main as string}`,
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
    borderTop: `${borderWidth} solid ${colors.primary.main as string}`,
    boxSizing: "border-box",
  },
  sidebar: {
    width: "420px",
    height: "100%",
    borderRight: `${borderWidth} solid ${colors.grays.medium}`,
    padding: "10px",
    display: "inline-block",
    boxSizing: "border-box",
    overflowY: "scroll",
  },
  viewContainer: {
    padding: "10px",
    width: "calc(100% - 420px)",
    height: "100%",
    display: "inline-block",
    boxSizing: "border-box",
    verticalAlign: "top",
  },
};

const MainContainer: React.FunctionComponent<IAppProps> = () => {
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
          <ViewsContainer />
        </div>
      </div>
      <div style={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default MainContainer;
