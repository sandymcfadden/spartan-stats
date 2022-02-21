import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  ListItemButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { AddPlayerModal } from "../../addPlayerModal";
import { Link } from "wouter";
import { getSeason, Season as SeasonType } from "../../../data/season";

export type SeasonProps = {
  seasonId: string;
};

type Team = {
  name: string;
  players: Player[];
};

export type Player = {
  firstName: string;
  lastName: string;
  number: number;
};

export const Season = (props: SeasonProps) => {
  const { seasonId } = props;
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState("");
  const [team, setTeam] = useState<Team | null>(null);
  const [open, setOpen] = useState(false);
  const [season, setSeason] = useState<SeasonType>({
    name: "",
    dateCreated: "",
  });

  useEffect(() => {
    getSeason(seasonId).then((result) => setSeason(result as SeasonType));
  }, [seasonId]);

  const addPlayer = (player: Player) => {
    if (team !== null) {
      setTeam({
        name: team.name,
        players: [...team.players, player],
      });
    }
  };

  const openPlayerModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (teamName === "") {
      setError("Team must have a name");
    } else {
      setTeam({ name: teamName, players: [] });
    }
  };

  return (
    <>
      <AddPlayerModal
        open={open}
        handleClose={handleClose}
        addPlayer={addPlayer}
      />
      <Box alignSelf="center" sx={{ maxWidth: "400px", margin: "0 auto" }}>
        <Typography variant="h4">Season {season.name}</Typography>
        <Divider />
        {team ? (
          <>
            <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
              Team: {team.name}
            </Typography>
            <Link href={`/season/${seasonId}/games`}>
              <Button variant="outlined">View Games</Button>
            </Link>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Player List:
            </Typography>
            <List>
              {team.players.map((player) => {
                return (
                  <ListItem key={player.number}>
                    <ListItemText
                      primary={`#${player.number} - ${player.firstName} ${player.lastName}`}
                    />
                  </ListItem>
                );
              })}
              <Divider />
              <ListItem>
                <ListItemButton onClick={openPlayerModal}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Player" />
                </ListItemButton>
              </ListItem>
            </List>
          </>
        ) : (
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
            <Typography variant="h5">Add Team</Typography>
            <TextField
              error={error !== ""}
              id="team-name"
              label="Team Name"
              variant="outlined"
              value={teamName}
              onChange={({ target: { value } }) => {
                setError("");
                setTeamName(value);
              }}
              size="small"
              InputProps={
                teamName !== ""
                  ? {
                      endAdornment: (
                        <IconButton
                          tabIndex={-1}
                          onClick={() => setTeamName("")}
                        >
                          <ClearIcon fontSize="small" color="primary" />
                        </IconButton>
                      ),
                    }
                  : {}
              }
              helperText={error !== "" ? error : `Add team name`}
            />
            <div>
              <Button
                disabled={teamName === ""}
                variant="contained"
                onClick={handleSubmit}
              >
                Add Team
              </Button>
            </div>
          </Box>
        )}
      </Box>
    </>
  );
};
