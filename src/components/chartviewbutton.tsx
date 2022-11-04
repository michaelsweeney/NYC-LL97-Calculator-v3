import * as React from "react";
import { colors } from "styles/colors";

import { InlineStylesType } from "types";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "store/hooks";

const border_width = "4px";
const border_color = colors.secondary.main;
const border_style = `${border_width} solid ${border_color}`;

type ViewButtonProps = {
  is_active: boolean;
  label: string;
  view_key: string;
  callback: (d: string) => void;
  className?: string;
};

const ViewButton = (props: ViewButtonProps) => {
  const { callback, view_key, className, label } = props;
  const handleClick: (d: React.MouseEvent<HTMLElement>) => void = (d) => {
    callback(view_key);
  };
  return (
    <div onClick={handleClick} className={className}>
      {label}
    </div>
  );
};

const StyledButton = styled(ViewButton)`
  background-color: ${(props) => (props.is_active ? "white" : "")};
  color: ${(props) => (props.is_active ? "black" : "black")};
  display: inline-block;
  width: 60px;
  border: ${(props) =>
    props.is_active
      ? `1px solid ${border_color}`
      : `1px solid ${colors.secondary.light}`};
  border-radius: 5px;
  margin-right: 10px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: background-color 200ms, color 200ms, border-color 200ms;
  &:hover {
    background-color: ${"white"};
    color: ${(props) => (props.is_active ? "" : "black")};
  }
`;

export default StyledButton;
