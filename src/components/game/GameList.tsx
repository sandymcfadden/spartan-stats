import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "../../hooks/AuthProvider";
import {
  useGamesBySeason,
  addGame,
  deleteGame as deleteTheGame,
} from "../../hooks/data/game";
import { useSeason } from "../../hooks/data/season";
import { Confirm } from "../Confirm";
import { AddGameModal } from "./AddGameModal";
import { EditGameModal } from "./EditGameModal";

export const GameList = (props: { seasonId: string }) => {
  const { seasonId } = props;
  const { season } = useSeason(seasonId);
  const { games } = useGamesBySeason(seasonId);
  const theme = useTheme();
  const { canAddStats } = useAuth();

  const [open, setOpen] = useState(false);
  const [editGame, setEditGame] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirm, setConfirm] = useState(false);
  const [deleteGame, setDeleteGame] = useState<string | null>(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setEditGame(null);
    setEdit(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };
  const confirmDeleteGame = () => {
    if (deleteGame) {
      deleteTheGame(deleteGame);
    }
    setConfirm(false);
    handleMenuClose();
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
      {edit && editGame && (
        <EditGameModal
          open={edit}
          handleClose={handleCloseEdit}
          gameId={editGame}
        />
      )}
      {confirm && canAddStats() && (
        <Confirm
          open={confirm}
          handleClose={() => setConfirm(false)}
          title="Confirm Delete Game"
          message="Are you sure you want to delete this game? This can't be undone."
          action={confirmDeleteGame}
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
            {canAddStats() && (
              <>
                <ListItem>
                  <ListItemButton component="a" onClick={() => setOpen(true)}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Start New Game" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            )}

            {games.map((game) => {
              const gameEnded =
                game.gameEndDate && game.gameEndDate < new Date().toISOString();
              const winOrLoss = gameEnded
                ? game.ourPoints.total > game.theirPoints.total
                  ? "W"
                  : game.ourPoints.total > game.theirPoints.total
                  ? "L"
                  : "T"
                : "";
              const score = gameEnded
                ? `${winOrLoss}: ${game.ourPoints.total} - ${game.theirPoints.total}`
                : "";
              const secondaryAction = (
                <>
                  {score}
                  {canAddStats() && (
                    <>
                      <IconButton
                        sx={{ ml: "8px" }}
                        onClick={(event: React.MouseEvent<HTMLElement>) => {
                          setOpenMenu(game.id || null);
                          setAnchorEl(event.currentTarget);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        open={openMenu === game.id}
                        onClose={handleMenuClose}
                        anchorEl={anchorEl}
                      >
                        <MenuItem
                          onClick={() => {
                            setEditGame(game.id || "");
                            setEdit(true);
                            setOpenMenu(null);
                          }}
                          sx={{ fontSize: "small" }}
                        >
                          <EditIcon fontSize="small" sx={{ mr: "8px" }} />
                          Edit
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: "small" }}
                          onClick={() => {
                            setConfirm(true);
                            setDeleteGame(game.id || null);
                            setOpenMenu(null);
                          }}
                        >
                          <DeleteIcon fontSize="small" sx={{ mr: "8px" }} />
                          Delete
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </>
              );
              return (
                <ListItem
                  key={game.id}
                  secondaryAction={secondaryAction}
                  disablePadding
                >
                  <Link href={`/season/${seasonId}/game/${game.id}`}>
                    <ListItemButton component="a">
                      <ListItemAvatar>
                        <Avatar
                          sx={{ backgroundColor: theme.palette.primary.main }}
                        >
                          {winOrLoss === "W" && <SentimentSatisfiedAltIcon />}
                          {winOrLoss === "L" && (
                            <SentimentVeryDissatisfiedIcon />
                          )}
                          {(winOrLoss === "" || winOrLoss === "T") && (
                            <SentimentNeutralIcon />
                          )}
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
