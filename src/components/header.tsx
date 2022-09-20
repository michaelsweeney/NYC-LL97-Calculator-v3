import * as React from "react";
import { Button } from "@mui/material";
import { uiActions } from "store/uislice";
import { useAppDispatch } from "store/hooks";
import { colors } from "styles/colors";
import { InlineStylesType } from "types";
interface IAppProps {}

const styles: InlineStylesType = {
  root: {},
  left: {
    width: "200px",
    height: "100%",
    display: "inline-block",
    verticalAlign: "middle",
  },
  middle: {
    width: "calc(100% - 600px)",
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
  buttons: {
    color: "white",
    backgroundColor: colors.main.secondary,
    border: "black",
    "&:hover": {
      backgroundColor: colors.grays.dark,
      border: "black",
    },
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
        <Button
          size="small"
          sx={styles.buttons}
          onClick={handleOpenLoadModal}
          variant="outlined"
        >
          Open Load Modal
        </Button>
        <Button
          sx={styles.buttons}
          size="small"
          variant="outlined"
          onClick={handleOpenInfoModal}
        >
          Open Info Modal
        </Button>
        <Button
          sx={styles.buttons}
          size="small"
          variant="outlined"
          onClick={handleOpenBuildingSummaryModal}
        >
          Open LL84 Summary Modal
        </Button>
      </div>
    </div>
  );
};

export default Header;
