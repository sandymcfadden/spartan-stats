import { Container } from "@mui/material";
import { MenuAppBar } from "../../components/menuAppBar";
import { Season, SeasonProps } from "../../components/seasons/season";

export const SeasonView = (props: SeasonProps) => {
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Season seasonId={props.seasonId} />
      </Container>
    </>
  );
};
