import { Container } from "@mui/material";
import { MenuAppBar } from "../../components/menuAppBar";
import { Season } from "../../components/seasons/season";

type SeasonProps = {
  seasonId: string;
};

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
