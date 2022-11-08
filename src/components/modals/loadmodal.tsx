import { useEffect, ChangeEvent, useRef } from "react";

import { TextField, MenuItem, TextFieldProps } from "@mui/material";

import Select, { SelectChangeEvent } from "@mui/material/Select";

import ModalWrapper from "./modalwrapper";
import LoadModalResults from "./loadmodalresults";
import { uiActions } from "store/uislice";
import { ll84QueryActions } from "store/ll84queryslice";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { ll84_year_lookups } from "locallaw/lookups";
import { handleLL84QueryResponse } from "locallaw/ll84_query";
import { LL84QueryPropertyTypes, LL84YearTypes } from "types";

const LoadModal = () => {
  const { is_load_modal_open } = useAppSelector((state) => state.ui);
  const { ll84_query_input, ll84_year_selection } = useAppSelector(
    (state) => state.ll84_query
  );

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(uiActions.setIsLoadModalOpen(false));
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
  }, [is_load_modal_open]);

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
    <ModalWrapper
      modalTitle="Building Utility Info Loader"
      isOpen={is_load_modal_open}
      exitCallback={handleCloseModal}
    >
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

        <div>
          <Select
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
      </div>
    </ModalWrapper>
  );
};

export default LoadModal;
