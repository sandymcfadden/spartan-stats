import { Container } from "@mui/material";
import { Game, GameProps } from "../../components/game/";
import { MenuAppBar } from "../../components/menuAppBar";

export const GameView = ({ seasonId, gameId }: GameProps) => {
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Game seasonId={seasonId} gameId={gameId} />
      </Container>
    </>
  );
};
