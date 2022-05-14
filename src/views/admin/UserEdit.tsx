import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Role } from "src/hooks/AuthProvider";
import { MenuAppBar } from "../../components/menuAppBar";
import { User, useUser, updateUser } from "../../hooks/data/user";

export const UserEdit = ({ userId }: { userId: string }) => {
  const { user } = useUser(userId);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    setEditUser(user);
  }, [user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser({ ...user, ...editUser }, user.email);
  };
  return editUser && editUser.role !== undefined ? (
    <>
      <MenuAppBar />
      <Container maxWidth="sm" sx={{ mt: 3 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              disabled
              id="email"
              label="Email"
              name="email"
              value={editUser.email}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Users Name"
              name="name"
              value={editUser.name}
              onChange={(e) => {
                setEditUser({ ...editUser, name: e.target.value });
              }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="relationship"
              label="Relationship to Team"
              type="text"
              id="relationship"
              value={editUser.relationship}
              onChange={(e) => {
                setEditUser({ ...editUser, relationship: e.target.value });
              }}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-lable">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                label="Role"
                value={editUser.role}
                onChange={(e) => {
                  setEditUser({
                    ...editUser,
                    role: e.target.value as unknown as Role,
                  });
                }}
              >
                <MenuItem value="">No Role</MenuItem>
                <MenuItem value="viewer">Viewer</MenuItem>
                <MenuItem value="stats">Stats</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                editUser.name === user.name &&
                editUser.relationship === user.relationship &&
                editUser.role === user.role
              }
            >
              Update User
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  ) : (
    <MenuAppBar />
  );
};
