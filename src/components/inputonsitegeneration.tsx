import * as React from "react";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import FocusInput from "./focusinput";
import { buildingInputActions } from "store/buildinginputslice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { InlineStylesType } from "types";
interface IAppProps {}

const styles: InlineStylesType = {
  text: {
    width: "100px",
    display: "inline-block",
  },
  input_container: {
    width: "100px",
    display: "inline-block",
  },
};

const InputOnsiteGeneration: React.FunctionComponent<IAppProps> = () => {
  const dispatch = useAppDispatch();
  const building_inputs = useAppSelector((state) => state.building_inputs);

  const handleElectricOnsitePVConsumptionChange = (v: number) => {
    dispatch(buildingInputActions.setElectricOnsitePVConsumptionChange(v));
  };
  return (
    <div>
      <div style={styles.text}>Solar PV (kWh)</div>
      <div style={styles.input_container}>
        <FocusInput
          value={
            building_inputs.electric_onsite_generation.photovoltaic.consumption
          }
          input_type="number"
          callback={(v) => {
            handleElectricOnsitePVConsumptionChange(v as number);
          }}
        ></FocusInput>
      </div>
    </div>
  );
};

export default InputOnsiteGeneration;
