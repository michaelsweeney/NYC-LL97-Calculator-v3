import * as React from "react";

import { Checkbox, TableCell, TableRow } from "@mui/material";
import FocusInput from "./focusinput";

import { fuel_keys_to_labels, fuel_keys_to_rate_labels } from "ll97/lookups";
import { buildingInputActions } from "store/buildinginputslice";
import { useAppDispatch, useAppSelector } from "store/hooks";

const styles: { [key: string]: React.CSSProperties } = {
  root: {},
};

interface IAppProps {}

const InputUtilities: React.FunctionComponent<IAppProps> = (props) => {
  const { utilities, is_default_rates } = useAppSelector(
    (state) => state.building_inputs
  );

  const dispatch = useAppDispatch();

  const handleFuelConsumptionChange = (fuel: string, value: number) => {
    dispatch(buildingInputActions.setFuelConsumption({ fuel, value }));
  };
  const handleFuelRateChange = (fuel: string, value: number) => {
    dispatch(buildingInputActions.setFuelRate({ fuel, value }));
    dispatch(
      buildingInputActions.setIsDefaultRates({ is_default_rates: false })
    );
  };

  const handleSetIsDefaultRates = (is_default_rates: boolean) => {
    dispatch(buildingInputActions.setIsDefaultRates({ is_default_rates }));
  };

  return (
    <React.Fragment>
      {Object.keys(utilities).map((fuel, i) => {
        let fuel_obj = utilities[fuel as keyof typeof utilities];

        return (
          <React.Fragment key={i}>
            <TableRow>
              <TableCell></TableCell>

              <TableCell variant="head">
                {fuel_keys_to_labels[fuel as keyof typeof fuel_keys_to_labels]}
              </TableCell>
              <TableCell variant="head">
                {
                  fuel_keys_to_rate_labels[
                    fuel as keyof typeof fuel_keys_to_rate_labels
                  ]
                }
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <FocusInput
                  value={fuel_obj.consumption}
                  callback={(v) => {
                    handleFuelConsumptionChange(fuel, v as number);
                  }}
                  input_type="number"
                />
              </TableCell>
              <TableCell>
                <FocusInput
                  value={fuel_obj.rate}
                  callback={(v) => {
                    handleFuelRateChange(fuel, v as number);
                  }}
                  input_type="number"
                />
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      })}
      <TableRow>
        <TableCell sx={{ textAlign: "left" }}>
          <Checkbox
            onClick={() => handleSetIsDefaultRates(!is_default_rates)}
            checked={is_default_rates ? true : false}
          ></Checkbox>
        </TableCell>
        <TableCell colSpan={3}>Use Default Rates</TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default InputUtilities;
