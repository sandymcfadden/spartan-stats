import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Container } from "@mui/material";
import { GameList } from "../../components/game/gameList";
import { MenuAppBar } from "../../components/menuAppBar";

export const Games = (props: { seasonId: string }) => {
  const { seasonId } = props;
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <GameList seasonId={seasonId} />
        </LocalizationProvider>
      </Container>
    </>
  );
};
