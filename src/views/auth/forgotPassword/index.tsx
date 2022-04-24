import {
  Alert,
  AlertTitle,
  Button,
  Container,
  Grid,
  Link as L,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "wouter";
import { SpartanLogo } from "../../../components/icons/spartan";
import { useAuth } from "../../../hooks/AuthProvider";
import { isEmail } from "../../../utils";

export const ForgotPassword = () => {
  const [validationError, setValidationError] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const { forgotPass, error } = useAuth();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") + "".trim().toLocaleLowerCase();
    if (isEmail(email)) {
      forgotPass(email);
      setForgotSent(true);
    } else {
      setValidationError("Please check your email");
    }
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
            {validationError.length > 0 && (
              <Alert severity="error" sx={{ mb: 1, maxWidth: 400 }}>
                <AlertTitle>Please check your password and email</AlertTitle>
                {validationError}
              </Alert>
            )}
            {forgotSent && (
              <Alert severity="info" sx={{ mb: 1, maxWidth: 400 }}>
                <AlertTitle>Check your email</AlertTitle>
                {
                  "If there was a valid account with that email you will recieve a forgot password email soon."
                }
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login">
                  <L variant="body2">Log in</L>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup">
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
