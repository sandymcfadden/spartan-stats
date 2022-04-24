import { Link as L, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "wouter";
import { SpartanLogo } from "../../components/icons/spartan";
import { useAuth } from "../../hooks/AuthProvider";

export const NeedsApproval = () => {
  const { doLogout } = useAuth();
  doLogout();
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
            Account Needs Approval
          </Typography>
          <Box component="div" sx={{ mt: 2, mb: 2 }}>
            Your account has been successfully created, but it must be approved
            before you are able to access the site. Please try logging in again
            soon.
          </Box>
          <Link href="/login">
            <L variant="body2">Log in again</L>
          </Link>
        </Box>
      </Container>
    </>
  );
};
