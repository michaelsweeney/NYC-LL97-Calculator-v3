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
    display: "inline-block",
    width: "50%",
    textAlign: "left",
  },
  right: {
    display: "inline-block",
    width: "50%",
    textAlign: "right",
  },
};

const Footer: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div style={styles.root}>
      <div style={styles.left}>What Now?</div>
      <div style={styles.right}>AKF Logo</div>
    </div>
  );
};

export default Footer;
