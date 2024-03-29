import React from "react";
import ExtLoginComponent from "../login/ExtLoginComponent";
import SearchComponent from "../search/SearchComponent"
import HoverMenuComponent from "./HoverMenuComponent";
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
import {createTheme} from "@mui/material";

const myTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          ":hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          ":hover": {
            textDecoration: "underline",
          },
        },
      },
    },
  },
});

export default function NavBarComponent() {
    const navigate = useNavigate();

    const pages = ['Home', 'About Us'];
    const settings = ['Logout'];

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
      logout();
      setAnchorElUser(null);
    };

    const navigateHome = () => {
      navigate('/');
    }

    function navHelper(name) {
        switch(name){
            case "ABOUT US":
                navigate("/aboutus");
                break;
            case "FAQ":
                navigate("/faq");
                break;
            case "HOME":
              navigate('/');
              break;
            case "VIEW ALL APARTMENTS":
                navigate('/allapartments');
                break;
            case "APARTMENT COMPARISON":
              navigate('/compare');
              break;
        }
    }


  function dashboard(isLoggedIn) {
    if (isLoggedIn === "true") {
      return (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar src={window.localStorage.getItem("@pfp")}>
                <img src={window.localStorage.getItem("@pfp")} referrerPolicy="no-referrer"></img>
              </Avatar>
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
    } else {
      return (
        <ExtLoginComponent></ExtLoginComponent>
      );
    }
  }

  function logout() {
    localStorage.removeItem("@userToken");
    localStorage.removeItem("@user");
    localStorage.removeItem("@pfp");
    localStorage.removeItem("@apartment");
    localStorage.setItem("loggedIn", false);
    window.location.reload(false);
    navigate("/"); //navigate to temp page that says you've logged out and times out?
  }
    

    return (
        <AppBar width="100%" sx={{background: 'white'}} position="sticky">
          <Container maxWidth="100%">
            <Toolbar>
            <Button onClick={navigateHome} sx={{ p: 0 }}>
                <img src='/logo.png' width='160rem' height='75rem' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></img>
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
                    <MenuItem sx={{
                      '&:hover': {textDecoration: "underline"}
                    }} key={page} name={page} onClick={() => handleCloseNavMenu(page)}>
                      <Typography sx={{color: '#0495b2'}} textAlign="center">{page}</Typography>
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
                    sx={{ my: 2, color: '#0495b2', display: 'block', '&:hover': {textDecoration: "underline"}}}
                  >
                    {page}
                  </Button>
                ))}
                <HoverMenuComponent nav={navHelper("APARTMENT")}></HoverMenuComponent>
              </Box>
              <SearchComponent></SearchComponent>
              {dashboard(window.localStorage.getItem("loggedIn"))}
            </Toolbar>
          </Container>
        </AppBar>
      );
}
