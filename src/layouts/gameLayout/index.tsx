import { Container } from "@mui/material";
import { MenuAppBar } from "../../components/menuAppBar";
import { GameScore } from "../../components/gameScore";
import { PlayerStats } from "../../components/playerStats";

export const GameLayout = () => {
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <GameScore />
        <PlayerStats />
      </Container>
    </>
  );
};
