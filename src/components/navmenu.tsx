import * as React from "react";
import { NavBarButton } from "styles/components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { useAppDispatch } from "store/hooks";
import { uiActions } from "store/uislice";

import { InlineStylesType } from "types";

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

  return (
    <div>
      <NavBarButton $active={open} onClick={handleClick}>
        <div>===</div>
      </NavBarButton>

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
      </Menu>
    </div>
  );
};

export default NavMenu;
