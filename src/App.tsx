import { createTheme, ThemeProvider } from "@mui/material/styles";
import "App.css";

import MainLayout from "components/mainlayout";
import InfoModal from "components/modals/infomodal";
import LoadModal from "components/modals/loadmodal";
import BuildingSummaryModal from "components/modals/buildingsummarymodal";
import TestComponent from "components/testcomponent";
import InputListener from "components/inputlistener";
import PrintLayout from "components/printlayout/printlayout";

import { colors } from "styles/colors";
import { Shadows } from "@mui/material/styles/shadows";
import { useAppSelector } from "store/hooks";
import TooSmallModal from "components/modals/toosmallmodal";
import WindowListener from "components/windowlistener";

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
  const { is_print_mode } = useAppSelector((state) => state.ui);

  return (
    <ThemeProvider theme={theme}>
      <InputListener />
      <WindowListener />
      <TestComponent />
      <InfoModal />
      <LoadModal />
      <TooSmallModal />
      <BuildingSummaryModal />
      <div
        className="layout-container"
        style={{ display: !is_print_mode ? "block" : "none" }}
      >
        <MainLayout />
      </div>

      <div
        className="print-container"
        style={{ display: is_print_mode ? "block" : "none" }}
      >
        <PrintLayout />
      </div>
    </ThemeProvider>
  );
};

export default App;
