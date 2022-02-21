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
import { useSeasons, Season } from "../../../hooks/data/season";

export const SeasonList = () => {
  const [open, setOpen] = useState(false);
  const addSeason = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { seasons } = useSeasons();

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
            {seasons.map((season: Season) => {
              return (
                <ListItem key={season.id}>
                  <Link href={`/season/${season.id}`}>
                    <ListItemButton component="a">
                      <ListItemText primary={`${season.name} Season`} />
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
