import React, { useRef, useEffect } from "react";

import { WidthHeightDimensionTypes } from "types";
import { uiActions } from "store/uislice";

import { useAppDispatch, useAppSelector } from "store/hooks";

type D3WrapperProps = {
  createChartCallback: (d: HTMLDivElement) => void;
};
const D3Wrapper = (props: D3WrapperProps) => {
  const dispatch = useAppDispatch();

  const { createChartCallback } = props;

  const { are_dimensions_initialized } = useAppSelector((state) => state.ui);
  const ref = useRef<HTMLDivElement>(null);

  const dispatchDimensions = () => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      dispatch(
        uiActions.setActiveWindowDimensions({
          width: width,
          height: height,
        } as WidthHeightDimensionTypes)
      );
    }
  };

  // recreate chart
  useEffect(() => {
    if (ref.current) {
      createChartCallback(ref.current);
    }
  }, [createChartCallback]);

  // handle resize
  useEffect(() => {
    const handleResize = () => {
      dispatchDimensions();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  // initial dimensions
  useEffect(() => {
    if (!are_dimensions_initialized) {
      dispatchDimensions();
    }
  });

  return <div style={{ height: "100%", width: "100%" }} ref={ref}></div>;
};

export default D3Wrapper;
