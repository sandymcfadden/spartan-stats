import { Container } from "@mui/material";
import { Game } from "../../components/game";
import { MenuAppBar } from "../../components/menuAppBar";
import { Season } from "../../components/seasons/Season";
import { SeasonList } from "../../components/seasons/SeasonList";
import { useGames } from "../../hooks/data/game";
import { useSeasons } from "../../hooks/data/season";

export const Home = () => {
  const { seasons } = useSeasons();
  const { games } = useGames();

  const seasonId =
    games.length > 0
      ? games[0].seasonId
      : seasons.length > 0
      ? seasons[0].id || ""
      : "";

  const gameId = games.length > 0 ? games[0].id || "" : "";

  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {gameId && <Game seasonId={seasonId} gameId={gameId} />}
        {!gameId && seasonId && <Season seasonId={seasonId} />}
        {!gameId && !seasonId && <SeasonList />}
      </Container>
    </>
  );
};
