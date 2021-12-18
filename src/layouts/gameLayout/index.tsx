import { Container } from "@mui/material";
import { MenuAppBar } from "../../components/menuAppBar";
import { GameScore } from "../../components/gameScore";

export const GameLayout = () => {
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <GameScore />
      </Container>
    </>
  );
};
