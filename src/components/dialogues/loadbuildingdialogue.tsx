import styled from "styled-components";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import { TextField, MenuItem, TextFieldProps } from "@mui/material";
import DialogueContainer from "./dialoguecontainer";
import LoadModalResults from "./ll84resultstable";
import { SubHeaderLined } from "styles/typography";
import { uiActions } from "store/uislice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useEffect, ChangeEvent, useRef } from "react";
import { ll84QueryActions } from "store/ll84queryslice";
import { ll84_year_lookups } from "locallaw/lookups";
import { handleLL84QueryResponse } from "locallaw/ll84_query";
import { LL84QueryPropertyTypes, LL84YearTypes } from "types";

const SearchContainer = styled.div`
  /* background-color: white; */
  height: 100%;
  /* padding: 20px; */
  margin-top: 20px;
  box-sizing: border-box;
`;

const ControlWrapper = styled.div`
  margin-bottom: 15px;
`;
const SelectWrapper = styled(Select)`
  background-color: white;
  border-radius: 0px;
`;

const InputWrapper = styled(TextField)`
  background-color: white;
  margin-left: 10px;
  & fieldset {
    border-radius: 0px;
  }
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

  const handleYearSelection = (e: SelectChangeEvent<unknown>) => {
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
    <DialogueContainer
      closeCallback={handleCloseDialogue}
      title="Load LL84 Building Info"
    >
      <div>
        <p>
          This form allows for querying NYC's "Energy and Water Data Disclosure"
          database for multiple years. The form loads and translates building
          utility information, either using the property's BBL number, address,
          or property name (searches are case sensitive). Data loaded using this
          form should be verified with building utility consumption and gross
          square footage.
        </p>
        <p>Input BBL ID Number, Property Name, or Address (case sensitive)</p>

        <SearchContainer>
          <ControlWrapper>
            <SelectWrapper
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
            </SelectWrapper>
            <InputWrapper
              color="secondary"
              autoFocus
              inputRef={inputref}
              onChange={handleSearchChange}
              value={ll84_query_input}
            />
          </ControlWrapper>

          <div>
            <LoadModalResults />
          </div>
        </SearchContainer>
      </div>
    </DialogueContainer>
  );
};

export default LoadBuildingDialogue;