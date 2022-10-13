import { createTheme, ThemeProvider } from "@mui/material/styles";
import "App.css";

import MainLayout from "components/mainlayout";
import InfoModal from "components/modals/infomodal";
import LoadModal from "components/modals/loadmodal";
import BuildingSummaryModal from "components/modals/buildingsummarymodal";
import TestComponent from "components/testcomponent";
import InputListener from "components/inputlistener";
import PrintLayout from "components/printlayout";

import { colors } from "styles/colors";
import { Shadows } from "@mui/material/styles/shadows";

const theme = createTheme({
  shadows: Array(25).fill("none") as Shadows,
  components: {
    MuiButtonBase: {
      styleOverrides: {},
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiSelect: {
      defaultProps: {},
    },
  },
  palette: {
    secondary: {
      main: colors.secondary.main as string,
    },
    primary: {
      main: colors.primary.main as string,
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
      <PrintLayout />
    </ThemeProvider>
  );
};

export default App;
