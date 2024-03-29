import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Route } from "./components/Route";
import { AuthProvider } from "./hooks/AuthProvider";
import { SnackbarProvider } from "./hooks/snackbar";
import { Admin } from "./views/admin";
import { UserEdit } from "./views/admin/UserEdit";
import { ForgotPassword } from "./views/auth/ForgotPassword";
import { Login } from "./views/auth/Login";
import { NeedsApproval } from "./views/auth/NeedsApproval";
import { SignUp } from "./views/auth/SignUp";
import { GameView } from "./views/game";
import { Games } from "./views/gameList";
import { Home } from "./views/home";
import { Seasons } from "./views/seasons";
import { SeasonView } from "./views/seasons/season";

export const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const TIMEOUT = 60 * 1000 * 5;

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, TIMEOUT);
    },
  });

  useEffect(() => {
    if (needRefresh) {
      updateServiceWorker(true);
      setNeedRefresh(false);
    }
  }, [needRefresh]);

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
          <Route path="/season/details/:seasonId" authRequired>
            {(params) => <SeasonView seasonId={params?.seasonId || ""} />}
          </Route>
          <Route path="/season/:seasonId/game/:gameId" authRequired>
            {(params) => (
              <GameView
                seasonId={params?.seasonId || ""}
                gameId={params?.gameId || ""}
              />
            )}
          </Route>
          <Route path="/season/:seasonId" authRequired>
            {(params) => <Games seasonId={params?.seasonId || ""} />}
          </Route>
          <Route path="/admin" adminRequired authRequired>
            <Admin />
          </Route>
          <Route path="/admin/:email" adminRequired authRequired>
            {(params) => <UserEdit email={params?.email || ""} />}
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
          <Route path="/forgot">
            <ForgotPassword />
          </Route>
        </SnackbarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};
