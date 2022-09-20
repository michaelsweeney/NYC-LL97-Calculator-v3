import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import ViewsContainer from "./viewscontainer";
import Sidebar from "./sidebar";
import { InlineStylesType } from "types";

interface IAppProps {}

const styles: InlineStylesType = {
  root: {
    width: "100vw",
    height: "100vh",
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    height: "100px",
    border: "1px solid black",
    boxSizing: "border-box",
  },
  middle: {
    width: "100%",
    height: "calc(100% - 200px)",
    boxSizing: "border-box",
  },
  footer: {
    width: "100%",
    height: "100px",
    border: "1px solid black",
    boxSizing: "border-box",
  },
  sidebar: {
    width: "450px",
    height: "100%",
    border: "1px solid black",
    display: "inline-block",
    boxSizing: "border-box",
    overflowY: "scroll",
  },
  viewContainer: {
    width: "calc(100% - 450px)",
    height: "100%",
    display: "inline-block",
    border: "1px solid black",
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
