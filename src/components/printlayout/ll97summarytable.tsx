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
import { ResultsPeriodType } from "types";

type PropTypes = {
  width?: number;
};

const LL97SummaryTable = (props: PropTypes) => {
  const { building_outputs } = useAppSelector((state) => state);
  let width = props.width ? props.width : 600;

  let carbon_periods: ResultsPeriodType[] = [];
  let year_filter = [2024, 2030, 2035, 2040, 2050];

  if ("annual_result_array" in building_outputs) {
    carbon_periods = building_outputs.annual_result_array.filter((d) =>
      year_filter.includes(d.year)
    );
  }
  return (
    <React.Fragment>
      <SubHeaderLined>LL97 Threshold Summary</SubHeaderLined>
      <TableContainer>
        <Table sx={{ width: width }} size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head">Year</TableCell>
              <TableCell variant="head">Threshold (tCO2e/yr)</TableCell>
              <TableCell variant="head">GHG Emissions (tCO2e/yr)</TableCell>
              <TableCell variant="head">Fine ($/yr)</TableCell>
            </TableRow>

            {carbon_periods.length === 0 ? (
              <TableRow></TableRow>
            ) : (
              carbon_periods.map((period, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{period.year}</TableCell>
                    <TableCell>
                      {period.threshold.absolute
                        ? formatNumber(period.threshold.absolute)
                        : period.threshold.absolute}
                    </TableCell>
                    <TableCell>
                      {formatNumber(period.carbon.absolute.total as number)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(period.fine.absolute)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default LL97SummaryTable;
