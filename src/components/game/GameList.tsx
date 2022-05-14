import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Link } from "wouter";
import { useGamesBySeason, addGame } from "../../hooks/data/game";
import { useSeason } from "../../hooks/data/season";
import { AddGameModal } from "./AddGameModal";

export const GameList = (props: { seasonId: string }) => {
  const { seasonId } = props;
  const { season } = useSeason(seasonId);
  const { games } = useGamesBySeason(seasonId);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {open && (
        <AddGameModal
          open={open}
          handleClose={handleClose}
          seasonId={seasonId}
          addGame={addGame}
        />
      )}
      <Box alignSelf="center" sx={{ maxWidth: "400px", margin: "0 auto" }}>
        <Typography variant="h3">Games for season {season.name}</Typography>
        <nav>
          <List>
            <ListItem>
              <ListItemButton component="a" onClick={() => setOpen(true)}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Start New Game" />
              </ListItemButton>
            </ListItem>
            <Divider />

            {games.map((game) => {
              return (
                <ListItem key={game.id}>
                  <Link href={`/season/${seasonId}/game/${game.id}`}>
                    <ListItemButton component="a">
                      <ListItemText
                        primary={`${game.opponentName} - ${new Date(
                          game.gameDate
                        ).toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}`}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              );
            })}
          </List>
        </nav>
      </Box>
    </>
  );
};
