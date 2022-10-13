import * as react from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { Dialog, Button } from "@mui/material";

import { CloseIconButton } from "./icons";
import { ButtonPrimary } from "styles/components";
import { MenuTitle } from "styles/typography";
import { InlineStylesType } from "types";
import { colors } from "styles/colors";
import { uiActions } from "store/uislice";

const styles: InlineStylesType = {
  root: {},
};

const PrintLayout = () => {
  const { is_print_mode } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const exitPrintMode = () => {
    dispatch(uiActions.setIsPrintMode(false));
  };

  return (
    <Dialog
      open={is_print_mode}
      fullWidth={true}
      onClose={exitPrintMode}
      maxWidth="xl"
    >
      <div style={styles.root}>
        PRINT MODE HERE
        <Button onClick={exitPrintMode}>CLOSE</Button>
      </div>
    </Dialog>
  );
};

export default PrintLayout;
