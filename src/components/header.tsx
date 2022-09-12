import * as React from "react";
import { Button } from "@mui/material";
import { uiActions } from "store/uislice";
import { useAppDispatch } from "store/hooks";
interface IAppProps {}

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    width: "100%",
    height: "100px",
    border: "1px solid black",
    boxSizing: "border-box",
  },
  left: {
    width: "200px",
    height: "100%",
    display: "inline-block",
    verticalAlign: "middle",
  },
  middle: {
    width: "calc(100% - 600px",
    textAlign: "center",
    height: "100%",
    display: "inline-block",
    verticalAlign: "middle",
  },
  right: {
    width: "400px",
    display: "inline-block",
    verticalAlign: "middle",
  },
};

const Header: React.FunctionComponent<IAppProps> = () => {
  const dispatch = useAppDispatch();
  const handleOpenLoadModal = () => {
    dispatch(uiActions.setIsLoadModalOpen(true));
  };

  const handleOpenInfoModal = () => {
    dispatch(uiActions.setIsInfoModalOpen(true));
  };

  const handleOpenBuildingSummaryModal = () => {
    dispatch(uiActions.setIsBuildingSummaryModalOpen(true));
  };

  return (
    <div style={styles.root}>
      <div style={styles.left}>BEEX Logo</div>
      <div style={styles.middle}>NYC LL97 Carbon Emissions Calculator</div>
      <div style={styles.right}>
        <Button onClick={handleOpenLoadModal} variant="contained">
          Open Load Modal
        </Button>
        <Button variant="contained" onClick={handleOpenInfoModal}>
          Open Info Modal
        </Button>
        <Button variant="contained" onClick={handleOpenBuildingSummaryModal}>
          Open LL84 Summary Modal
        </Button>
      </div>
    </div>
  );
};

export default Header;
