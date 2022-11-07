import { fuel_keys_to_labels } from "locallaw/lookups";

import * as d3 from "d3";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { SubHeaderLined } from "styles/typography";

import { useAppSelector } from "store/hooks";
import { formatNumber, formatCurrency } from "components/charts/d3helpers";
import React from "react";

type PropTypes = {
  width?: number;
};

const UtilityInputsTable = (props: PropTypes) => {
  const { building_inputs } = useAppSelector((state) => state);

  let width = props.width ? props.width : 600;

  let { utilities, electric_onsite_generation } = building_inputs;

  const utility_array = Object.keys(utilities)
    .map((k) => {
      let val = utilities[k as keyof typeof utilities];
      return {
        fuel_type: fuel_keys_to_labels[k as keyof typeof fuel_keys_to_labels],
        fuel_consumption: val.consumption,
        utility_rate: val.rate,
        cost_per_year: val.consumption * val.rate,
      };
    })
    .filter((d) => d.fuel_consumption !== 0);

  if (electric_onsite_generation.photovoltaic.consumption !== 0) {
    utility_array.push({
      fuel_type: "Solar PV (kWh)",
      fuel_consumption: electric_onsite_generation.photovoltaic.consumption,
      utility_rate: utilities.elec.rate,
      cost_per_year:
        electric_onsite_generation.photovoltaic.consumption *
        utilities.elec.rate,
    });
  }

  return (
    <React.Fragment>
      <SubHeaderLined>Utility Inputs</SubHeaderLined>
      <TableContainer>
        <Table sx={{ width: width }} size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head"> Fuel Type</TableCell>
              <TableCell variant="head"> Consumption</TableCell>
              <TableCell variant="head"> Utility Rate</TableCell>
              <TableCell variant="head"> Annual Cost ($/yr)</TableCell>
            </TableRow>

            {utility_array.map((d, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{d.fuel_type}</TableCell>
                  <TableCell>{formatNumber(d.fuel_consumption)}</TableCell>
                  <TableCell>{formatCurrency(d.utility_rate, 2)}</TableCell>
                  <TableCell>{formatCurrency(d.cost_per_year)}</TableCell>
                </TableRow>
              );
            })}

            <TableRow>
              <TableCell variant="head" colSpan={3}>
                Total Cost
              </TableCell>
              <TableCell variant="head">
                {`${formatCurrency(
                  d3.sum(utility_array.map((d) => d.cost_per_year))
                )}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default UtilityInputsTable;
