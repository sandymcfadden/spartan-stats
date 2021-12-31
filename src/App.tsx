import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route } from "wouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Home } from "./views/home";
import { Seasons } from "./views/seasons";
import { SeasonView } from "./views/seasons/season";
import { SnackbarProvider } from "./hooks/snackbar";
import { Games } from "./views/gameList";
import { GameView } from "./views/game";

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
        <Route path="/seasons">
          <Seasons />
        </Route>
        <Route path="/season/:seasonId/games">
          {(params: { seasonId: string }) => (
            <Games seasonId={params.seasonId} />
          )}
        </Route>
        <Route path="/season/:seasonId/game/:gameId">
          {(params: { seasonId: string; gameId: string }) => (
            <GameView seasonId={params.seasonId} gameId={params.gameId} />
          )}
        </Route>
        <Route path="/season/:seasonId">
          {(params: { seasonId: string }) => (
            <SeasonView seasonId={params.seasonId} />
          )}
        </Route>
      </SnackbarProvider>
    </ThemeProvider>
  );
};
