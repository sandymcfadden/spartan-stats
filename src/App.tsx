import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route } from "wouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Home } from "./views/home";

export const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Route path="/">
        <Home />
      </Route>
    </ThemeProvider>
  );
};
