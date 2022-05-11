import { Button, Typography, Stack } from "@mui/material";
import { useGame } from "../../hooks/data/game";
import { useSnackbar } from "../../hooks/snackbar";

export const OpponentPoints = ({ gameId }: { gameId: string }) => {
  const { addAlert } = useSnackbar();
  const { game, updateOpponentScore } = useGame(gameId);

  const handleClick = (points: number, message: string) => {
    updateOpponentScore(points);
    addAlert({
      open: true,
      message: `${game.opponentName} ${message}`,
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
          onClick={() => handleClick(2, "hit a 2 pointer")}
        >
          2pt
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick(3, "hit a 3 pointer")}
        >
          3pt
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick(1, "hit a foul shot")}
        >
          1pt
        </Button>
      </Stack>
    </>
  );
};
