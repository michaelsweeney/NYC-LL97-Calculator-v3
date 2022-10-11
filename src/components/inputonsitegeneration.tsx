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

interface IAppProps {}

const InputOnsiteGeneration: React.FunctionComponent<IAppProps> = () => {
  const dispatch = useAppDispatch();
  const building_inputs = useAppSelector((state) => state.building_inputs);

  const handleElectricOnsitePVConsumptionChange = (v: number) => {
    dispatch(buildingInputActions.setElectricOnsitePVConsumptionChange(v));
  };
  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell variant="head">Solar PV (kWh)</TableCell>
            <TableCell>
              <FocusInput
                value={
                  building_inputs.electric_onsite_generation.photovoltaic
                    .consumption
                }
                input_type="number"
                callback={(v) => {
                  handleElectricOnsitePVConsumptionChange(v as number);
                }}
              ></FocusInput>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InputOnsiteGeneration;
