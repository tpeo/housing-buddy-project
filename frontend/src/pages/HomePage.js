import React, { useEffect, useState } from "react";
import styled from 'styled-components';
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
    Button,
    Typography
} from "@mui/material"
import SortIcon from '@mui/icons-material/Sort';

import { useNavigate } from "react-router-dom";

export default function AllApartments() {
    const navigate = useNavigate();

    const [allApartments, setAllApartments] = useState([]);
    const [apartmentStats, setApartmentStats] = useState([]);
    const [order, setOrder] = useState([]); //default order
    //use effect update whenever soomething changes

    useEffect(() => {
        getAllApartments();
        setOrder(allApartments);
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

//all the apt images for the grid
const backgroundImages = ['/apartments/26west.png', '/apartments/rambler.png', '/apartments/crest.png', '/apartments/dobie.png', '/apartments/inspire.png', '/apartments/ion.png', '/apartments/lark.png', '/apartments/skyloft.png', '/apartments/txvintage.png'];
const tempApt = ["26 West", "Rambler", "Crest", "Dobie", "Inspire", "Ion", "Lark", "Skyloft", "Texan & Vintage"]
//{tempApt.map((name, index) => (
//{allApartments.map((name, index) => (

const apartments = allApartments.map((name, index) => (
  <ListApartmentComponent
    key={name}    
    name={name}
    handleOnClick={navApartmentPage}
    backgroundImage={backgroundImages[index % backgroundImages.length]}
  />
));

const Box = styled.div` 
  display: flex;
  flex-direction: row;
  justify-content: 'center';
  margin-left: 10%;
  margin-right: 10%,
  padding: auto;
  margin-top: 2%;
  margin-bottom: 5%;
  background-size: '100% 100%';
  overflow: 'hidden';
`;

//need to add view all apartments button
return (
  <div>
      <NavBarComponent></NavBarComponent>
      <img src='/logowbg.png' height='100%' width='100%'></img>
      <Stack direction="row" container justifyContent="flex-end">
      <FilterComponent collection="apartments" setOrder={setOrder}></FilterComponent>
      </Stack>
      <Divider color="#0495b2" sx={{ borderBottomWidth: 50 }}></Divider>
      <Box>
        <Box>
            <Grid container className='grid-container' style={{
                display: "grid",
                gridTemplateAreas: `
                    "first fourth seventh"
                    "second fifth eigth"
                    "third sixth ninth"
                `,
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                gap: '20rem',
            }}>
                <Grid item className='apt1' style={{ gridArea: "first" }}>
                  {apartments[0]}
                </Grid>
                <Grid item className='apt2' style={{ gridArea: "second" }}>
                  {apartments[1]}
                </Grid>
                <Grid item className='apt3' style={{ gridArea: "third" }}>
                  {apartments[2]}
                </Grid>
                <Grid item className='apt4' style={{ gridArea: "fourth" }}>
                  {apartments[3]}
                </Grid>
                <Grid item className='apt5' style={{ gridArea: "fifth" }}>
                  {apartments[4]}
                </Grid>
                <Grid item className='apt6' style={{ gridArea: "sixth" }}>
                  {apartments[5]}
                </Grid>
                <Grid item className='apt7' style={{ gridArea: "seventh" }}>
                  {apartments[6]}
                </Grid>
                <Grid item className='apt8' style={{ gridArea: "eigth" }}>
                  {apartments[7]}
                </Grid>
                <Grid item className='apt9' style={{ gridArea: "ninth" }}>
                  {apartments[8]}
                </Grid>
            </Grid> 
        </Box>
      </Box>
      <Box></Box>
      <Footer></Footer>
      
  </div>
);
}