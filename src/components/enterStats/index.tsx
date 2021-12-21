import { useState } from "react";
import {
  Button,
  Stack,
  Grid,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "../../hooks/snackbar";

const players = ["Noah", "Shay", "Eric", "Riley"];

const OtherTeamPoints = () => {
  const { addAlert } = useSnackbar();
  const handleClick = (message) => {
    addAlert({
      open: true,
      message: `Other team ${message}`,
    });
  };
  return (
    <>
      <Typography component="h3" align="right" sx={{ mb: 1 }}>
        Other Team
      </Typography>
      <Stack spacing={1}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick("hit a 2 pointer")}
        >
          2pt
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick("hit a 3 pointer")}
        >
          3pt
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleClick("hit a foul shot")}
        >
          1pt
        </Button>
      </Stack>
    </>
  );
};

const PlayerModal = (props) => {
  const { open, handleClose, player } = props;

  const { addAlert } = useSnackbar();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClick = (message) => {
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

const EnterPlayStats = () => {
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState("");
  const handleOpen = (player) => {
    setOpen(true);
    setPlayer(player);
  };
  const handleClose = () => {
    setOpen(false);
    setPlayer("");
  };
  return (
    <>
      <PlayerModal open={open} handleClose={handleClose} player={player} />
      <Typography component="h3" sx={{ mb: 1 }}>
        Our Players
      </Typography>
      <Stack spacing={1}>
        {players.map((player) => {
          return (
            <Button
              key={player}
              onClick={() => {
                handleOpen(player);
              }}
              variant="outlined"
              size="small"
            >
              {player}
            </Button>
          );
        })}
      </Stack>
    </>
  );
};

export const EnterStats = () => {
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <EnterPlayStats />
        </Grid>
        <Grid item xs={6}>
          <OtherTeamPoints />
        </Grid>
      </Grid>
    </>
  );
};
