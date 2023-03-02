import React, { useEffect, useState } from "react";
import NavBarComponent from '../components/NavBarComponent';
import Footer from '../components/Footer'
import ListApartmentComponent from "../components/ListApartmentComponent";
import {
    Grid,
    TextField,
    Box,
    Button,
    CardContent
} from "@mui/material"

export default function AllApartmentsPage() {

    const [allApartments, setAllApartments] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getAllApartments();
    }, [])

    async function getAllApartments() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/apartments/name`;
    
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
              let apartments = [];
              console.log(apartments)
              response.forEach((data) => {apartments.push(data)})
              setAllApartments(apartments);
            })
            .catch((e) => {
              console.log(e);
            });
        }



  return (
    <div>
        <NavBarComponent></NavBarComponent>
        <Grid>
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={4} 
                justifyContent="center"
                alignItems="stretch"
                >
                {allApartments.map((name) => (
                            <Button sx={{
                              width: "150px",
                              height: "49px",
                              backgroundImage: "linear-gradient(.25turn, #f00, #00f)"
                            }}>Next</Button>))}
            </Grid>
        </Box>
        </Grid>
        <Footer></Footer>
    </div>
  );
}
