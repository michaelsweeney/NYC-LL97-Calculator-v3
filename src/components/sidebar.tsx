import * as React from "react";

import InputBuilding from "./inputbuilding";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    width: 300,
    height: "100%",
    border: "1px solid black",
    display: "inline-block",
    boxSizing: "border-box",
  },
};

interface IAppProps {}

const Sidebar: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div style={styles.root}>
      <div>Building Inputs</div>
      <InputBuilding />
      <div>Utility Inputs</div>
    </div>
  );
};

export default Sidebar;
