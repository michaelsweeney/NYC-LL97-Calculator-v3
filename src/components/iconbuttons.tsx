import { Button } from "@mui/material";
import { useState } from "react";
import { colors } from "styles/colors";
type IconPropTypes = {
  width: number;
  height: number;
  active?: boolean;
  clickCallback: (d: React.MouseEvent<HTMLButtonElement>) => void;
};

export const CloseIconButton = (props: IconPropTypes) => {
  const { width, height, clickCallback } = props;

  const [currentColor, setCurrentColor] = useState("black");

  const handleMouseOver = () => {
    setCurrentColor(colors.grays.medium);
  };

  const handleMouseLeave = () => {
    setCurrentColor("black");
  };

  return (
    <Button
      onMouseOver={handleMouseOver}
      onMouseDown={handleMouseLeave}
      onMouseLeave={handleMouseLeave}
      onClick={clickCallback}
      sx={{ "&:hover": { backgroundColor: "white" } }}
    >
      <svg width={width} height={height} viewBox="0 0 24 24">
        <path
          style={{ transition: "fill 200ms" }}
          fill={currentColor}
          d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        ></path>
      </svg>
    </Button>
  );
};

export const BurgerMenuIconButton = (props: IconPropTypes) => {
  const { width, height, active, clickCallback } = props;

  const [currentColor, setCurrentColor] = useState("black");

  const handleMouseOver = () => {
    setCurrentColor(colors.grays.medium);
  };

  const handleMouseLeave = () => {
    setCurrentColor("black");
  };

  return (
    <Button
      color="secondary"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={clickCallback}
      sx={{ "&:hover": { backgroundColor: "white" } }}
    >
      <svg width={width} height={height} viewBox="0 0 24 24">
        <path
          style={{ transition: "fill 200ms" }}
          fill={active ? colors.secondary.main : currentColor}
          d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
        ></path>
      </svg>
    </Button>
  );
};

export const PrintIconButton = (props: IconPropTypes) => {
  const { width, height, active, clickCallback } = props;

  const [currentColor, setCurrentColor] = useState("black");

  const handleMouseOver = () => {
    setCurrentColor(colors.grays.light);
  };

  const handleMouseLeave = () => {
    setCurrentColor("black");
  };

  return (
    <Button
      color="secondary"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={clickCallback}
      sx={{ "&:hover": { backgroundColor: "white" } }}
    >
      <svg width={width} height={height} viewBox="0 0 24 24">
        <path
          style={{ transition: "fill 200ms" }}
          fill={active ? colors.secondary.main : currentColor}
          d="M 19 8 H 5 c -1.66 0 -3 1.34 -3 3 v 6 h 4 v 4 h 12 v -4 h 4 v -6 c 0 -1.66 -1.34 -3 -3 -3 Z m -3 11 H 8 v -5 h 8 v 5 Z m 3 -7 c -0.55 0 -1 -0.45 -1 -1 s 0.45 -1 1 -1 s 1 0.45 1 1 s -0.45 1 -1 1 Z m -1 -9 H 6 v 4 h 12 V 3 Z"
        ></path>
      </svg>
    </Button>
  );
};
