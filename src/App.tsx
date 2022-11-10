import { createTheme, ThemeProvider } from "@mui/material/styles";
import "App.css";

import MainLayout from "components/mainlayout";
import TestComponent from "components/testcomponent";
import InputListener from "components/inputlistener";
import PrintLayout from "components/printlayout/printlayout";

import { colors } from "styles/colors";
import { Shadows } from "@mui/material/styles/shadows";
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
  return (
    <ThemeProvider theme={theme}>
      <InputListener />
      <WindowListener />
      <TestComponent />
      <TooSmallModal />
      <div>hey</div>
      <div className="layout-container">
        <MainLayout />
      </div>

      <div className="print-container">
        <PrintLayout />
      </div>
    </ThemeProvider>
  );
};

export default App;
