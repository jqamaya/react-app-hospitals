import React, { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import { useAuth } from "./hooks/useAuth";
import { ArrowDropDown } from "@mui/icons-material";

export const ProtectedLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { palette: { grey } } = useTheme();

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const managementMenu = [
    {
      title: 'Manage Hospitals',
      onClick: () => {
        navigate('/hospitals')
      },
    }
  ];

  if (!user?.email) {
    return <Navigate to="/" />;
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ alignItems: 'flex-end' }}>
              <Tooltip title="Management">
                <Button
                  onClick={handleOpenUserMenu}
                  endIcon={<ArrowDropDown />}
                  sx={{ p: 0, color: 'common.white' }}
                >
                  Management
                </Button>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {managementMenu.map((setting) => (
                  <MenuItem key={setting.title} onClick={setting.onClick}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
              <Button sx={{ p: 0 }} onClick={logout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        bgcolor={grey[900]}
      >
        <Outlet />
      </Box>
    </Box>
  );
};