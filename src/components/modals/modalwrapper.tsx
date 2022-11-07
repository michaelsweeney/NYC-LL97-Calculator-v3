import * as React from "react";

import Dialog from "@mui/material/Dialog";

import { CloseIconButton } from "../iconbuttons";
import { ButtonPrimary, ButtonSecondary } from "styles/components";
import { MenuTitle } from "styles/typography";
import { InlineStylesType } from "types";
import { relative } from "path";

type PropTypes = {
  isOpen: boolean;
  exitCallback: (b: boolean) => void;
  children: React.ReactNode;
  modalTitle: string;
  closable: boolean;
};

const styles: InlineStylesType = {
  root: {
    padding: "20px",
  },
  header: {
    width: "100%",
  },
  headerLeft: {
    display: "inline-block",
    width: "calc(100%)",
  },
  xCornerButton: {
    position: "absolute",
    right: "25px",
    top: "35px",
  },
  childrenContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  closeContainer: {
    textAlign: "center",
  },
};

const defaultProps = {
  closable: true,
};

const ModalWrapper = (props: PropTypes) => {
  const { isOpen, exitCallback, children, modalTitle, closable } = props;

  const hideModal = () => {
    exitCallback(false);
  };

  return (
    <Dialog open={isOpen} fullWidth={true} onClose={hideModal} maxWidth="xl">
      <div style={styles.root}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <MenuTitle>{modalTitle}</MenuTitle>
          </div>

          {!closable ? (
            <></>
          ) : (
            <div style={styles.xCornerButton}>
              <CloseIconButton
                clickCallback={hideModal}
                width={30}
                height={30}
              />
            </div>
          )}
        </div>
        <div style={styles.childrenContainer}>{children}</div>
        <div style={styles.closeContainer}>
          {!closable ? (
            <></>
          ) : (
            <ButtonSecondary
              color="secondary"
              onClick={hideModal}
              variant="contained"
            >
              Close
            </ButtonSecondary>
          )}
        </div>
      </div>
    </Dialog>
  );
};

ModalWrapper.defaultProps = defaultProps;

export default ModalWrapper;
