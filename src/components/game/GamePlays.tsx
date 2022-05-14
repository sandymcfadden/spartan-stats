import { Box, Typography, List, ListItem } from "@mui/material";
import { usePlays } from "../../hooks/data/plays";

export const GamePlays = (props: { gameId: string }) => {
  const { gameId } = props;
  const { plays } = usePlays(gameId);

  return (
    <Box alignSelf="center" sx={{ maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h3">Play by Play</Typography>
      <List>
        {plays.map((play) => {
          return (
            <ListItem key={play.id}>
              {play.message} -{" "}
              {new Date(play.dateCreated).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
