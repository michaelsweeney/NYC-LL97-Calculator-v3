import * as React from "react";

interface IAppProps {}

const styles: { [key: string]: React.CSSProperties } = {
  root: {},
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
    <div>
      <div style={styles.left}>What Now?</div>
      <div style={styles.right}>AKF Logo</div>
    </div>
  );
};

export default Footer;
