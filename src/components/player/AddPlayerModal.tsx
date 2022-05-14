import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
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
import { v4 as uuidv4 } from "uuid";
import { Player } from "../../hooks/data/season";

type AddPlayerModalProps = {
  open: boolean;
  handleClose: () => void;
  addPlayer: (player: Player) => void;
};

type Error = {
  firstName: string;
  lastName: string;
  number: string;
};

const sanitizePlayerNumber = (num: Player["number"]) => {
  let validatedNum = num.toString().replace(/[^0-9]/g, "");
  if (validatedNum.length === 0) {
    validatedNum = "0";
  }
  if (validatedNum.length > 2) {
    validatedNum = validatedNum.slice(0, 2);
  }
  return parseInt(validatedNum);
};

export const AddPlayerModal = (props: AddPlayerModalProps) => {
  const { open, handleClose, addPlayer } = props;
  const defaultError = {
    firstName: "",
    lastName: "",
    number: "",
  };
  const defaultPlayer = {
    firstName: "",
    lastName: "",
    number: 0,
    gamesPlayed: 0,
    id: uuidv4(),
  };
  const [error, setError] = useState<Error>(defaultError);
  const [player, setPlayer] = useState<Player>(defaultPlayer);

  const validateFields = (player: Player) => {
    const newError = defaultError;
    let hasError = false;
    if (player.firstName === "") {
      hasError = true;
      newError.firstName = "First name can not be blank";
    }
    if (player.lastName === "") {
      hasError = true;
      newError.lastName = "Last name can not be blank";
    }
    if (player.number < 0) {
      hasError = true;
      newError.number = "Player number must be greater then zero.";
    }
    setError(newError);

    return !hasError;
  };

  const handleSubmit = () => {
    if (validateFields(player)) {
      // Add player then close
      setPlayer(defaultPlayer);
      addPlayer(player);
      handleClose();
    }
  };

  const handleChange = (playerProps: Partial<Player>) => {
    if ("number" in playerProps) {
      playerProps.number = sanitizePlayerNumber(playerProps.number || 0);
    }
    setError(defaultError);
    setPlayer({ ...player, ...playerProps });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <IconButton
        sx={{ position: "absolute", right: 10, top: 10 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Add Player</DialogTitle>
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
          <TextField
            error={error.firstName !== ""}
            id="player-first-name"
            label="First Name"
            variant="outlined"
            value={player.firstName}
            onChange={({ target: { value } }) => {
              handleChange({ firstName: value });
            }}
            size="small"
            InputProps={
              player.firstName !== ""
                ? {
                    endAdornment: (
                      <IconButton
                        tabIndex={-1}
                        onClick={() => setPlayer({ ...player, firstName: "" })}
                      >
                        <ClearIcon fontSize="small" color="primary" />
                      </IconButton>
                    ),
                  }
                : {}
            }
            helperText={
              error.firstName !== "" ? error.firstName : `Players first name`
            }
          />
          <TextField
            error={error.lastName !== ""}
            id="player-last-name"
            label="Last Name"
            variant="outlined"
            value={player.lastName}
            onChange={({ target: { value } }) => {
              handleChange({ lastName: value });
            }}
            size="small"
            InputProps={
              player.lastName !== ""
                ? {
                    endAdornment: (
                      <IconButton
                        tabIndex={-1}
                        onClick={() => setPlayer({ ...player, lastName: "" })}
                      >
                        <ClearIcon fontSize="small" color="primary" />
                      </IconButton>
                    ),
                  }
                : {}
            }
            helperText={
              error.lastName !== "" ? error.lastName : `Players last name`
            }
          />
          <TextField
            error={error.number !== ""}
            id="player-number"
            label="Number"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ min: 0, inputMode: "numeric", pattern: "[0-9]*" }}
            variant="outlined"
            value={player.number}
            onChange={({ target: { value } }) => {
              handleChange({ number: parseInt(value) || 0 });
            }}
            size="small"
            helperText={error.number !== "" ? error.number : `Players number`}
          />
          <div>
            <Button
              disabled={player === null}
              variant="contained"
              onClick={handleSubmit}
            >
              Add Player
            </Button>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
