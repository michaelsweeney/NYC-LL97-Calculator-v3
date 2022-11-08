import styled from "styled-components";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { TextField, MenuItem, TextFieldProps } from "@mui/material";
import DialogueContainer from "./dialoguecontainer";
import LoadModalResults from "./ll84_results_table";
import { SubHeaderLined } from "styles/typography";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { CloseDialogueButton } from "styles/components";
import { useEffect, ChangeEvent, useRef } from "react";
import { ll84QueryActions } from "store/ll84queryslice";
import { ll84_year_lookups } from "locallaw/lookups";
import { handleLL84QueryResponse } from "locallaw/ll84_query";
import { LL84QueryPropertyTypes, LL84YearTypes } from "types";

const SearchContainer = styled.div`
  background-color: white;
  height: 100%;
  padding: 20px;
`;

const LoadBuildingDialogue = () => {
  const { ll84_query_input, ll84_year_selection } = useAppSelector(
    (state) => state.ll84_query
  );
  const dispatch = useAppDispatch();

  const handleCloseDialogue = () => {
    dispatch(uiActions.setCurrentView("chart_view"));
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    let querytext = e.target.value;
    dispatch(ll84QueryActions.setLL84QueryInput(querytext));
  };

  const handleYearSelection = (e: SelectChangeEvent) => {
    let year = e.target.value as LL84YearTypes;
    dispatch(ll84QueryActions.setLL84YearSelection(year));
  };

  const inputref = useRef<TextFieldProps>(null);
  useEffect(() => {
    if (inputref) {
      if (inputref.current) {
      }
    }
  }, []);

  useEffect(() => {
    const ll84QueryResponseCallback = (e: LL84QueryPropertyTypes[]) => {
      dispatch(ll84QueryActions.setLL84QueryResultsResponse(e));
    };

    handleLL84QueryResponse(
      ll84_query_input,
      ll84_year_selection,
      ll84QueryResponseCallback
    );
  }, [ll84_query_input, ll84_year_selection, dispatch]);

  return (
    <DialogueContainer>
      <SubHeaderLined>Load LL84 Building Info</SubHeaderLined>

      <div>
        <div>
          This form allows for querying NYC's "Energy and Water Data Disclosure"
          database for multiple years. The form loads and translates building
          utility information, either using the property's BBL number, address,
          or property name (searches are case sensitive). Data loaded using this
          form should be verified with building utility consumption and gross
          square footage.
        </div>
        <div>
          Input BBL ID Number, Property Name, or Address (case sensitive)
        </div>

        <SearchContainer>
          <div>
            <Select
              sx={{ backgroundColor: "white" }}
              color="secondary"
              onChange={handleYearSelection}
              value={ll84_year_selection}
            >
              {ll84_year_lookups.map((e, i) => {
                return (
                  <MenuItem color="secondary" key={i} value={e.key}>
                    {e.label}
                  </MenuItem>
                );
              })}
            </Select>
            <TextField
              sx={{ backgroundColor: "white" }}
              color="secondary"
              autoFocus
              inputRef={inputref}
              onChange={handleSearchChange}
              value={ll84_query_input}
            />
          </div>

          <div>
            <LoadModalResults />
          </div>
        </SearchContainer>

        <CloseDialogueButton onClick={handleCloseDialogue}>
          BACK
        </CloseDialogueButton>
      </div>
    </DialogueContainer>
  );
};

export default LoadBuildingDialogue;
