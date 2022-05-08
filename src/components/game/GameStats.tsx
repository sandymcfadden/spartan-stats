import { Box } from "@mui/material";
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
import { useGame } from "../../hooks/data/game";
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
  points: number;
  fgm: number;
  fga: number;
  fgp: number;
  tpm: number;
  tpa: number;
  tpp: number;
  ftm: number;
  fta: number;
  ftp: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
};

function createData(
  player: string,
  points: number,
  fgm: number,
  fga: number,
  fgp: number,
  tpm: number,
  tpa: number,
  tpp: number,
  ftm: number,
  fta: number,
  ftp: number,
  rebounds: number,
  assists: number,
  steals: number,
  blocks: number,
  turnovers: number
): Data {
  return {
    player,
    points,
    fgm,
    fga,
    fgp,
    tpm,
    tpa,
    tpp,
    ftm,
    fta,
    ftp,
    rebounds,
    assists,
    steals,
    blocks,
    turnovers,
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
    id: "points",
    label: "Points",
  },
  {
    id: "fgm",
    label: "FGM",
    description: "Field Goals Made",
  },
  {
    id: "fga",
    label: "FGA",
    description: "Field Goals Attempted",
  },
  {
    id: "fgp",
    label: "FG%",
    description: "Field Goals Percentage",
  },
  {
    id: "tpm",
    label: "3PTM",
    description: "3 Pointers Made",
  },
  {
    id: "tpa",
    label: "3PTA",
    description: "3 Pointers Attempted",
  },
  {
    id: "tpp",
    label: "3PT%",
    description: "3 Pointer Percentage",
  },
  {
    id: "ftm",
    label: "FTM",
    description: "Free Throws Made",
  },
  {
    id: "fta",
    label: "FTA",
    description: "Free Throws Attempted",
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
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
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

  const players = season.team?.players;

  const rows =
    players?.map((player) => {
      const stats = game.stats?.find((p) => p.playerNum == player.number);
      return createData(
        `#${player.number} - ${player.firstName}`,
        stats?.points || 0,
        stats?.fgm || 0,
        stats?.fga || 0,
        !stats?.fga ? 100 : (stats?.fgm / stats?.fga) * 100,
        stats?.tpm || 0,
        stats?.tpa || 0,
        !stats?.tpa ? 100 : (stats?.tpm / stats?.tpa) * 100,
        stats?.ftm || 0,
        stats?.fta || 0,
        !stats?.fta ? 100 : (stats?.ftm / stats?.fta) * 100,
        stats?.rebounds || 0,
        stats?.assists || 0,
        stats?.steals || 0,
        stats?.blocks || 0,
        stats?.turnovers || 0
      );
    }) || [];

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table
        sx={{ minWidth: 650, border: "1px" }}
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
            <TableRow
              key={row.player}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="sticky">
                {row.player}
              </TableCell>
              <TableCell align="right">{row.points}</TableCell>
              <TableCell align="right">{row.fgm}</TableCell>
              <TableCell align="right">{row.fga}</TableCell>
              <TableCell align="right">{row.fgp}%</TableCell>
              <TableCell align="right">{row.tpm}</TableCell>
              <TableCell align="right">{row.tpa}</TableCell>
              <TableCell align="right">{row.tpp}%</TableCell>
              <TableCell align="right">{row.ftm}</TableCell>
              <TableCell align="right">{row.fta}</TableCell>
              <TableCell align="right">{row.ftp}%</TableCell>
              <TableCell align="right">{row.rebounds}</TableCell>
              <TableCell align="right">{row.assists}</TableCell>
              <TableCell align="right">{row.steals}</TableCell>
              <TableCell align="right">{row.blocks}</TableCell>
              <TableCell align="right">{row.turnovers}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};