import {
  Alert,
  Button,
  Container,
  Grid,
  Link as L,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "wouter";
import { SpartanLogo } from "../../components/icons/spartan";
import { useAuth } from "../../hooks/AuthProvider";

export const Login = () => {
  const { attemptLogin, error } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    attemptLogin(data.get("email") + "".trim(), data.get("password") + "");
  };
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SpartanLogo width={50} height={50} margin={10} />
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {error.length > 0 && (
              <Alert severity="error" sx={{ mb: 1 }}>
                {error}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#">
                  <L variant="body2">Forgot password?</L>
                </Link>
              </Grid>
              <Grid item>
                <Link href="#">
                  <L variant="body2">{"Don't have an account? Sign Up"}</L>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
