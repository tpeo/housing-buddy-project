import React, { useEffect, useState } from "react";
import NavBarComponent from './components/NavBarComponent';
import ListApartmentComponent from "./components/ListApartmentComponent";
import Footer from './components/Footer';
import {
    Grid,
    Box,
    Divider,
    Stack,
    Menu,
    Tooltip,
    MenuItem,
    Typography,
    IconButton
} from "@mui/material"
import './App.css'
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';

import { resolvePath, useNavigate } from "react-router-dom";
import './App.css';

export default function AllApartments() {
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login');
    }

    const navigateAppa = () => {
        navigate('/apartments');
    }

    const [allApartments, setAllApartments] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getAllApartments();
    }, [])

    async function getAllApartments() {
        let apiCall = "http://localhost:4000/apartments/";
    
            await fetch(apiCall, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
          })
            .then((response) => {
              if (response.status !== 200) {
                throw new Error();
              }
              return response.json();
            })
            .then((response) => {
                let apartments = [];
                response.forEach((data) => {apartments.push(data)})
                setAllApartments(apartments);
              })
            .catch((e) => {
              console.log(e);
            });
        }

        const listItems = allApartments.map((ap) => {
            console.log(ap);
        });

    const filters = ['Most Popular', 'Affordability', 'Newest', 'Highest Ratings'];

    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };



  return (
    <div>
        <NavBarComponent></NavBarComponent>
        <img src='/logowbg.png' height='100%' width='100%'></img>
        <Stack direction="row" container justifyContent="flex-end">
        <IconButton>
            <SortIcon fontSize="large"></SortIcon>
        </IconButton>
        <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open filters">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <TuneIcon color="#0495b2" fontSize="large"></TuneIcon>
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
                  {filters.map((filter) => (
                    <MenuItem key={filter} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{filter}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
        </Stack>
        <Divider color="#0495b2" sx={{ borderBottomWidth: 10 }}></Divider>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={4} 
                justifyContent="center"
                alignItems="stretch"
                >
                {allApartments.map((name) => (
                    <ListApartmentComponent
                        name={name}
                    ></ListApartmentComponent>))}
            </Grid>
        </Box>
        <Footer></Footer>

    </div>
  );
}