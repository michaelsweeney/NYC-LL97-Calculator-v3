import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { uiActions } from "store/uislice";
const WindowListener = () => {
  const dispatch = useAppDispatch();
  const { is_dev_mode } = useAppSelector((state) => state.ui);

  const getDimensions = () => {
    let dims = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    let is_small_window = dims.height < 500 || dims.width < 1000;

    if (is_dev_mode) {
      is_small_window = false;
    }
    return { dims, is_small_window };
  };

  useEffect(() => {
    const handleResize = () => {
      let { dims, is_small_window } = getDimensions();

      dispatch(uiActions.setWindowDimensions(dims));
      dispatch(uiActions.setSmallWindow(is_small_window));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    let { dims, is_small_window } = getDimensions();

    dispatch(uiActions.setWindowDimensions(dims));
    dispatch(uiActions.setSmallWindow(is_small_window));
  }, []);

  return <div style={{ display: "none" }}></div>;
};

export default WindowListener;
