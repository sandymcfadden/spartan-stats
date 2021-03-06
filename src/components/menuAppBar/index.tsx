import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { Link } from "wouter";
import "./styles.css";
import { useAuth } from "../../hooks/AuthProvider";
import { SpartanLogo } from "../icons/spartan";

export const MenuAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { logout, isAdmin, user } = useAuth();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <SpartanLogo />
            </IconButton>
          </Link>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Spartan Stats
          </Typography>
          {
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <div style={{ padding: "3px 16px", marginBottom: "6px" }}>
                  {user?.email}
                </div>
                <Divider />
                <MenuItem>
                  <Link href="/">Home</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/seasons">Seasons</Link>
                </MenuItem>
                {isAdmin() && (
                  <MenuItem>
                    <Link href="/admin">Users</Link>
                  </MenuItem>
                )}
                <Divider />
                <Button
                  id="logout"
                  size="small"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};
