import * as React from "react";
import { useState, useEffect } from "react";
import { InlineStylesType, ControlToggleTypes } from "types";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import { ButtonSecondary } from "styles/components";

const styles: InlineStylesType = {
  root: {
    display: "inline-block",
    marginRight: "15px",
    boxSizing: "border-box",
  },
  title: {
    fontFamily: "CircularStd-Book",
    marginBottom: "5px",
  },
};

const ControlToggle = (props: ControlToggleTypes) => {
  const { toggle_key, label, options, value } = props;

  const dispatch = useAppDispatch();

  const handleClick = (k: string, v: string) => {
    dispatch(uiActions.setChartView({ view_key: k, view_value: v }));
  };

  return (
    <div style={styles.root}>
      <div style={styles.title}>{label}</div>
      {options.map((o, i) => {
        return (
          <ButtonSecondary
            key={i}
            onClick={() => handleClick(toggle_key, o)}
            variant={o === value ? "contained" : "outlined"}
            color="secondary"
          >
            {o}
          </ButtonSecondary>
        );
      })}
    </div>
  );
};

export default ControlToggle;
