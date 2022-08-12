import * as React from "react";

interface IAppProps {}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    width: "calc(100% - 300px)",
    height: "100%",
    display: "inline-block",
    border: "1px solid black",
    boxSizing: "border-box",
  },
};

const ContentContainer: React.FunctionComponent<IAppProps> = (props) => {
  return <div style={styles.root}>The Content</div>;
};

export default ContentContainer;
