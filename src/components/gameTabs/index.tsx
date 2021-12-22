import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PlayerStats } from "../../components/playerStats";
import { EnterStats } from "../../components/enterStats";

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

export const GameTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          <Tab label="Enter Stats" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <PlayerStats />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Play by Play
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EnterStats />
      </TabPanel>
    </Box>
  );
};
