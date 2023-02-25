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

    const navigatetest = () => {
        navigate('/mainpage');
    }

    const [allApartments, setAllApartments] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getAllApartments();
    }, [])

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

//all the apt images for the grid
const backgroundImages = ['/apartments/lark.png', '/apartments/dobie.png', '/apartments/rambler.png', '/apartments/crest.png', '/apartments/ion.png', '/apartments/2215.png', '/apartments/skyloft.png', '/apartments/inspire.png', '/apartments/26west.png'];
const tempApt = ["lark", "dobie", "rambler", "crest", "ion", "2215", "skyloft", "inspire", "26 west"]
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
  margin-left: 171px;
  margin-right: 171px;
  margin-top: 62px;
  margin-bottom: 90px;
  backgroundSize: '100% 100%',
  justifyContent: 'center',
`;

const Grid = styled.div`
  width: calc(100% / 3);
  margin: 10 10px;
  backgroundSize: '100% 100%'
`;
 
//need to add view all apartments button
return (
  <div>
      <NavBarComponent></NavBarComponent>
      <img src='/logowbg.png' height='100%' width='100%'></img>
      <Stack direction="row" container justifyContent="flex-end">
      <IconButton>
          <SortIcon fontSize="large"></SortIcon>
      </IconButton>
      <FilterComponent></FilterComponent>
      </Stack>
      <Divider color="#0495b2" sx={{ borderBottomWidth: 50 }}></Divider>
      <Box container spacing={0} justifyContent='center' alignItems='center'>
          <Grid container className='grid-container' style={{
              display: "grid",
              gridTemplateAreas: `
                  "first fourth seventh"
                  "second fifth eigth"
                  "third sixth ninth"
              `,
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: '310px 310px',
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
      <Box></Box>
      <Footer></Footer>
      
  </div>
);
}