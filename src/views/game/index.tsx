import { Container } from "@mui/material";
import { MenuAppBar } from "../../components/menuAppBar";
import { Game, GameProps } from "../../components/game/";

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
