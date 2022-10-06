import React, { useRef, useState, useEffect } from "react";

import { WidthHeightDimensionTypes, D3WrapperPropTypes } from "types";
import { uiActions } from "store/uislice";

import { useAppDispatch, useAppSelector } from "store/hooks";

const D3Wrapper = (props: D3WrapperPropTypes) => {
  const [containerDimensions, setContainerDimensions] = useState({
    width: 50,
    height: 50,
  });

  const [dimensionsInitialized, setDimensionsInitialized] = useState(false);

  const { createChartCallback } = props;

  const ref = useRef<HTMLDivElement>(null);

  const dispatchDimensions = () => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setContainerDimensions({ width, height });
      setDimensionsInitialized(true);
    }
  };

  // recreate chart
  useEffect(() => {
    if (ref.current) {
      createChartCallback({
        container_ref: ref.current,
        container_dimensions: containerDimensions,
      });
    }
  }, [createChartCallback, containerDimensions]);

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
    if (!dimensionsInitialized) {
      dispatchDimensions();
    }
  });

  return <div style={{ height: "100%", width: "100%" }} ref={ref}></div>;
};

export default D3Wrapper;
