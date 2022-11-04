import React from "react";
import { FormControl } from "@mui/material";
import { InlineStylesType } from "types";
import { StyledInput } from "styles/components";
import { NumericFormat } from "react-number-format";
type PropTypes = {
  value: string | number;
  callback: (d: string | number) => void;
};

const styles: InlineStylesType = {
  input: {},
};

const FocusNumberInput = (props: PropTypes) => {
  const { callback, value } = props;

  const handleInput = (v: string | number) => {
    callback(v);
  };

  return (
    <FormControl variant="standard" size="small" fullWidth>
      <NumericFormat
        value={value}
        customInput={StyledInput}
        color="secondary"
        variant="standard"
        thousandSeparator=","
        type="text"
        //@ts-ignore
        onValueChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleInput(e.target.value);
        }}
      />
    </FormControl>
  );
};
export default FocusNumberInput;
