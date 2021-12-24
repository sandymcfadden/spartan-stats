import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";

type AddSeasonModalProps = {
  open: boolean;
  handleClose: () => void;
};

type Error = {
  isError: boolean;
  message: string;
};

export const AddSeasonModal = (props: AddSeasonModalProps) => {
  const { open, handleClose } = props;
  const defaultError = { isError: false, message: "" };
  const [error, setError] = useState<Error>(defaultError);
  const [season, setSeason] = useState("");

  const currentYear = new Date().getFullYear();

  const handleSubmit = () => {
    if (season !== "") {
      // Add season then close
      setSeason("");
      handleClose();
    } else {
      setError({ isError: true, message: `Must not be blank` });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(defaultError);
    setSeason(event.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <IconButton
        sx={{ position: "absolute", right: 10, top: 10 }}
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>Add Season</DialogTitle>
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
            error={error.isError}
            id="season-name"
            label="Season Name"
            variant="outlined"
            value={season}
            onChange={handleChange}
            size="small"
            InputProps={
              season !== ""
                ? {
                    endAdornment: (
                      <IconButton onClick={() => setSeason("")}>
                        <ClearIcon fontSize="small" color="primary" />
                      </IconButton>
                    ),
                  }
                : {}
            }
            helperText={
              error.isError
                ? error.message
                : `Suggested Format: "${currentYear} - ${currentYear + 1}"`
            }
          />
          <div>
            <Button variant="contained" onClick={handleSubmit}>
              Add Season
            </Button>
          </div>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
