import { Button, Typography, Stack } from "@mui/material";
import { useGame } from "../../hooks/data/game";
import { addPlay } from "../../hooks/data/plays";
import { useSnackbar } from "../../hooks/snackbar";

export const OpponentStats = ({ gameId }: { gameId: string }) => {
  const { addAlert } = useSnackbar();
  const { game, updateOpponentScore, updateOpponentFouls } = useGame(gameId);

  const handleClick = (
    points: number,
    message: string,
    type: "points" | "foul"
  ) => {
    if (points !== 0) {
      updateOpponentScore(points);
    }
    if (type === "foul") {
      updateOpponentFouls();
    }
    const fullMessage = `${game.opponentName} ${message}`;
    addPlay({
      gameId: gameId,
      message: fullMessage,
      dateCreated: new Date().toISOString(),
      type: type === "foul" ? "foul" : "theirs",
      value: points,
    });
    addAlert({
      open: true,
      message: fullMessage,
    });
  };

  return (
    <>
      <Typography component="h3" align="right" sx={{ mb: 1 }}>
        {game.opponentName}
      </Typography>
      <Stack spacing={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick(2, "hit a 2 pointer", "points")}
        >
          2pt
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick(3, "hit a 3 pointer", "points")}
        >
          3pt
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick(1, "hit a foul shot", "points")}
        >
          1pt
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick(0, "committed a foul", "foul")}
        >
          Foul
        </Button>
      </Stack>
    </>
  );
};
