import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import ResultsContainer from "./resultscontainer";
import Sidebar from "./sidebar";

interface IAppProps {}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    width: "100vw",
    height: "100vh",
    boxSizing: "border-box",
  },
  middle: {
    width: "100%",
    height: "calc(100% - 200px)",
    boxSizing: "border-box",
  },
};

const MainContainer: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div style={styles.root}>
      <Header />
      <div style={styles.middle}>
        <Sidebar />
        <ResultsContainer />
      </div>
      <Footer />
    </div>
  );
};

export default MainContainer;
