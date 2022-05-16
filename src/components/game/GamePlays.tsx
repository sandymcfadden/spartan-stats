import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Looks3Icon from "@mui/icons-material/Looks3";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
  TimelineContent,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { usePlays, Play } from "../../hooks/data/plays";

export const GamePlays = (props: { gameId: string }) => {
  const { gameId } = props;
  const { plays } = usePlays(gameId);

  const getIcon = (play: Play) => {
    if (play.value === 1) {
      return <LooksOneIcon />;
    }
    if (play.value === 2) {
      return <LooksTwoIcon />;
    }
    if (play.value === 3) {
      return <Looks3Icon />;
    }
    if (play.message.includes("turned it over")) {
      return <CompareArrowsIcon />;
    }
    if (play.message.includes("missed")) {
      return <RemoveCircleOutlineOutlinedIcon />;
    }

    return <SportsBasketballIcon />;
  };

  const getItemContent = (play: Play) => {
    const playTime = new Date(play.dateCreated).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    if (play.type !== "theirs") {
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
          </TimelineContent>
        </TimelineItem>
      );
    } else {
      return (
        <TimelineItem key={play.id}>
          <TimelineOppositeContent
            sx={{ m: "auto 0" }}
            align="left"
            variant="body2"
            color="text.secondary"
          >
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
    }
  };

  return (
    <Box alignSelf="center" sx={{ maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h5">Play by Play</Typography>
      <Timeline>
        {plays.map((play) => {
          return getItemContent(play);
        })}
      </Timeline>
    </Box>
  );
};
