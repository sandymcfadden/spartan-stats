import { Container } from "@mui/material";
import { Redirect } from "wouter";
import { MenuAppBar } from "../../components/menuAppBar";
import { useGames } from "../../hooks/data/game";
import { useSeasons } from "../../hooks/data/season";

export const Home = () => {
  const { seasons } = useSeasons();
  const { games } = useGames();
  console.log(games);

  return (
    <>
      {games.length > 0 && (
        <Redirect to={`/season/${games[0].seasonId}/game/${games[0].id}`} />
      )}
      {/*seasons.length > 0 && <Redirect to={`/season/${seasons[0].id}`} />*/}
      {/*seasons.length <= 0 && <Redirect to="/seasons" />*/}
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <h1>Loading...</h1>
      </Container>
    </>
  );
};
