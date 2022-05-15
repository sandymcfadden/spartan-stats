import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
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
import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "../../hooks/AuthProvider";
import { useSeason, Player } from "../../hooks/data/season";
import { AddPlayerModal } from "../player/AddPlayerModal";
import { EditPlayerModal } from "../player/EditPlayerModal";

export type SeasonProps = {
  seasonId: string;
};

export const Season = (props: SeasonProps) => {
  const { seasonId } = props;
  const [teamName, setTeamName] = useState("");
  const [shortName, setShortName] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const {
    season,
    updateTeam,
    addPlayer,
    updateSeason,
    editPlayer,
    getPlayerById,
  } = useSeason(seasonId);
  const [editSeasonName, setEditSeasonName] = useState(false);
  const [editTeamName, setEditTeamName] = useState(false);
  const [editPlayerId, setEditPlayerId] = useState<Player["id"] | null>(null);
  const { isAdmin } = useAuth();

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
      updateTeam({
        name: teamName,
        short: shortName,
        players: [],
      });
    }
  };

  const sortPlayers = (a: Player, b: Player) => {
    if (a.number === b.number) {
      return 0;
    } else {
      return a.number < b.number ? -1 : 1;
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
        <Link href="/seasons">
          <Button>Back to Seasons</Button>
        </Link>
        {editSeasonName ? (
          <>
            <TextField
              id="season-name"
              size="small"
              defaultValue={season.name}
              label="Season"
              InputLabelProps={{ shrink: true }}
            />
            <IconButton
              onClick={() => {
                (
                  document.getElementById("season-name") as HTMLInputElement
                ).value = season.name;
                setEditSeasonName(false);
              }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                const value = (
                  document.getElementById("season-name") as HTMLInputElement
                )?.value;
                updateSeason({ ...season, name: value });
                setEditSeasonName(false);
              }}
            >
              <SaveIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <Typography variant="h4">
            Season {season.name}
            {isAdmin() && (
              <IconButton
                onClick={() => {
                  setEditSeasonName(true);
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Typography>
        )}
        <Divider />
        {season.team ? (
          <>
            {editTeamName ? (
              <>
                <TextField
                  id="team-name"
                  size="small"
                  defaultValue={season.team.name}
                  label="Team Name"
                  InputLabelProps={{ shrink: true }}
                />
                <IconButton
                  onClick={() => {
                    (
                      document.getElementById("team-name") as HTMLInputElement
                    ).value = season.team?.name || "";
                    setEditTeamName(false);
                  }}
                >
                  <CancelIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    const value = (
                      document.getElementById("team-name") as HTMLInputElement
                    )?.value;
                    updateTeam({
                      short: season.team?.short || "",
                      players: season.team?.players || [],
                      name: value,
                    });
                    setEditTeamName(false);
                  }}
                >
                  <SaveIcon fontSize="small" />
                </IconButton>
              </>
            ) : (
              <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                Team: {season.team.name}
                {isAdmin() && (
                  <IconButton
                    onClick={() => {
                      setEditTeamName(true);
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                )}
              </Typography>
            )}
            <Link href={`/season/${seasonId}/games`}>
              <Button variant="outlined" sx={{ width: "100%" }}>
                View Games
              </Button>
            </Link>
            <Typography variant="h6" sx={{ mt: 1 }}>
              Player List:
            </Typography>
            <List>
              {season.team.players?.sort(sortPlayers).map((player) => {
                return (
                  <ListItem key={player.number}>
                    <ListItemText
                      primary={`#${player.number} - ${player.firstName} ${player.lastName}`}
                    />
                    {isAdmin() && (
                      <IconButton
                        size="small"
                        onClick={() => {
                          setEditPlayerId(player.id);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </ListItem>
                );
              })}
              {isAdmin() && (
                <>
                  <Divider />
                  <ListItem>
                    <ListItemButton onClick={openPlayerModal}>
                      <ListItemIcon>
                        <AddIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Player" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
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
            <TextField
              error={error !== ""}
              id="short-name"
              label="Short Name"
              variant="outlined"
              value={shortName}
              onChange={({ target: { value } }) => {
                setError("");
                setShortName(value);
              }}
              size="small"
              InputProps={
                teamName !== ""
                  ? {
                      endAdornment: (
                        <IconButton
                          tabIndex={-1}
                          onClick={() => setShortName("")}
                        >
                          <ClearIcon fontSize="small" color="primary" />
                        </IconButton>
                      ),
                    }
                  : {}
              }
              helperText={error !== "" ? error : `Add short name`}
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
      {isAdmin() && editPlayerId && (
        <EditPlayerModal
          open={editPlayerId !== null}
          editPlayer={editPlayer}
          player={getPlayerById(editPlayerId)}
          handleClose={() => setEditPlayerId(null)}
        />
      )}
    </>
  );
};
