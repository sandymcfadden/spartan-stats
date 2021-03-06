import { Box, TableFooter } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import "./gameStats.css";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import { useState } from "react";
import { StatType, Stats, useGame } from "../../hooks/data/game";
import { useSeason } from "../../hooks/data/season";
import { GameProps } from ".";

type EnhancedTableProps = {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
};

type Order = "asc" | "desc";

type Data = {
  player: string;
  num: number;
  points: number;
  fg: string;
  fgp: number | "--";
  tp: string;
  tpp: number | "--";
  ft: string;
  ftp: number | "--";
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
};

function createData(
  player: string,
  num: number,
  points: number,
  fg: string,
  fgp: number | "--",
  tp: string,
  tpp: number | "--",
  ft: string,
  ftp: number | "--",
  rebounds: number,
  assists: number,
  steals: number,
  blocks: number,
  turnovers: number,
  fouls: number
): Data {
  return {
    player,
    num,
    points,
    fg,
    fgp,
    tp,
    tpp,
    ft,
    ftp,
    rebounds,
    assists,
    steals,
    blocks,
    turnovers,
    fouls,
  };
}

type HeaderCell = {
  id: keyof Data;
  label: string;
  description?: string;
};

const headCells: HeaderCell[] = [
  {
    id: "player",
    label: "Player",
  },
  {
    id: "num",
    label: "#",
  },
  {
    id: "points",
    label: "PTS",
  },
  {
    id: "fg",
    label: "FG",
    description: "Field Goals",
  },
  {
    id: "fgp",
    label: "FG%",
    description: "Field Goals Percentage",
  },
  {
    id: "tp",
    label: "3PT",
    description: "3 Pointers",
  },
  {
    id: "tpp",
    label: "3PT%",
    description: "3 Pointer Percentage",
  },
  {
    id: "ft",
    label: "FT",
    description: "Free Throws",
  },
  {
    id: "ftp",
    label: "FT%",
    description: "Free Throw Percentage",
  },
  {
    id: "rebounds",
    label: "REB",
    description: "Rebounds",
  },
  {
    id: "assists",
    label: "AST",
    description: "Assists",
  },
  {
    id: "steals",
    label: "STL",
    description: "Steals",
  },
  {
    id: "blocks",
    label: "BLK",
    description: "Blocks",
  },
  {
    id: "turnovers",
    label: "TO",
    description: "Turn Overs",
  },
  {
    id: "fouls",
    label: "FLS",
    description: "Fouls",
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const first = a[orderBy] === ("--" as unknown as T[keyof T]) ? 0 : a[orderBy];
  const second =
    b[orderBy] === ("--" as unknown as T[keyof T]) ? 0 : b[orderBy];
  if (second < first) {
    return -1;
  }
  if (second > first) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof never>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            className={index === 0 ? "sticky" : ""}
            key={headCell.label}
            align={index === 0 ? "left" : "right"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {!headCell.description ? (
                headCell.label
              ) : (
                <Tooltip title={headCell.description}>
                  <span>{headCell.label}</span>
                </Tooltip>
              )}

              {orderBy === headCell.label ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const GameStats = ({ gameId, seasonId }: GameProps) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState("Player");

  const { game } = useGame(gameId);
  const { season } = useSeason(seasonId);

  const players = season.team?.players.filter((player) =>
    game.players.includes(player.id)
  );

  const getAvgValue = (
    attempts: number | undefined,
    makes: number | undefined
  ) => {
    if (!attempts || attempts === 0 || isNaN(attempts)) {
      return "--";
    }
    if (!makes || isNaN(makes)) {
      return 0;
    }
    if (makes) {
      return Math.round((makes / attempts) * 100);
    }
    return "--";
  };

  const getTotalStats = (stats: Stats[] | undefined, stat: StatType) => {
    if (!stats) {
      return 0;
    }

    const total = stats.reduce((sum, s) => sum + s[stat], 0);
    if (isNaN(total)) {
      return 0;
    }

    return total;
  };

  const rows =
    players?.map((player) => {
      const stats = game.stats?.find((p) => p.playerId == player.id);
      const totalFGM = (stats?.fgm || 0) + (stats?.tpm || 0);
      const totalFGA = (stats?.fga || 0) + (stats?.tpa || 0);
      return createData(
        player.firstName,
        player.number,
        stats?.points || 0,
        `${totalFGM}/${totalFGA}`,
        getAvgValue(totalFGA, totalFGM),
        `${stats?.tpm || "-"}/${stats?.tpa || "-"}`,
        getAvgValue(stats?.tpa, stats?.tpm),
        `${stats?.ftm || "-"}/${stats?.fta || "-"}`,
        getAvgValue(stats?.fta, stats?.ftm),
        stats?.rebounds || 0,
        stats?.assists || 0,
        stats?.steals || 0,
        stats?.blocks || 0,
        stats?.turnovers || 0,
        stats?.fouls || 0
      );
    }) || [];

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const teamFGM =
    getTotalStats(game.stats, "fgm") + getTotalStats(game.stats, "tpm");
  const teamFGA =
    getTotalStats(game.stats, "fga") + getTotalStats(game.stats, "tpa");

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table
        sx={{
          minWidth: 650,
        }}
        size="small"
        aria-label="Players stats"
        id="player-stats"
      >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {rows.sort(getComparator(order, orderBy)).map((row) => (
            <TableRow key={row.player}>
              <TableCell scope="row" className="sticky">
                {row.player}
              </TableCell>
              <TableCell align="right">{row.num}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
              <TableCell align="right">{row.fg}</TableCell>
              <TableCell align="right">{row.fgp}%</TableCell>
              <TableCell align="right">{row.tp}</TableCell>
              <TableCell align="right">{row.tpp}%</TableCell>
              <TableCell align="right">{row.ft}</TableCell>
              <TableCell align="right">{row.ftp}%</TableCell>
              <TableCell align="right">{row.rebounds}</TableCell>
              <TableCell align="right">{row.assists}</TableCell>
              <TableCell align="right">{row.steals}</TableCell>
              <TableCell align="right">{row.blocks}</TableCell>
              <TableCell align="right">{row.turnovers}</TableCell>
              <TableCell align="right">{row.fouls}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter sx={{ borderTop: "1px solid", borderColor: "divider" }}>
          <TableRow>
            <TableCell className="sticky">Totals:</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              {getTotalStats(game.stats, "points")}
            </TableCell>
            <TableCell align="right">
              {teamFGM}/{teamFGA}
            </TableCell>
            <TableCell align="right">
              {getAvgValue(teamFGA, teamFGM)}%
            </TableCell>
            <TableCell align="right">
              {getTotalStats(game.stats, "tpm")}/
              {getTotalStats(game.stats, "tpa")}
            </TableCell>
            <TableCell align="right">
              {getAvgValue(
                getTotalStats(game.stats, "tpa"),
                getTotalStats(game.stats, "tpm")
              )}
              %
            </TableCell>
            <TableCell align="right">
              {getTotalStats(game.stats, "ftm")}/
              {getTotalStats(game.stats, "fta")}
            </TableCell>
            <TableCell align="right">
              {getAvgValue(
                getTotalStats(game.stats, "fta"),
                getTotalStats(game.stats, "ftm")
              )}
              %
            </TableCell>
            <TableCell align="right">
              {getTotalStats(game.stats, "rebounds")}
            </TableCell>
            <TableCell align="right">
              {getTotalStats(game.stats, "assists")}
            </TableCell>
            <TableCell align="right">
              {getTotalStats(game.stats, "steals")}
            </TableCell>
            <TableCell align="right">
              {getTotalStats(game.stats, "blocks")}
            </TableCell>
            <TableCell align="right">
              {getTotalStats(game.stats, "turnovers")}
            </TableCell>
            <TableCell align="right">
              {getTotalStats(game.stats, "fouls")}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
