import { useState } from "react";
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
import AddIcon from "@mui/icons-material/Add";
import { Link } from "wouter";
import { AddGameModal } from "../addGameModal";

export const GameList = (props: { seasonId: string }) => {
  const { seasonId } = props;
  const [open, setOpen] = useState(false);
  const addGame = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AddGameModal open={open} handleClose={handleClose} seasonId={seasonId} />
      <Box alignSelf="center" sx={{ maxWidth: "400px", margin: "0 auto" }}>
        <Typography variant="h3">Games for season {seasonId}</Typography>
        <nav>
          <List>
            <ListItem>
              <ListItemButton component="a" onClick={addGame}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Start New Game" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <Link href="/season/2021-2022/game/first">
                <ListItemButton component="a">
                  <ListItemText primary="First Game" />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
      </Box>
    </>
  );
};
