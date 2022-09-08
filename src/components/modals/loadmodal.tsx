import * as React from "react";

import { Button } from "@mui/material";
import ModalWrapper from "./modalwrapper";

import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const LoadModal = () => {
  const { is_load_modal_open } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(uiActions.setIsLoadModalOpen(false));
  };

  return (
    <ModalWrapper isOpen={is_load_modal_open} exitCallback={handleCloseModal}>
      <div>some stuff</div>
      <Button variant="contained" onClick={handleCloseModal}>
        Close
      </Button>
    </ModalWrapper>
  );
};

export default LoadModal;
