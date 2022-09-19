import React, { useRef, useEffect } from "react";

type D3WrapperProps = {
  createChartCallback: (d: HTMLElement) => void;
  dependencies: any[];
};
const D3Wrapper = (props: D3WrapperProps) => {
  const { createChartCallback, dependencies } = props;
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      createChartCallback(ref.current);
    }
  }, [...dependencies, createChartCallback]);
  return <div style={{ height: "100%", width: "100%" }} ref={ref}></div>;
};

export { D3Wrapper };
