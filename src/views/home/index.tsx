import { Container } from "@mui/material";
import { Redirect } from "wouter";
import { ErrorBoundary } from "../../components/ErrorBoundary";
import { MenuAppBar } from "../../components/menuAppBar";
import { useSeasons } from "../../hooks/data/season";

export const Home = () => {
  const { seasons, isLoading } = useSeasons();

  const seasonId = seasons.length > 0 ? seasons[0].id || "" : "";

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <ErrorBoundary>
          {seasonId && <Redirect to={`/season/${seasonId}`} />}
          {!seasonId && <Redirect to="/seasons" />}
        </ErrorBoundary>
      </Container>
    </>
  );
};
