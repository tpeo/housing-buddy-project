import React, { useEffect, useState } from "react";
import NavBarComponent from '../components/NavBarComponent';
import Footer from '../components/Footer'
import ListApartmentComponent from "../components/ListApartmentComponent";
import {
    Grid,
    TextField,
    Box,
    Link, 
    Button,
    CardContent
} from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function AllApartmentsPage() {
    const navigate = useNavigate();
    const [allApartments, setAllApartments] = useState([]);
    const backgroundImages = ['/apartments/26west.png', '/apartments/rambler.png', '/apartments/crest.png', '/apartments/dobie.png', '/apartments/inspire.png', '/apartments/ion.png', '/apartments/lark.png', '/apartments/skyloft.png', '/apartments/txvintage.png'];
    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
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

        const navApartmentPage = (event) => {
          console.log(event.target.id);
          navigate(`/mainpage/${event.target.id.toLowerCase()}`);
    
        }


  return (
    <div>
        <NavBarComponent></NavBarComponent>
        <Grid 
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="stretch">
        <Grid item>
        <Box sx={{flexGrow: 1}}>
            <Grid width="100%" container spacing={1} 
                display="flex"
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                >
                {allApartments.map((name) => (
                            <Button sx={{
                              width: "150px",
                              height: "49px",
                              backgroundImage: backgroundImages[0]
                            }}
                            id={name}
                            onClick={navApartmentPage}
                            >{name}</Button>))}
            </Grid>
        </Box>
        </Grid>

          <Grid item
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="stretch"
          >
          {alphabet.map((letter) => (
            <Link>{letter}</Link>
          ))}
          </Grid>

        </Grid>
        <Footer></Footer>
    </div>
  );
}
