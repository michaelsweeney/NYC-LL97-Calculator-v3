import { uiActions } from "store/uislice";
import { ll84QueryActions } from "store/ll84queryslice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { LL84QueryPropertyTypes } from "types";
import { LL84SelectionToLL97Inputs } from "locallaw/ll84_query_to_ll97_inputs";
import { ButtonSecondary } from "styles/components";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
} from "@mui/material";
import { buildingInputActions } from "store/buildinginputslice";
import styled from "@emotion/styled";

const ResultContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

const HeadCell = styled(TableCell)`
  background-color: transparent;
`;

const TD = styled(TableCell)`
  max-width: 50px;
  overflow: hidden;
`;

const SizedTableContainer = styled(TableContainer)``;

const LL84ResultsTable = () => {
  const { ll84_query_results } = useAppSelector((state) => state.ll84_query);
  const { window_dimensions } = useAppSelector((state) => state.ui);

  const dispatch = useAppDispatch();

  const table_column_map: string[][] = [
    ["Property Name", "property_name"],
    ["Address", "address_1"],
    ["NYC BBL", "nyc_bbl"],
    ["NYC BIN", "nyc_bin"],
    ["1st Property Type", "1st_property_use_type"],
    ["2nd Property Type", "2nd_property_use_type"],
    ["3rd Property Type", "3rd_property_use_type"],
  ];

  const handleLoadBuilding = (selected_ll84_data: LL84QueryPropertyTypes) => {
    dispatch(ll84QueryActions.setSelectedLL84Property(selected_ll84_data));
    let ll97_inputs = LL84SelectionToLL97Inputs(selected_ll84_data);

    dispatch(
      buildingInputActions.setBuildingInputsFromLL84Results(ll97_inputs)
    );
    dispatch(uiActions.setCurrentView("building_summary_dialogue"));
  };

  return (
    <ResultContainer>
      <SizedTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <HeadCell></HeadCell>
              {table_column_map.map((e, i) => {
                return <HeadCell key={i}>{e[0]}</HeadCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {ll84_query_results.map((result, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <ButtonSecondary
                      sx={{ borderRadius: 0 }}
                      variant="contained"
                      color="secondary"
                      onClick={() => handleLoadBuilding(result)}
                    >
                      Load
                    </ButtonSecondary>
                  </TableCell>
                  {table_column_map.map((e, si) => (
                    <TD key={si}>{result[e[1] as keyof typeof result]}</TD>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </SizedTableContainer>
    </ResultContainer>
  );
};

export default LL84ResultsTable;
