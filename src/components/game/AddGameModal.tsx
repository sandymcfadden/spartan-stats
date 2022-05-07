import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useState } from "react";

type AddGameModalProps = {
  open: boolean;
  handleClose: () => void;
  seasonId: string;
};

type Error = {
  opponentName: string;
  gameDate: string;
};

type Game = {
  opponentName: string;
  gameDate: Date | null;
};

export const AddGameModal = (props: AddGameModalProps) => {
  const { open, handleClose } = props;
  const defaultError = {
    opponentName: "",
    gameDate: "",
  };
  const defaultGame = {
    opponentName: "",
    gameDate: new Date(),
  };
  const [error, setError] = useState<Error>(defaultError);
  const [game, setGame] = useState<Game>(defaultGame);

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
      // Add player then close
      setGame(defaultGame);
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
      <DialogTitle>Start New Game</DialogTitle>
      <DialogContent sx={{ minWidth: "300px" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
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
                gameDate: newValue ? new Date(newValue) : new Date(),
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
          <div>
            <Button variant="contained" onClick={handleSubmit}>
              Add Game
            </Button>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
