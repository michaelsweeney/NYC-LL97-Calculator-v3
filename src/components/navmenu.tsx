import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BurgerMenuIconButton } from "./iconbuttons";
import { useAppDispatch } from "store/hooks";
import { ll84QueryActions } from "store/ll84queryslice";
import { buildingInputActions } from "store/buildinginputslice";
import { uiActions } from "store/uislice";
import { InlineStylesType } from "types";
import { sample_ll84_data } from "locallaw/lookups";
import { LL84SelectionToLL97Inputs } from "locallaw/ll84_query_to_ll97_inputs";

const styles: InlineStylesType = {
  nav: {
    border: "1px solid black",
    "& .MuiPaper-root": {
      paddingLeft: "10px",
      paddingRight: "10px",
      border: "gray 1px solid",
    },
  },
};

const NavMenu = () => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLoadModal = () => {
    dispatch(uiActions.setIsLoadModalOpen(true));
    handleClose();
  };

  const handleOpenInfoModal = () => {
    dispatch(uiActions.setIsInfoModalOpen(true));
    handleClose();
  };

  const handleOpenBuildingSummaryModal = () => {
    dispatch(uiActions.setIsBuildingSummaryModalOpen(true));
    handleClose();
  };

  const handleTogglePrintMode = () => {
    // dispatch(uiActions.setIsPrintMode(true));

    window.print();
    // dispatch(uiActions.setIsPrintMode(false));
  };

  const handleLoadDemoBuildling = () => {
    dispatch(ll84QueryActions.setSelectedLL84Property(sample_ll84_data));
    let ll97_conversion = LL84SelectionToLL97Inputs(sample_ll84_data);

    if (ll97_conversion.bldg_type_one_type !== undefined) {
      dispatch(
        buildingInputActions.setBuildingInputsFromLL84Results(ll97_conversion)
      );
    }
  };

  return (
    <div>
      <BurgerMenuIconButton
        active={open}
        clickCallback={handleClick}
        width={40}
        height={40}
      />

      <Menu
        sx={styles.nav}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleOpenLoadModal}>Search LL84 Database</MenuItem>
        <MenuItem onClick={handleOpenInfoModal}>About This Calculator</MenuItem>
        <MenuItem onClick={handleOpenBuildingSummaryModal}>
          About Loaded Building
        </MenuItem>
        <MenuItem onClick={handleTogglePrintMode}>
          Print Summary Report
        </MenuItem>
        <MenuItem onClick={handleLoadDemoBuildling}>
          Load Sample Building
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavMenu;
