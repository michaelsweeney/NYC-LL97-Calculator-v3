import { createTheme, ThemeProvider } from "@mui/material/styles";

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
      <div>hey there LL97</div>
    </ThemeProvider>
  );
};

export default App;
