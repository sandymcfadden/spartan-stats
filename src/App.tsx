import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route } from "./components/Route";
import { AuthProvider } from "./hooks/AuthProvider";
import { SnackbarProvider } from "./hooks/snackbar";
import { GameView } from "./views/game";
import { Games } from "./views/gameList";
import { Home } from "./views/home";
import { Login } from "./views/login";
import { NeedsApproval } from "./views/needsApproval";
import { Seasons } from "./views/seasons";
import { SeasonView } from "./views/seasons/season";
import { SignUp } from "./views/signUp";

export const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <Route path="/" authRequired>
            <Home />
          </Route>
          <Route path="/seasons" authRequired>
            <Seasons />
          </Route>
          <Route path="/season/:seasonId/games" authRequired>
            {(params: { seasonId: string }) => (
              <Games seasonId={params.seasonId} />
            )}
          </Route>
          <Route path="/season/:seasonId/game/:gameId" authRequired>
            {(params: { seasonId: string; gameId: string }) => (
              <GameView seasonId={params.seasonId} gameId={params.gameId} />
            )}
          </Route>
          <Route path="/season/:seasonId" authRequired>
            {(params: { seasonId: string }) => (
              <SeasonView seasonId={params.seasonId} />
            )}
          </Route>
          <Route path="/needs-approval">
            <NeedsApproval />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
