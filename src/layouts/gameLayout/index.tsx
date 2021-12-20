import { Container } from "@mui/material";
import { MenuAppBar } from "../../components/menuAppBar";
import { GameScore } from "../../components/gameScore";
import { GameTabs } from "../../components/gameTabs";

export const GameLayout = () => {
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
