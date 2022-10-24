import * as React from "react";
import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "store/hooks";

import { uiActions } from "store/uislice";
import ModalWrapper from "./modalwrapper";

const TooSmallDialogue = () => {
  const { small_window } = useAppSelector((state) => state.ui);

  const dummyCallback = () => {
    return;
  };

  return (
    <ModalWrapper
      isOpen={small_window}
      modalTitle="NYC LL97 Carbon Calculator"
      exitCallback={dummyCallback}
      closable={false}
    >
      <div>
        Browser too small to view app. please view on a larger device, increase
        window size or decrease browser zoom.
      </div>
    </ModalWrapper>
  );
};

export default TooSmallDialogue;
