import {
  Button,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "../../hooks/snackbar";

type PlayerModalProps = {
  open: boolean;
  handleClose: () => void;
  player: string;
};

export const PlayerModal = (props: PlayerModalProps) => {
  const { open, handleClose, player } = props;

  const { addAlert } = useSnackbar();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClick = (message: string) => {
    addAlert({
      open: true,
      message: `${player} ${message}`,
    });
    handleClose();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullScreen={fullScreen}>
        <IconButton
          sx={{ position: "absolute", right: 10, top: 10 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>{player}</DialogTitle>
        <DialogContent>
          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("hit a 2 pointer");
              }}
            >
              Hit 2pt
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("missed a 2 pointer");
              }}
            >
              Miss 2pt
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("hit a 3 pointer");
              }}
            >
              Hit 3pt
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("missed a 3 pointer");
              }}
            >
              Miss 3pt
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("hit a foul shot");
              }}
            >
              Hit Foul
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("missed a foul shot");
              }}
            >
              Miss Foul
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("with an assist");
              }}
            >
              Assist
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("grabbed a rebound");
              }}
            >
              Rebound
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("with a steal");
              }}
            >
              Steal
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("said get that garbage outta here");
              }}
            >
              Block
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClick("turned it over");
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
