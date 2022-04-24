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
import { SpartanLogo } from "../../components/icons/spartan";
import { useAuth } from "../../hooks/AuthProvider";
import { isEmail, isPasswordValid } from "../../utils";

export const SignUp = () => {
  const { signUp, error } = useAuth();
  const [validationError, setValidationError] = useState<string[]>([]);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValidationError([]);
    const data = new FormData(event.currentTarget);
    const email = data.get("email") + "".trim().toLocaleLowerCase();
    const password = data.get("password") + "";
    const confirmPass = data.get("confirmpassword");
    const name = data.get("name") + "".trim();
    const relationship = data.get("relationship") + "".trim();
    const newErrors = [];
    if (name === "") {
      newErrors.push("You must provide a name");
    }
    if (!isEmail(email)) {
      newErrors.push("Check your email address");
    }
    if (!isPasswordValid(password)) {
      newErrors.push("Your password must be at least 8 characters");
    }
    if (password !== confirmPass) {
      newErrors.push("Your passwords must match");
    }
    if (relationship === "") {
      newErrors.push("You must share your relationship to the team");
    }
    if (newErrors.length === 0) {
      signUp(email, password, name);
    } else {
      setValidationError(newErrors);
    }
  };
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: 3 }}>
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
            Sign Up
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
              <Alert severity="error" sx={{ mb: 1 }}>
                <AlertTitle>Please check your information</AlertTitle>
                <ul>
                  {validationError.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmpassword"
              label="Confirm Password"
              type="password"
              id="confirmpassword"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="relationship"
              label="Relationship to Team"
              type="text"
              id="relationship"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#">
                  <L variant="body2">Forgot password?</L>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/login">
                  <L variant="body2">{"Log in"}</L>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};