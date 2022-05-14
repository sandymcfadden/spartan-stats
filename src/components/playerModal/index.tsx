import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { StatType } from "../../hooks/data/game";
import { addPlay } from "../../hooks/data/plays";
import { Player } from "../../hooks/data/season";
import { useSnackbar } from "../../hooks/snackbar";

type PlayerModalProps = {
  open: boolean;
  handleClose: () => void;
  player: Player;
  gameId: string;
  update: (playerId: string, stat: StatType) => Promise<void>;
};

export const PlayerModal = (props: PlayerModalProps) => {
  const { open, handleClose, player, update, gameId } = props;

  const { addAlert } = useSnackbar();
  const handleClick = (stat: StatType, message: string) => {
    const fullMessage = `${player.firstName} ${message}`;
    let points = 0;
    switch (stat) {
      case "fgm":
        points = 2;
        break;
      case "ftm":
        points = 1;
        break;
      case "tpm":
        points = 3;
        break;
      default:
        points = 0;
    }
    addPlay({
      gameId: gameId,
      message: fullMessage,
      dateCreated: new Date().toISOString(),
      type: "action",
      value: points,
    });
    update(player.id, stat);
    addAlert({
      message: fullMessage,
    });
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <IconButton
          sx={{ position: "absolute", right: 10, top: 10 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>{player.firstName}</DialogTitle>
        <DialogContent>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={1}
            sx={{ pt: 1 }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("fgm", "hit a 2 pointer");
              }}
            >
              Hit 2pt
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("fga", "missed a 2 pointer");
              }}
            >
              Miss 2pt
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ pt: 1 }}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("tpm", "hit a 3 pointer");
              }}
            >
              Hit 3pt
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("tpa", "missed a 3 pointer");
              }}
            >
              Miss 3pt
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ pt: 1 }}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("ftm", "hit a foul shot");
              }}
            >
              Hit Foul
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("fta", "missed a foul shot");
              }}
            >
              Miss Foul
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ pt: 1 }}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("assists", "with an assist");
              }}
            >
              Assist
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("rebounds", "grabbed a rebound");
              }}
            >
              Rebound
            </Button>
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ pt: 1 }}
            justifyContent="center"
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("steals", "with a steal");
              }}
            >
              Steal
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("blocks", "said get that garbage outta here");
              }}
            >
              Block
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("turnovers", "turned it over");
              }}
            >
              Turnover
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
