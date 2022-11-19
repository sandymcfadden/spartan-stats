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
import { addPlay, PlayTypes } from "../../hooks/data/plays";
import { Player } from "../../hooks/data/season";
import { useSnackbar } from "../../hooks/snackbar";

type PlayerModalProps = {
  open: boolean;
  handleClose: () => void;
  player: Player;
  gameId: string;
  update: (playerId?: string, stat?: StatType) => Promise<void> | undefined;
};

export const PlayerModal = (props: PlayerModalProps) => {
  const { open, handleClose, player, update, gameId } = props;

  const { addAlert } = useSnackbar();
  const handleClick = (stat: StatType, message: string) => {
    const fullMessage = `${player.firstName} ${message}`;
    let points = 0;
    let type = "action" as PlayTypes;
    switch (stat) {
      case "fgm":
        points = 2;
        type = "points";
        break;
      case "ftm":
        points = 1;
        type = "points";
        break;
      case "tpm":
        points = 3;
        type = "points";
        break;
      default:
        type = "action";
        points = 0;
    }
    addPlay({
      gameId: gameId,
      message: fullMessage,
      dateCreated: new Date().toISOString(),
      type: type,
      value: points,
      playerId: player.id,
      stat: stat,
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
            justifyContent="space-between"
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
            justifyContent="space-between"
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
            justifyContent="space-between"
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("ftm", "hit a free throw");
              }}
            >
              Hit FT
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("fta", "missed a free throw");
              }}
            >
              Miss FT
            </Button>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ pt: 1 }}
            justifyContent="space-between"
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
            justifyContent="space-between"
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
          </Stack>
          <Stack
            direction="row"
            spacing={1}
            sx={{ pt: 1 }}
            justifyContent="space-between"
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("turnovers", "turned it over");
              }}
            >
              Turnover
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("fouls", "committed a foul");
              }}
            >
              Foul
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
