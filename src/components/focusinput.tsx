import React from "react";
import { Input, FormControl } from "@mui/material";
import { InlineStylesType } from "types";

import styled from "styled-components";
type PropTypes = {
  value: string | number;
  callback: (d: string | number) => void;
  input_type: string;
};

const styles: InlineStylesType = {
  input: {},
};

const StyledInput: any = styled(Input)`
  input[type="number"] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const FocusInput = (props: PropTypes) => {
  const { callback, value, input_type } = props;

  const handleInput = (v: string | number) => {
    callback(v);
  };

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <StyledInput
        sx={styles.input}
        type={input_type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleInput(e.target.value);
        }}
        value={value}
      />
    </FormControl>
  );
};
export default FocusInput;
