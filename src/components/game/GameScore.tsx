import { Grid, Paper, Typography } from "@mui/material";
import { useGame } from "../../hooks/data/game";
import { useSeason } from "../../hooks/data/season";
import { GameProps } from ".";

export const GameScore = ({ gameId, seasonId }: GameProps) => {
  const { game } = useGame(gameId);
  const { season } = useSeason(seasonId);

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
          {new Date(game.gameDate).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </Typography>
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
              <Typography variant="h5">{season.team?.short}</Typography>
              <Typography variant="h4">
                {game?.ourPoints?.total || 0}
              </Typography>
            </Grid>
            <Grid item lg={3}>
              <Typography variant="h5">
                {game.opponentName.split(" ")[0]}
              </Typography>
              <Typography variant="h4">
                {game?.theirPoints?.total || 0}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
