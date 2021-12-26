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
import { AddSeasonModal } from "../addSeasonModal";

export const SeasonList = () => {
  const [open, setOpen] = useState(false);
  const addSeason = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AddSeasonModal open={open} handleClose={handleClose} />
      <Box alignSelf="center" sx={{ maxWidth: "400px", margin: "0 auto" }}>
        <Typography variant="h3">Manage Seasons</Typography>
        <nav>
          <List>
            <ListItem>
              <ListItemButton component="a" onClick={addSeason}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add New Season" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <Link href="/season/2021-2022">
                <ListItemButton component="a">
                  <ListItemText primary="2021 - 2022 Season" />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
      </Box>
    </>
  );
};
