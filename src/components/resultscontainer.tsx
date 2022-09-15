import * as React from "react";
import { OutputRaw } from "./outputraw";

interface IAppProps {}
const styles: { [key: string]: React.CSSProperties } = {
  root: {
    width: "calc(100% - 500px)",
    height: "100%",
    display: "inline-block",
    border: "1px solid black",
    boxSizing: "border-box",
    verticalAlign: "top",
  },
};

const ContentContainer: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div style={styles.root}>
      <div>The Content </div>
      <OutputRaw />
    </div>
  );
};

export default ContentContainer;
