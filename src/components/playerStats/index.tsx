import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import "./styles.css";

function createData(
  name: string,
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
    name,
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
  createData("Noah", 22, 8, 10, 80, 2, 4, 50, 2, 2, 100, 4, 4, 2, 0, 0),
  createData("Riley", 22, 8, 10, 80, 2, 4, 50, 2, 2, 100, 4, 4, 2, 0, 0),
  createData("Eric", 22, 8, 10, 80, 2, 4, 50, 2, 2, 100, 4, 4, 2, 0, 0),
  createData("Shay", 22, 8, 10, 80, 2, 4, 50, 2, 2, 100, 4, 4, 2, 0, 0),
];

export const PlayerStats = () => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="Players stats">
        <TableHead>
          <TableRow>
            <TableCell className="sticky">Player</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">
              <Tooltip title="Field Goals Made">
                <span>FGM</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Field Goals Attempted">
                <span>FGA</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Field Goals Percentage">
                <span>FG%</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="3 Pointers Made">
                <span>3PTM</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="3 Pointers Attempted">
                <span>3PTA</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="3 Pointer Percentage">
                <span>3PT%</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Free Throws Made">
                <span>FTM</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Free Throws Attempted">
                <span>FTA</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Free Throws Percentage">
                <span>FT%</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Rebounds">
                <span>Rbs</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Assists">
                <span>Assts</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Steals">
                <span>Stls</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Blocks">
                <span>Blks</span>
              </Tooltip>
            </TableCell>
            <TableCell align="right">
              <Tooltip title="Turn Overs">
                <span>T/Os</span>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="sticky">
                {row.name}
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
