import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Game, useGame } from "../../hooks/data/game";
import { useSeason } from "../../hooks/data/season";

type EditGameModalProps = {
  open: boolean;
  handleClose: () => void;
  gameId: string;
};

type Error = {
  opponentName: string;
  gameDate: string;
};

export const EditGameModal = (props: EditGameModalProps) => {
  const { open, handleClose, gameId } = props;
  const { game: originalGame, updateGame } = useGame(gameId);
  const defaultError = {
    opponentName: "",
    gameDate: "",
  };
  const { season } = useSeason(originalGame.seasonId);

  const [error, setError] = useState<Error>(defaultError);
  const [game, setGame] = useState<Game>(originalGame);

  useEffect(() => {
    setGame({
      ...originalGame,
    });
  }, [originalGame, season]);

  const validateFields = (game: Game) => {
    const newError = defaultError;
    let hasError = false;
    if (game.opponentName === "") {
      hasError = true;
      newError.opponentName = "Opponent name can not be blank";
    }
    if (game.gameDate === null) {
      hasError = true;
      newError.gameDate = "Game date must be a valid mm/dd/yyyy date.";
    }

    setError(newError);

    return !hasError;
  };

  const handleSubmit = () => {
    if (validateFields(game)) {
      updateGame(game);
      handleClose();
    }
  };

  const handleChange = (gameProps: Partial<Game>) => {
    setError(defaultError);
    setGame({ ...game, ...gameProps });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <IconButton
        sx={{ position: "absolute", right: 10, top: 10 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Edit Game</DialogTitle>
      <DialogContent sx={{ minWidth: "300px" }}>
        {originalGame && season && (
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            autoComplete="off"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <DateTimePicker
              label="Game Date"
              value={game.gameDate}
              onChange={(newValue) => {
                handleChange({
                  gameDate: newValue
                    ? new Date(newValue).toISOString()
                    : new Date().toISOString(),
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={
                    error.gameDate !== "" ? error.gameDate : "mm/dd/yyyy"
                  }
                  error={error.gameDate !== ""}
                  size="small"
                />
              )}
            />
            <TextField
              error={error.opponentName !== ""}
              id="opponent-name"
              label="Opponent Name"
              variant="outlined"
              value={game.opponentName}
              onChange={({ target: { value } }) => {
                handleChange({ opponentName: value });
              }}
              size="small"
              InputProps={
                game.opponentName !== ""
                  ? {
                      endAdornment: (
                        <IconButton
                          tabIndex={-1}
                          onClick={() => setGame({ ...game, opponentName: "" })}
                        >
                          <ClearIcon fontSize="small" color="primary" />
                        </IconButton>
                      ),
                    }
                  : {}
              }
              helperText={
                error.opponentName !== "" ? error.opponentName : `Opponent name`
              }
            />
            <TextField
              id="location"
              label="Location"
              variant="outlined"
              value={game.location || ""}
              onChange={({ target: { value } }) => {
                handleChange({ location: value });
              }}
              size="small"
              InputProps={
                game.location !== ""
                  ? {
                      endAdornment: (
                        <IconButton
                          tabIndex={-1}
                          onClick={() => setGame({ ...game, location: "" })}
                        >
                          <ClearIcon fontSize="small" color="primary" />
                        </IconButton>
                      ),
                    }
                  : {}
              }
            />
            <TextField
              id="opponent-short-name"
              label="Opponent Short Name"
              variant="outlined"
              value={game.opponentShortName || ""}
              onChange={({ target: { value } }) => {
                handleChange({ opponentShortName: value });
              }}
              size="small"
              InputProps={
                game.opponentShortName !== ""
                  ? {
                      endAdornment: (
                        <IconButton
                          tabIndex={-1}
                          onClick={() =>
                            setGame({ ...game, opponentShortName: "" })
                          }
                        >
                          <ClearIcon fontSize="small" color="primary" />
                        </IconButton>
                      ),
                    }
                  : {}
              }
              helperText="Opponent short name"
            />
            <Divider />
            <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
              Players playing
            </Typography>
            <List>
              {season.team?.players?.map((player) => {
                return (
                  <ListItem key={player.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={player.id}
                          checked={game.players.includes(player.id)}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const newPlayers = event.target.checked
                              ? [...game.players, event.target.name]
                              : game.players.filter(
                                  (playerId: string) =>
                                    playerId !== event.target.name
                                );
                            handleChange({ players: newPlayers });
                          }}
                        />
                      }
                      label={`#${player.number} - ${player.firstName} ${player.lastName}`}
                    />
                  </ListItem>
                );
              })}
            </List>
            <div>
              <Button variant="contained" onClick={handleSubmit}>
                Edit Game
              </Button>
            </div>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
