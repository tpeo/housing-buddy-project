import React, { useEffect, useState } from "react";
import NavBarComponent from '../components/NavBarComponent';
import ListApartmentComponent from "../components/ListApartmentComponent";
import FilterComponent from "../components/FilterComponent";
import Footer from '../components/Footer';
import ExtLoginComponent from "../components/login/ExtLoginComponent";
import {
    Grid,
    Box,
    Divider,
    Stack,
    IconButton,
    Button
} from "@mui/material"
import SortIcon from '@mui/icons-material/Sort';

import { useNavigate } from "react-router-dom";

export default function AllApartments() {
    const navigate = useNavigate();

    const [allApartments, setAllApartments] = useState([]);
    const [apartmentStats, setApartmentStats] = useState([]);
    const [order, setOrder] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getAllApartments();
        getApartmentStats();
    }, []);

    useEffect(() => {
      const queryParams = new URLSearchParams(window.location.search);
      if (queryParams.has("apartment")) {

      }

  }, [])

    const [query, setQuery] = useState("")


    const navApartmentPage = (event) => {
      console.log(event.target.id);
      navigate(`/mainpage/${event.target.id}`);

    }

    async function getAllApartments() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/apartments/`;
    
            await fetch(apiCall, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
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

      async function getApartmentStats() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/apartments/stats`;
    
            await fetch(apiCall, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.status !== 200) {
                throw new Error();
              }
              return response.json();
            })
            .then((response) => {
                let stats = [];
                response.forEach((data) => {stats.push(data)})
                setApartmentStats(stats);
              })
            .catch((e) => {
              console.log(e);
            });
        }





  return (
    <div>
        <NavBarComponent></NavBarComponent>
        <img src='/logowbg.png' height='100%' width='100%'></img>
        <Stack direction="row" container justifyContent="flex-end">
        <IconButton>
            <SortIcon fontSize="large"></SortIcon>
        </IconButton>
        <FilterComponent setOrder={setAllApartments} elements={apartmentStats}></FilterComponent>
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
                        handleOnClick={navApartmentPage}
                    ></ListApartmentComponent>))}
            </Grid>
        </Box>
        <Footer></Footer>
        
    </div>
  );
}