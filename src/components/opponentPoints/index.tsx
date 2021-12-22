import { Button, Typography, Stack } from "@mui/material";
import { useSnackbar } from "../../hooks/snackbar";

export const OpponentPoints = () => {
  const { addAlert } = useSnackbar();
  const handleClick = (message: string) => {
    addAlert({
      open: true,
      message: `Other team ${message}`,
    });
  };
  return (
    <>
      <Typography component="h3" align="right" sx={{ mb: 1 }}>
        Other Team
      </Typography>
      <Stack spacing={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick("hit a 2 pointer")}
        >
          2pt
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick("hit a 3 pointer")}
        >
          3pt
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick("hit a foul shot")}
        >
          1pt
        </Button>
      </Stack>
    </>
  );
};
