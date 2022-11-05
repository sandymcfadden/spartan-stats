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
import { useAuth } from "../../hooks/AuthProvider";
import { useSeasons, Season } from "../../hooks/data/season";
import { AddSeasonModal } from "./AddSeasonModal";

export const SeasonList = () => {
  const [open, setOpen] = useState(false);
  const addSeason = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { seasons } = useSeasons();
  const { isAdmin } = useAuth();

  const sortSeason = (a: Season, b: Season) => {
    if (a.dateCreated === b.dateCreated) {
      return 0;
    } else {
      return a.dateCreated < b.dateCreated ? 1 : -1;
    }
  };

  return (
    <>
      <AddSeasonModal open={open} handleClose={handleClose} />
      <Box alignSelf="center" sx={{ maxWidth: "400px", margin: "0 auto" }}>
        <Typography variant="h5">Seasons</Typography>
        <nav>
          <List>
            {isAdmin() && (
              <>
                <ListItem>
                  <ListItemButton component="a" onClick={addSeason}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add New Season" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )}
            {seasons.sort(sortSeason).map((season: Season) => {
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
            {seasons.length === 0 && (
              <ListItem>
                <ListItemButton component="div">
                  <ListItemText primary="No seasons added yet" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </nav>
      </Box>
    </>
  );
};
