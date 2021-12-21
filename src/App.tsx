import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route } from "wouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Home } from "./views/home";
import { SnackbarProvider } from "./hooks/snackbar";

export const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <Route path="/">
          <Home />
        </Route>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
