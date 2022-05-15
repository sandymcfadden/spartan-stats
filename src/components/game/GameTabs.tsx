import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { useGame } from "../../hooks/data/game";
import { EnterGameStats } from "./EnterGameStats";
import { GamePlays } from "./GamePlays";
import { GameStats } from "./GameStats";
import { GameProps } from ".";

type TabPanelProps = {
  children?: React.ReactNode;
  value: number;
  index: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const GameTabs = ({ gameId, seasonId }: GameProps) => {
  const [value, setValue] = useState(0);
  const { canAddStats } = useAuth();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { isGameEnded } = useGame(gameId);

  if (value === 2 && isGameEnded()) {
    setValue(0);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="Game Tabs"
        >
          <Tab label="Box Score" {...a11yProps(0)} />
          <Tab label="Play by Play" {...a11yProps(1)} />
          {canAddStats() && !isGameEnded() && (
            <Tab label="Enter Stats" {...a11yProps(2)} />
          )}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <GameStats gameId={gameId} seasonId={seasonId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GamePlays gameId={gameId} />
      </TabPanel>
      {canAddStats() && !isGameEnded() && (
        <TabPanel value={value} index={2}>
          <EnterGameStats gameId={gameId} seasonId={seasonId} />
        </TabPanel>
      )}
    </Box>
  );
};
