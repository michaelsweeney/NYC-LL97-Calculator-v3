import * as React from "react";
import { Button } from "@mui/material";

import ModalWrapper from "./modalwrapper";

import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const BuildingSummaryModal = () => {
  const { is_building_summary_modal_open } = useAppSelector(
    (state) => state.ui
  );
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(uiActions.setIsBuildingSummaryModalOpen(false));
  };

  return (
    <ModalWrapper
      isOpen={is_building_summary_modal_open}
      exitCallback={handleCloseModal}
    >
      <div>Selected Building Summary</div>
      fdsfdsds
      <Button variant="contained" onClick={handleCloseModal}>
        Close
      </Button>
    </ModalWrapper>
  );
};

export default BuildingSummaryModal;
