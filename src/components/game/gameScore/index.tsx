import { Grid, Paper, Typography } from "@mui/material";
import { GameProps } from "../";

export const GameScore = ({
  seasonId = "2021 - 2022",
  gameId = "First",
}: GameProps) => {
  const game = {
    id: gameId,
    seasonId: seasonId,
    teamScore: 56,
    opponentScore: 32,
    opponentName: "Lakers",
  };
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
              <Typography variant="h4">{game.teamScore}</Typography>
            </Grid>
            <Grid item lg={3}>
              <Typography variant="h5">{game.opponentName}</Typography>
              <Typography variant="h4">{game.opponentScore}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
