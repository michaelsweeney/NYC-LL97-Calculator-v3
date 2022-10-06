import * as React from "react";
import * as d3 from "d3";
import { useAppDispatch, useAppSelector } from "store/hooks";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const TableView: React.FunctionComponent = () => {
  const {
    building_inputs: {
      building_types,
      electric_coefficient_method,
      electric_onsite_generation,
      utilities,
    },
    building_outputs: { annual_carbon_summary_by_year },
  } = useAppSelector((state) => state);

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell variant="head">Year</TableCell>
            <TableCell variant="head">Threshold (tCO2e/yr)</TableCell>
            <TableCell variant="head">Total Carbon (tCO2e/yr)</TableCell>
            <TableCell variant="head">Fine ($/yr)</TableCell>
          </TableRow>

          {!annual_carbon_summary_by_year ? (
            <TableRow></TableRow>
          ) : (
            annual_carbon_summary_by_year
              .filter(
                (d) =>
                  d.year === 2024 ||
                  d.year === 2030 ||
                  d.year === 2035 ||
                  d.year === 2050
              )
              .map((yr, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{yr.year}</TableCell>
                    <TableCell>
                      {yr.threshold_absolute
                        ? d3.format(",")(Math.round(yr.threshold_absolute))
                        : yr.threshold_absolute}
                    </TableCell>
                    <TableCell>
                      {d3.format(",")(Math.round(yr.carbon_total_absolute))}
                    </TableCell>
                    <TableCell>
                      {d3.format("$,")(Math.round(yr.fine))}
                    </TableCell>
                  </TableRow>
                );
              })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
