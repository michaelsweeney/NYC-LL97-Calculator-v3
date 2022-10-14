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
  const { width, height, active, clickCallback } = props;

  const [currentColor, setCurrentColor] = useState(colors.primary.main);

  const handleMouseOver = () => {
    setCurrentColor(colors.primary.dark);
  };

  const handleMouseLeave = () => {
    setCurrentColor(colors.primary.main);
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
          fill={currentColor}
          d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        ></path>
      </svg>
    </Button>
  );
};

export const BurgerMenuIconButton = (props: IconPropTypes) => {
  const { width, height, active, clickCallback } = props;

  const [currentColor, setCurrentColor] = useState(colors.primary.main);

  const handleMouseOver = () => {
    setCurrentColor(colors.primary.dark);
  };

  const handleMouseLeave = () => {
    setCurrentColor(colors.primary.main);
  };

  return (
    <Button
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={clickCallback}
      sx={{ "&:hover": { backgroundColor: "white" } }}
    >
      <svg width={width} height={height} viewBox="0 0 24 24">
        <path
          fill={active ? colors.secondary.main : currentColor}
          d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
        ></path>
      </svg>
    </Button>
  );
};
