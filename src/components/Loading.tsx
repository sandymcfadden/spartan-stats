import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CircularProgress />
      <div>Loading...</div>
    </Box>
  );
};
