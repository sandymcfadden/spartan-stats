import { Button, Typography, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { useGame } from "../../hooks/data/game";
import { addPlay, PlayTypes } from "../../hooks/data/plays";
import { useSnackbar } from "../../hooks/snackbar";

export const OpponentStats = ({ gameId }: { gameId: string }) => {
  const { addAlert, closeAlert } = useSnackbar();
  const { game, updateOpponentScore, updateOpponentFouls, deletePlay } =
    useGame(gameId);

  const theirFullName = game.opponentName.split(" ");
  const theirName =
    game.opponentShortName && game.opponentShortName !== ""
      ? game.opponentShortName
      : theirFullName[theirFullName.length - 1];

  const handleClick = async (
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
    const fullMessage = `${theirName} ${message}`;
    const playId = uuidv4();
    const newPlay = {
      gameId: gameId,
      message: fullMessage,
      dateCreated: new Date().toISOString(),
      type: (type === "foul" ? "foul" : "theirs") as PlayTypes,
      value: points,
    };
    addPlay(newPlay, playId);
    addAlert({
      message: fullMessage,
      action: (
        <Button
          color="secondary"
          size="small"
          onClick={() => {
            deletePlay({
              id: playId,
              ...newPlay,
            });
            closeAlert();
          }}
        >
          undo
        </Button>
      ),
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
