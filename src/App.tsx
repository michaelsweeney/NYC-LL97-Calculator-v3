import { createTheme, ThemeProvider } from "@mui/material/styles";
import "App.css";

import MainLayout from "components/mainlayout";
import InfoModal from "components/modals/infomodal";
import LoadModal from "components/modals/loadmodal";
import BuildingSummaryModal from "components/modals/buildingsummarymodal";
import TestComponent from "components/testcomponent";
import InputListener from "components/inputlistener";

import { colors } from "styles/colors";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.main.secondary,
    },
    primary: {
      main: colors.main.primary,
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
