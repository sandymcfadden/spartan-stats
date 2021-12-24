import { Container } from "@mui/material";
import { MenuAppBar } from "../../components/menuAppBar";
import { SeasonList } from "../../components/seasonList";

export const SeasonsLayout = () => {
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <SeasonList />
      </Container>
    </>
  );
};
