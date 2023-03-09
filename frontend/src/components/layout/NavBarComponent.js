import React from "react";
import ExtLoginComponent from "../login/ExtLoginComponent";
import SearchComponent from "../SearchComponent"
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Avatar,
    InputBase,
    Button,
    Tooltip,
} from "@mui/material"

import AdbIcon from '@mui/icons-material/Adb';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

export default function NavBarComponent() {
    const navigate = useNavigate();

    const pages = ['About Us', 'FAQ', 'View All Apartments'];
    const settings = ['Profile', 'Dashboard', 'Logout'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    function handleCloseNavMenu(event) {
        navHelper(event.currentTarget.innerText);
        setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = (event) => {
      menuHelper(event.currentTarget.innerText);
      setAnchorElUser(null);
    };

    const navigateHome = () => {
      navigate('/');
    }

    function navHelper(name) {
        switch(name){
            case "VIEW ALL APARTMENTS":
                navigate('/allapartments');
                break;
        }
    }

    function menuHelper(name) {
      switch(name){
          case "Profile":
            navigate('/profile');
            break;
          case "Logout":
              logout();
              break;
      }
  }

  function UserMenu(props) {
    return (
      <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar src={window.localStorage.getItem("@pfp")}></Avatar>
        </IconButton>
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
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
    );
  }

  function Default(props) {
    return (
      <ExtLoginComponent></ExtLoginComponent>
    );
  }

  function Dashboard({isLoggedIn}) {
    if (isLoggedIn === "true") {
      return <UserMenu/>;
    } else {
      return <Default/>;
    }
  }

  function logout() {
    localStorage.removeItem("@attendanceToken");
    localStorage.removeItem("@user");
    localStorage.setItem("loggedIn", false);
    window.location.reload(false);
    navigate("/"); //navigate to temp page that says you've logged out and times out?
  }
    

    return (
        <AppBar sx={{ background: 'white' }} position="sticky">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Button onClick={navigateHome} sx={{ p: 0 }}>
                <img src='/logo.png' width={200} height={80} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></img>
            </Button>

    
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} name={page} onClick={() => handleCloseNavMenu(page)}>
                      <Typography sx={{color: "#0495b2"}} textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: '#0495b2', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <SearchComponent></SearchComponent>
              <Dashboard isLoggedIn={localStorage.getItem("loggedIn")}></Dashboard>
            </Toolbar>
          </Container>
        </AppBar>
      );
}
