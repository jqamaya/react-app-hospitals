import { AppBar, Box, Button, Container, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { useAuth } from "./hooks/useAuth";
import React, { useState } from "react";

function Home() {
  const { user } = useAuth();

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
        console.log('manage hospitals')
      },
    }
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
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
                <Button onClick={handleOpenUserMenu} sx={{ p: 0, color: 'common.white' }}>
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
              <Button sx={{ p: 0, color: 'common.white' }}>
                LOGOUT
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        bgcolor='#282c34'
      >
        <Typography variant="h5" color="common.white">
          {`Welcome, ${user?.name}!`}
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
