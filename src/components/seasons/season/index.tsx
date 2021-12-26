import { Box, Typography } from "@mui/material";
type SeasonProps = {
  seasonId: string;
};
export const Season = (props: SeasonProps) => {
  const { seasonId } = props;
  return (
    <>
      <Box alignSelf="center" sx={{ maxWidth: "400px", margin: "0 auto" }}>
        <Typography variant="h4">Season {seasonId}</Typography>
      </Box>
    </>
  );
};
