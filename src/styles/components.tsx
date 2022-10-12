import styled from "styled-components";
import { colors } from "./colors";
import { Input, Button, Checkbox } from "@mui/material";

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

export const ButtonPrimary = styled(Button)<{}>`
  font-family: CircularStd-Bold;
  box-shadow: 0;
  color: ${(props) =>
    props.variant === "outlined" ? colors.primary.main : colors.whites.medium};
  &:hover {
    box-shadow: 0;
  }
`;

export const ButtonSecondary = styled(Button)<{}>`
  font-family: CircularStd-Bold;
  &:hover {
    box-shadow: 0;
  }
`;
export const NavBarButton = styled(Button)<{ $active: boolean }>`
  font-family: CircularStd-Bold;
  box-shadow: 0;
  color: ${(props) =>
    props.$active ? colors.secondary.main : colors.primary.main};
  &:hover {
    box-shadow: 0;
    color: ${(props) =>
      props.$active ? colors.secondary.light : colors.primary.dark};
  }
`;

export const StyledCheckbox = styled(Checkbox)``;
