import { Grid, Paper, Typography } from "@mui/material";

export const GameScore = () => {
  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Grid container spacing={1} justifyContent="space-around">
            <Grid item lg={3}>
              <Typography variant="h5">Spartans</Typography>
              <Typography variant="h4">56</Typography>
            </Grid>
            <Grid item lg={3}>
              <Typography variant="h5">Other</Typography>
              <Typography variant="h4">32</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
