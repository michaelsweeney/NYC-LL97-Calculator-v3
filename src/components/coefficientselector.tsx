import React from "react";

import SingleSelect from "./singleselect";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { CarbonCoefficientTypes } from "types";
import { buildingInputActions } from "store/buildinginputslice";

const FocusInput = () => {
  const dispatch = useAppDispatch();

  const { electric_coefficient_method } = useAppSelector(
    (state) => state.building_inputs
  );

  const handleChangeElectricCoefficientMethod = (e: string | number) => {
    dispatch(
      buildingInputActions.setElectricCoefficientMethod(
        e as CarbonCoefficientTypes
      )
    );
  };

  const option_values: CarbonCoefficientTypes[] = ["cambium", "ll97_current"];
  const option_titles: string[] = ["Cambium", "LL97 Current Rate"];

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell variant="head">Electric Coefficients</TableCell>
            <TableCell>
              <SingleSelect
                callback={handleChangeElectricCoefficientMethod}
                value={electric_coefficient_method}
                option_values={option_values}
                option_titles={option_titles}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default FocusInput;
