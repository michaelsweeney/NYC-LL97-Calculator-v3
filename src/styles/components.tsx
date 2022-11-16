import styled from "styled-components";
import { colors } from "./colors";
import { Input, Button } from "@mui/material";

export const StyledInput = styled(Input)`
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ButtonSecondary = styled(Button)<{}>`
  font-family: CircularStd-Bold;
  &:hover {
    box-shadow: 0;
  }
`;

export const RemoveTypeButton = styled("button")`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  color: ${colors.secondary.main};
  overflow: hidden;
  font-family: CircularStd-Bold;
  font-size: "14px";
  font-weight: 700;
  transition: color 250ms;
  &:hover {
    background-color: white;
    color: ${colors.secondary.dark};
  }
`;

export const AddBuildingTypeButton = styled("button")`
  background-color: ${colors.secondary.main};
  color: white;
  border: none;

  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;
  font-family: CircularStd-Bold;
  font-size: "20px";
  font-weight: 700;
  height: 20px;
  width: 20px;
  transition: background-color 250ms, color 250ms;
  &:hover {
    background-color: ${colors.secondary.dark};
  }
`;
