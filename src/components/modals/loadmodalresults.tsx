import * as React from "react";

import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";

const LoadModalResults = () => {
  const { ll84_query_results } = useAppSelector((state) => state.ui);

  return (
    <div>
      <Table>
        <TableBody>
          {ll84_query_results.map((result, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{result.property_name}</TableCell>
                <TableCell>{result.electricity_use_kbtu}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoadModalResults;
