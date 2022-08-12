import * as React from "react";

interface IAppProps {}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    width: "100%",
    height: "100px",
    border: "1px solid black",
    boxSizing: "border-box",
  },
  left: {
    width: "100px",
    height: "100%",
    display: "inline-block",
    verticalAlign: "middle",
  },
  middle: {
    width: "calc(100% - 200px",
    textAlign: "center",
    height: "100%",
    display: "inline-block",
    verticalAlign: "middle",
  },
  right: {
    width: "100px",
    display: "inline-block",
    verticalAlign: "middle",
  },
};

const Header: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div style={styles.root}>
      <div style={styles.left}>BEEX Logo</div>
      <div style={styles.middle}>NYC LL97 Carbon Emissions Calculator</div>
      <div style={styles.right}>Buttons</div>
    </div>
  );
};

export default Header;
