import { useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "App.css";

import MainLayout from "components/mainlayout";
import InfoModal from "components/modals/infomodal";
import LoadModal from "components/modals/loadmodal";
import BuildingSummaryModal from "components/modals/buildingsummarymodal";

import { useAppDispatch, useAppSelector } from "store/hooks";

import { uiActions } from "store/uislice";
import { buildingInputActions } from "store/buildinginputslice";
import { LL84SelectionToLL97Inputs } from "locallaw/ll84_to_ll97";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#cf202e",
    },
    primary: {
      main: "#283759",
    },
  },
});

const App = () => {
  // testing

  const building_inputs = useAppSelector((state) => state.building_inputs);
  const ll84_query_results = useAppSelector(
    (state) => state.ui.ll84_query_results
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(uiActions.setLL84QueryInput("On"));
    dispatch(uiActions.setLL84YearSelection("ll84_2021_cal_2020"));

    let selected_ll84_data = ll84_query_results[0];

    dispatch(uiActions.setSelectedLL84Property(selected_ll84_data));
    dispatch(uiActions.setIsLoadModalOpen(false));

    let ll97_inputs = LL84SelectionToLL97Inputs(selected_ll84_data);

    dispatch(
      buildingInputActions.setBuildingInputsFromLL84Results(ll97_inputs)
    );

    // dispatch loaded inputs to building inputs.
  }, [building_inputs, ll84_query_results, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <InfoModal />
      <LoadModal />
      <BuildingSummaryModal />
      <MainLayout />
    </ThemeProvider>
  );
};

export default App;
