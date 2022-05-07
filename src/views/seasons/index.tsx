import { Container } from "@mui/material";
import { MenuAppBar } from "../../components/menuAppBar";
import { SeasonList } from "../../components/seasons/SeasonList";

export const Seasons = () => {
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <SeasonList />
      </Container>
    </>
  );
};
