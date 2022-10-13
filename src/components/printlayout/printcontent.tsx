import * as react from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";

import * as React from "react";
import * as d3 from "d3";
import { fuel_keys_to_labels } from "locallaw/lookups";
import { formatNumber, formatCurrency } from "../views/d3helpers";
import { SubHeaderLined } from "styles/typography";
import { InlineStylesType } from "types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Box,
  Divider,
  Typography,
  Dialog,
} from "@mui/material";
import { uiActions } from "store/uislice";

import styled from "styled-components";
import { style } from "d3";

const styles: InlineStylesType = {
  root: { marginTop: "0px", marginBottom: "0px" },
  table: {
    maxWidth: 600,
  },
  box: {
    breakInside: "avoid",
    marginBottom: "50px",
  },
  p: {
    margin: "20px",
  },
};

const PrintContent = () => {
  const {
    building_inputs: { building_types, electric_onsite_generation, utilities },
    building_outputs: { annual_carbon_summary_by_year },
  } = useAppSelector((state) => state);

  let year_filter = [2024, 2030, 2035, 2040, 2050];

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
    <div style={styles.root}>
      <p style={styles.p}>
        This report provides a summary of this property’s standing related to
        NYC Local Law 97. Building inputs should be checked for accuracy, and
        the calculator assumes that the entered utility inputs will remain the
        same for every year from 2024 to 2035. The following tables summarize
        input information, output summaries, and additional graphics are
        provided on the second page. Visit be-exchange.org/calculator for more
        information, and refer to the “Notes and Clarifications” section of this
        report for additional context.
      </p>

      <Box sx={styles.box}>
        <SubHeaderLined>Utility Inputs</SubHeaderLined>
        <TableContainer>
          <Table sx={styles.table} size="small">
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

        <Divider />
      </Box>

      <Box sx={styles.box}>
        <SubHeaderLined>Building Areas</SubHeaderLined>

        <TableContainer>
          <Table sx={styles.table} size="small">
            <TableBody>
              <TableRow>
                <TableCell variant="head">Building Type</TableCell>
                <TableCell variant="head">Area (SF)</TableCell>
              </TableRow>
              {building_types.map((t, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>{t.building_type}</TableCell>
                    <TableCell>{formatNumber(t.building_area)}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell variant="head">Total Area</TableCell>
                <TableCell variant="head">
                  {formatNumber(
                    d3.sum(building_types.map((t) => t.building_area))
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Divider />

      <Box sx={styles.box}>
        <SubHeaderLined>LL97 Summary</SubHeaderLined>

        <TableContainer>
          <Table sx={styles.table} size="small">
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
                  .filter((d) => year_filter.includes(d.year))
                  .map((yr, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>{yr.year}</TableCell>
                        <TableCell>
                          {yr.threshold_absolute
                            ? formatNumber(yr.threshold_absolute)
                            : yr.threshold_absolute}
                        </TableCell>
                        <TableCell>
                          {formatNumber(yr.carbon_total_absolute)}
                        </TableCell>
                        <TableCell>{formatCurrency(yr.fine)}</TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default PrintContent;
