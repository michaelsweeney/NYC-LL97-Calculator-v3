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
import { formatNumber } from "components/charts/d3helpers";
import React from "react";

type PropTypes = {
  width?: number;
};

const BuildingAreasTable = (props: PropTypes) => {
  const { building_inputs } = useAppSelector((state) => state);
  let width = props.width ? props.width : 600;

  let { building_types } = building_inputs;

  return (
    <React.Fragment>
      <SubHeaderLined>Building Areas</SubHeaderLined>
      <Table sx={{ width: width }} size="small">
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
              {formatNumber(d3.sum(building_types.map((t) => t.building_area)))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default BuildingAreasTable;
