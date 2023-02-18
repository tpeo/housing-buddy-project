import React, { useEffect, useState } from "react";
import NavBarComponent from './components/NavBarComponent';
import ListApartmentComponent from "./components/ListApartmentComponent";
import {
    Grid,
    Box,
} from "@mui/material"
import './App.css'

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


  return (
    <div>
        <NavBarComponent></NavBarComponent>
        <img src='/logowbg.png' height='100%' width='100%'></img>
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

    </div>
  );
}