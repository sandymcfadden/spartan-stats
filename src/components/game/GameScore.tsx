import { Grid, Paper, Typography, Button, Stack } from "@mui/material";
import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "../../hooks/AuthProvider";
import { Game, useGame } from "../../hooks/data/game";
import { addPlay } from "../../hooks/data/plays";
import { useSeason } from "../../hooks/data/season";
import { Confirm } from "../Confirm";
import { GameProps } from ".";

export const GameScore = ({ gameId, seasonId }: GameProps) => {
  const { game, endGame, isGameEnded } = useGame(gameId);
  const { season } = useSeason(seasonId);
  const { canAddStats } = useAuth();
  const [confirm, setConfirm] = useState(false);
  const theirFullName = game.opponentName.split(" ");
  const theirName = theirFullName[theirFullName.length - 1];

  const confirmEndGame = () => {
    addPlay({
      gameId: gameId,
      message: "Game Over",
      dateCreated: new Date().toISOString(),
      type: "gameEnd",
      value: 0,
    });
    endGame();
  };

  const gameResult = (game: Game) => {
    if (game.ourPoints.total > game.theirPoints.total) {
      return "Win";
    } else if (game.ourPoints.total < game.theirPoints.total) {
      return "Loss";
    } else {
      return "Tie";
    }
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Stack direction="row" justifyContent="space-between">
            <Link href={`/season/${seasonId}`}>
              <Button>Back to Games</Button>
            </Link>
            {!isGameEnded() && canAddStats() && (
              <Button onClick={() => setConfirm(true)}>End Game</Button>
            )}
          </Stack>
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
              {isGameEnded() && (
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ textAlign: "center", mb: 1 }}>
                    Final: {gameResult(game)}
                  </Typography>
                </Grid>
              )}
              <Grid item lg={3}>
                <Typography variant="h5">{season.team?.short}</Typography>
                <Typography variant="h4">
                  {game?.ourPoints?.total || 0}
                </Typography>
                <Typography variant="caption">
                  Fouls: {game?.ourFouls || 0}
                </Typography>
              </Grid>
              <Grid item lg={3}>
                <Typography variant="h5">{theirName}</Typography>
                <Typography variant="h4">
                  {game?.theirPoints?.total || 0}
                </Typography>
                <Typography variant="caption">
                  Fouls: {game?.theirFouls || 0}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      {confirm && !isGameEnded() && canAddStats() && (
        <Confirm
          open={confirm}
          handleClose={() => setConfirm(false)}
          title="Confirm End Game"
          message="Are you sure you want to end this game? You won't be able to edit stats anymore"
          action={confirmEndGame}
        />
      )}
    </>
  );
};
