import * as React from "react";

import Dialog from "@mui/material/Dialog";

import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";

type PropTypes = {
  isOpen: boolean;
  exitCallback: (b: boolean) => void;
  children: React.ReactNode;
};

const ModalWrapper = (props: PropTypes) => {
  const { isOpen, exitCallback, children } = props;

  const hideModal = () => {
    exitCallback(false);
  };

  return (
    <Dialog open={isOpen} fullWidth={true} onClose={hideModal} maxWidth="xl">
      <div>
        Title{" "}
        <IconButton onClick={hideModal}>
          <div>x</div>
          {/* <CloseIcon></CloseIcon> */}
        </IconButton>
      </div>
      <div>{children}</div>
    </Dialog>
  );
};

export default ModalWrapper;
