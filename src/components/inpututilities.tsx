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
import FocusNumberInput from "./focusnumberinput";

import {
  fuel_keys_to_labels,
  fuel_keys_to_rate_labels,
} from "locallaw/lookups";
import { buildingInputActions } from "store/buildinginputslice";
import { ll84QueryActions } from "store/ll84queryslice";

import { useAppDispatch, useAppSelector } from "store/hooks";
import styled from "styled-components";
import { uiActions } from "store/uislice";

const defaultPadding = "5px";
const styles: InlineStylesType = {
  root: { overflowX: "hidden" },
  table: { tableLayout: "fixed", width: "300px" },
  bldg_id_col: {
    visibility: "hidden",
    width: "10px",
    paddingLeft: defaultPadding,
    paddingRight: defaultPadding,
    textAlign: "center",
  },
  fuel_col: {
    width: "70px",
    paddingLeft: defaultPadding,
    paddingRight: defaultPadding,
  },
  rate_col: {
    width: "50px",
    paddingLeft: defaultPadding,
    paddingRight: defaultPadding,
  },
  default_rate_container: {
    paddingLeft: 28,
  },
  rm_btn_col: {
    visibility: "hidden",
    width: "10px",
    textAlign: "center",
    paddingLeft: 0,
    paddingRight: 0,
  },
};

const DefaultRateText = styled.span`
  position: relative;
  font-size: 14px;
  font-family: CircularStd-Medium;
  margin-left: 0;
  top: 2;
`;

const DefaultRateContainer = styled.div`
  padding-left: 28px;
`;

const InputUtilities = () => {
  const { utilities, is_default_rates } = useAppSelector(
    (state) => state.building_inputs
  );

  const dispatch = useAppDispatch();

  const handleFuelConsumptionChange = (fuel: string, value: number) => {
    dispatch(buildingInputActions.setFuelConsumption({ fuel, value }));
    dispatch(ll84QueryActions.setIsLL84Overriden(true));
    dispatch(uiActions.setCurrentView("chart_view"));
  };
  const handleFuelRateChange = (fuel: string, value: number) => {
    dispatch(buildingInputActions.setFuelRate({ fuel, value }));
    dispatch(
      buildingInputActions.setIsDefaultRates({ is_default_rates: false })
    );
    dispatch(ll84QueryActions.setIsLL84Overriden(true));
    dispatch(uiActions.setCurrentView("chart_view"));
  };

  const handleSetIsDefaultRates = (is_default_rates: boolean) => {
    dispatch(buildingInputActions.setIsDefaultRates({ is_default_rates }));
    dispatch(ll84QueryActions.setIsLL84Overriden(true));
    dispatch(uiActions.setCurrentView("chart_view"));
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
                    <TableCell sx={styles.bldg_id_col}>i</TableCell>
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
                    <TableCell sx={styles.rm_btn_col}>i</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell sx={styles.bldg_id_col}>i</TableCell>

                    <TableCell sx={styles.fuel_col}>
                      <FocusNumberInput
                        value={fuel_obj.consumption}
                        callback={(v) => {
                          handleFuelConsumptionChange(fuel, v as number);
                        }}
                      />
                    </TableCell>
                    <TableCell sx={styles.rate_col}>
                      <FocusNumberInput
                        value={fuel_obj.rate}
                        callback={(v) => {
                          handleFuelRateChange(fuel, v as number);
                        }}
                      />
                    </TableCell>
                    <TableCell sx={styles.rm_btn_col}>i</TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <DefaultRateContainer>
        <span>
          <Checkbox
            color="secondary"
            onClick={() => handleSetIsDefaultRates(!is_default_rates)}
            checked={is_default_rates ? true : false}
          ></Checkbox>
        </span>
        <DefaultRateText>Use Default Rates </DefaultRateText>
      </DefaultRateContainer>
    </div>
  );
};

export default InputUtilities;
