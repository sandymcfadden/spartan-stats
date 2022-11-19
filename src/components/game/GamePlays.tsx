import CloseIcon from "@mui/icons-material/Close";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import SportsIcon from "@mui/icons-material/Sports";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import { Box, Typography, Avatar, IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import { useAuth } from "../../hooks/AuthProvider";
import { useGame } from "../../hooks/data/game";
import { usePlays, Play } from "../../hooks/data/plays";

export const GamePlays = (props: { gameId: string }) => {
  const { gameId } = props;
  const { plays } = usePlays(gameId);
  const { deletePlay, isGameEnded } = useGame(gameId);
  const { canAddStats } = useAuth();
  const theme = useTheme();

  const PointsIcon = ({ points }: { points: number }) => {
    return (
      <Avatar
        sx={{
          width: 24,
          height: 24,
          fontSize: 12,
          backgroundColor: theme.palette.primary.main,
        }}
      >
        +{points}
      </Avatar>
    );
  };

  const getIcon = (play: Play) => {
    if (play.value === 1) {
      return <PointsIcon points={1} />;
    }
    if (play.value === 2) {
      return <PointsIcon points={2} />;
    }
    if (play.value === 3) {
      return <PointsIcon points={3} />;
    }
    if (play.message.includes("turned it over")) {
      return <CompareArrowsIcon sx={{ color: theme.palette.primary.main }} />;
    }
    if (play.message.includes("committed a foul")) {
      return <SportsIcon />;
    }
    if (play.type === "gameEnd") {
      return <SportsScoreIcon />;
    }
    if (play.message.includes("missed")) {
      return (
        <RemoveCircleOutlineOutlinedIcon
          sx={{ color: theme.palette.primary.main }}
        />
      );
    }

    return <SportsBasketballIcon sx={{ color: theme.palette.primary.main }} />;
  };

  const getItemContent = (play: Play) => {
    const playTime = new Date(play.dateCreated).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    const DeleteButton = ({ handleClick }: { handleClick: () => void }) => {
      return (
        <IconButton
          size="small"
          sx={{ display: "none", mx: 1, pb: 0 }}
          onClick={handleClick}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      );
    };

    if (play.type === "theirs" || play.type === "foul") {
      return (
        <TimelineItem key={play.id}>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="left"
            variant="body2"
            color="text.secondary"
          >
            {canAddStats() && !isGameEnded() && (
              <DeleteButton
                handleClick={() => {
                  deletePlay(play);
                }}
              />
            )}
            {playTime}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "transparent" }}>
              {getIcon(play)}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "22px", px: 2 }}>
            <Typography>{play.message}</Typography>
          </TimelineContent>
        </TimelineItem>
      );
    } else {
      return (
        <TimelineItem key={play.id}>
          <TimelineOppositeContent sx={{ py: "22px", px: 2 }}>
            <Typography>{play.message}</Typography>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot sx={{ backgroundColor: "transparent" }}>
              {getIcon(play)}
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent
            sx={{ m: "auto 0" }}
            align="left"
            variant="body2"
            color="text.secondary"
          >
            {playTime}
            {canAddStats() && !isGameEnded() && (
              <DeleteButton
                handleClick={() => {
                  deletePlay(play);
                }}
              />
            )}
          </TimelineContent>
        </TimelineItem>
      );
    }
  };

  return (
    <Box alignSelf="center" sx={{ maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h5">Play by Play</Typography>
      <Timeline
        sx={{
          "li:hover button, li:focus button": { display: "inline" },
          "li div": { lineHeight: "40px" },
        }}
      >
        {plays.map((play) => {
          return getItemContent(play);
        })}
      </Timeline>
    </Box>
  );
};
