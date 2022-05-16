import AddIcon from "@mui/icons-material/Add";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Stack,
  ListItemAvatar,
  Avatar,
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
        <Stack direction="row" justifyContent="space-between">
          <Link href={`/seasons`}>
            <Button>Back to Seasons</Button>
          </Link>
          <Link href={`/season/details/${seasonId}`}>
            <Button>Season Details</Button>
          </Link>
        </Stack>
        <Typography variant="h5">Games for season {season.name}</Typography>
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
              const gameEnded =
                game.gameEndDate && game.gameEndDate < new Date().toISOString();
              const winOrLoss = gameEnded
                ? game.ourPoints.total > game.theirPoints.total
                  ? "W"
                  : "L"
                : "";
              const score = gameEnded
                ? `${winOrLoss}: ${game.ourPoints.total} - ${game.theirPoints.total}`
                : "";
              return (
                <ListItem key={game.id} secondaryAction={score} disablePadding>
                  <Link href={`/season/${seasonId}/game/${game.id}`}>
                    <ListItemButton component="a">
                      <ListItemAvatar>
                        <Avatar>
                          {winOrLoss === "W" && <SentimentSatisfiedAltIcon />}
                          {winOrLoss === "L" && (
                            <SentimentVeryDissatisfiedIcon />
                          )}
                          {winOrLoss === "" && <SentimentNeutralIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={game.opponentName}
                        secondary={
                          <>
                            {new Date(game.gameDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )}
                          </>
                        }
                      ></ListItemText>
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
