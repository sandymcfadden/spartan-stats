import { Button, Stack, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useGame } from "../../hooks/data/game";
import { Player, useSeason } from "../../hooks/data/season";
import { PlayerModal } from "../playerModal";
import { OpponentPoints } from "./OpponentPoints";
import { GameProps } from ".";

export const EnterGameStats = ({ gameId, seasonId }: GameProps) => {
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const { season } = useSeason(seasonId);
  const { updatePlayerStats, game } = useGame(gameId);

  const handleOpen = (player: Player) => {
    setOpen(true);
    setPlayer(player);
  };
  const handleClose = () => {
    setOpen(false);
    setPlayer(null);
  };

  const players = season.team?.players.filter(
    (player) => game.players.includes(player.id) || []
  );

  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          {player && (
            <PlayerModal
              open={open}
              handleClose={handleClose}
              player={player}
              update={updatePlayerStats}
            />
          )}

          <Typography component="h3" sx={{ mb: 1 }}>
            {season.team?.name}
          </Typography>
          <Stack spacing={1}>
            {players?.map((player) => {
              return (
                <Button
                  key={player.number}
                  onClick={() => {
                    handleOpen(player);
                  }}
                  variant="outlined"
                  size="small"
                >
                  {`#${player.number} ${player.firstName}`}
                </Button>
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <OpponentPoints gameId={gameId} />
        </Grid>
      </Grid>
    </>
  );
};
