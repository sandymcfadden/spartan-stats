import { Container } from "@mui/material";
import { GameScore } from "../../components/game/gameScore";
import { GameTabs } from "../../components/game/gameTabs";
import { MenuAppBar } from "../../components/menuAppBar";

export const Home = () => {
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <GameScore />
        <GameTabs />
      </Container>
    </>
  );
};
