import { createTheme, ThemeProvider } from "@mui/material/styles";
import "App.css";

import MainLayout from "components/mainlayout";
import InfoModal from "components/modals/infomodal";
import LoadModal from "components/modals/loadmodal";
import BuildingSummaryModal from "components/modals/buildingsummarymodal";
import TestComponent from "components/testcomponent";
import InputListener from "components/inputlistener";
import { useEffect } from "react";

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
  return (
    <ThemeProvider theme={theme}>
      <InputListener />
      <TestComponent />
      <InfoModal />
      <LoadModal />
      <BuildingSummaryModal />
      <MainLayout />
    </ThemeProvider>
  );
};

export default App;
