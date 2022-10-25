import * as React from "react";
import { InlineStylesType } from "types";
import {
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  Checkbox,
} from "@mui/material";
import FocusInput from "./focusinput";

import { colors } from "styles/colors";
import {
  fuel_keys_to_labels,
  fuel_keys_to_rate_labels,
} from "locallaw/lookups";
import { buildingInputActions } from "store/buildinginputslice";
import { useAppDispatch, useAppSelector } from "store/hooks";

interface IAppProps {}

const defaultPadding = "5px";
const styles: InlineStylesType = {
  root: { overflowX: "hidden" },
  table: { marginLeft: "24px", tableLayout: "fixed", width: "275px" },
  fuel_col: {
    width: "150px",
    paddingLeft: defaultPadding,
    paddingRight: defaultPadding,
  },
  rate_col: {
    width: "70px",
    paddingLeft: defaultPadding,
    paddingRight: defaultPadding,
  },
  default_rate_container: {
    paddingLeft: 25,
  },
};

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

  const utility_keys = ["elec", "gas", "steam", "fuel_two", "fuel_four"];
  return (
    <div>
      <TableContainer sx={styles.root}>
        <Table size="small" sx={styles.table}>
          <TableBody>
            {utility_keys.map((fuel, i) => {
              let fuel_obj = utilities[fuel as keyof typeof utilities];

              return (
                <React.Fragment key={i}>
                  <TableRow>
                    <TableCell sx={styles.fuel_col} variant="head">
                      {
                        fuel_keys_to_labels[
                          fuel as keyof typeof fuel_keys_to_labels
                        ]
                      }
                    </TableCell>
                    <TableCell sx={styles.rate_col} variant="head">
                      {
                        fuel_keys_to_rate_labels[
                          fuel as keyof typeof fuel_keys_to_rate_labels
                        ]
                      }
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={styles.fuel_col}>
                      <FocusInput
                        value={fuel_obj.consumption}
                        callback={(v) => {
                          handleFuelConsumptionChange(fuel, v as number);
                        }}
                        input_type="number"
                      />
                    </TableCell>
                    <TableCell sx={styles.rate_col}>
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
          </TableBody>
        </Table>
      </TableContainer>

      <div style={styles.default_rate_container}>
        <span>
          <Checkbox
            color="secondary"
            onClick={() => handleSetIsDefaultRates(!is_default_rates)}
            checked={is_default_rates ? true : false}
          ></Checkbox>
        </span>
        Use Default Rates
      </div>
    </div>
  );
};

export default InputUtilities;
