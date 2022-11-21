import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useGame } from "../../hooks/data/game";

export const GameNotes = (props: { gameId: string }) => {
  const { gameId } = props;
  const { updateNotes, game } = useGame(gameId);
  const { canAddStats } = useAuth();
  const [notes, setNotes] = useState(game.notes || "");

  useEffect(() => {
    setNotes(game.notes || "");
  }, [game]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  return (
    <Box
      component="form"
      alignSelf="center"
      textAlign="right"
      sx={{ maxWidth: "600px", margin: "0 auto" }}
      noValidate
      autoComplete="off"
    >
      <Typography sx={{ textAlign: "left" }} variant="h5">
        Notes
      </Typography>
      {canAddStats() && (
        <>
          <TextField
            sx={{ width: "100%", mb: 1 }}
            id="game-notes"
            label="Add game notes:"
            multiline
            rows={4}
            variant="filled"
            value={notes}
            onChange={handleChange}
          />
          <Button
            onClick={() => {
              updateNotes(notes);
            }}
          >
            Save
          </Button>
        </>
      )}
      {!canAddStats() && (
        <pre style={{ textAlign: "left", fontFamily: "inherit" }}>{notes}</pre>
      )}
    </Box>
  );
};
