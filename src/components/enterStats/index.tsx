import { Button, Stack, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { OpponentPoints } from "../opponentPoints";
import { PlayerModal } from "../playerModal";

const players = ["Noah", "Shay", "Eric", "Riley"];

const EnterPlayStats = () => {
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState("");
  const handleOpen = (player: string) => {
    setOpen(true);
    setPlayer(player);
  };
  const handleClose = () => {
    setOpen(false);
    setPlayer("");
  };
  return (
    <>
      <PlayerModal open={open} handleClose={handleClose} player={player} />
      <Typography component="h3" sx={{ mb: 1 }}>
        Our Players
      </Typography>
      <Stack spacing={1}>
        {players.map((player) => {
          return (
            <Button
              key={player}
              onClick={() => {
                handleOpen(player);
              }}
              variant="outlined"
              size="small"
            >
              {player}
            </Button>
          );
        })}
      </Stack>
    </>
  );
};

export const EnterStats = () => {
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <EnterPlayStats />
        </Grid>
        <Grid item xs={6}>
          <OpponentPoints />
        </Grid>
      </Grid>
    </>
  );
};
