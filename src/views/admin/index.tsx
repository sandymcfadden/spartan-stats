import {
  Container,
  Link as L,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "wouter";
import { MenuAppBar } from "../../components/menuAppBar";
import { useUsers } from "../../hooks/data/user";

export const Admin = () => {
  const { users } = useUsers();
  return (
    <>
      <MenuAppBar />
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Admin Panel
          </Typography>
          <Box component="div" sx={{ mt: 1 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Date Created</TableCell>
                    <TableCell>Relationship</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {
                    return (
                      <TableRow
                        key={user.email}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.dateCreated}</TableCell>
                        <TableCell>{user.relationship}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Link href={`/admin/${user.email}`}>
                            <L variant="body2">Edit</L>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
};
