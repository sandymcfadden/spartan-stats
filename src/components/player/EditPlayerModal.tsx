import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Player } from "../../hooks/data/season";

type EditPlayerModalProps = {
  open: boolean;
  handleClose: () => void;
  editPlayer: (id: Player["id"], newPlayer: Player) => void;
  player: Player;
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

export const EditPlayerModal = (props: EditPlayerModalProps) => {
  const { open, handleClose, editPlayer, player } = props;
  const defaultError = {
    firstName: "",
    lastName: "",
    number: "",
  };
  const [error, setError] = useState<Error>(defaultError);
  const [newPlayer, setNewPlayer] = useState<Player>(player);

  const validateFields = (newPlayer: Player) => {
    const newError = defaultError;
    let hasError = false;
    if (newPlayer.firstName === "") {
      hasError = true;
      newError.firstName = "First name can not be blank";
    }
    if (newPlayer.lastName === "") {
      hasError = true;
      newError.lastName = "Last name can not be blank";
    }
    if (newPlayer.number < 0) {
      hasError = true;
      newError.number = "Player number must be greater then zero.";
    }
    setError(newError);

    return !hasError;
  };

  const handleSubmit = () => {
    if (validateFields(newPlayer)) {
      // Add Player then close
      setNewPlayer(player);
      editPlayer(player.id, newPlayer);
      handleClose();
    }
  };

  const handleChange = (playerProps: Partial<Player>) => {
    if ("number" in playerProps) {
      playerProps.number = sanitizePlayerNumber(playerProps.number || 0);
    }
    setError(defaultError);
    setNewPlayer({ ...newPlayer, ...playerProps });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <IconButton
        sx={{ position: "absolute", right: 10, top: 10 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Edit Player</DialogTitle>
      <DialogContent sx={{ minWidth: "300px" }}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            "& > div.actions": { width: "100%" },
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
            value={newPlayer.firstName}
            onChange={({ target: { value } }) => {
              handleChange({ firstName: value });
            }}
            size="small"
            InputProps={
              newPlayer.firstName !== ""
                ? {
                    endAdornment: (
                      <IconButton
                        tabIndex={-1}
                        onClick={() =>
                          setNewPlayer({ ...newPlayer, firstName: "" })
                        }
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
            id="newPlayer-last-name"
            label="Last Name"
            variant="outlined"
            value={newPlayer.lastName}
            onChange={({ target: { value } }) => {
              handleChange({ lastName: value });
            }}
            size="small"
            InputProps={
              newPlayer.lastName !== ""
                ? {
                    endAdornment: (
                      <IconButton
                        tabIndex={-1}
                        onClick={() =>
                          setNewPlayer({ ...newPlayer, lastName: "" })
                        }
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
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            className="actions"
          >
            <Button
              disabled={newPlayer === null}
              onClick={() => {
                setNewPlayer(player);
                handleClose();
              }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              disabled={newPlayer === null}
              variant="contained"
              onClick={handleSubmit}
            >
              Edit Player
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
