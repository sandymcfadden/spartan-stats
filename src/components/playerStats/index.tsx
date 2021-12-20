import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import "./styles.css";
import { Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";

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
) {
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

const rows = [
  createData("Noah", 20, 8, 10, 80, 2, 4, 50, 2, 2, 100, 4, 4, 2, 0, 0),
  createData("Riley", 22, 8, 10, 80, 2, 4, 50, 2, 2, 100, 4, 4, 2, 0, 0),
  createData("Eric", 24, 8, 10, 80, 2, 4, 50, 2, 2, 100, 4, 4, 2, 0, 0),
  createData("Shay", 26, 8, 10, 80, 2, 4, 50, 2, 2, 100, 4, 4, 2, 0, 0),
];

const headCells = [
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
    id: "fpm",
    label: "3PTM",
    description: "3 Pointers Made",
  },
  {
    id: "fpa",
    label: "3PTA",
    description: "3 Pointers Attempted",
  },
  {
    id: "fpp",
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

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
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

export const PlayerStats = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("Player");

  const handleRequestSort = (event, property) => {
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
      >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row) => (
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
