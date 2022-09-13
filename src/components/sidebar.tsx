import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import * as React from "react";

import InputBuilding from "./inputbuilding";
import InputUtilities from "./inpututilities";
import InputOnsiteGeneration from "./inputonsitegeneration";

const styles: { [key: string]: React.CSSProperties } = {
  root: {
    width: 500,
    height: "100%",
    border: "1px solid black",
    display: "inline-block",
    boxSizing: "border-box",
  },
};

interface IAppProps {}

const Sidebar: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div style={styles.root}>
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell variant="head" colSpan={4}>
                Building Inputs
              </TableCell>
            </TableRow>
            <InputBuilding />
            <TableRow>
              <TableCell variant="head" colSpan={4}>
                Utility Inputs
              </TableCell>
            </TableRow>
            <InputUtilities />
            <TableRow>
              <TableCell variant="head" colSpan={4}>
                Onsite Generation
              </TableCell>
            </TableRow>
            <InputOnsiteGeneration />
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Sidebar;
