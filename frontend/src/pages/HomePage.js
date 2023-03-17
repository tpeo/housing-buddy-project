import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ListApartmentComponent from "../components/ListApartmentComponent";
import FilterComponent from "../components/FilterComponent";
import LayoutComponent from "../components/layout/LayoutComponent";
import { ref, getDownloadURL } from "firebase/storage";
import {storage} from "../components/firebase/firebase";


import {
    Grid,
    Box,
    Link,
    Divider,
    Stack,
    Button,
    Typography
} from "@mui/material"

import { useNavigate } from "react-router-dom";

export default function AllApartments() {
    const navigate = useNavigate();

    const [allApartments, setAllApartments] = useState([]);
    const [order, setOrder] = useState([]); //default order

    useEffect(() => {
        getAllApartments();
        setOrder(allApartments);
    }, []);

    const navApartmentPage = (event) => {
      navigate(`/mainpage/${event.target.id.toLowerCase()}`); //bugs out for cards

    }

    async function getAllApartments() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/apartments/rating`;
    
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

const tempApt = ['lark', 'lark', 'lark', 'lark', 'lark', 'lark', 'lark', 'lark', 'lark',] 

const apartments = allApartments.map((obj, index) => (
  <ListApartmentComponent
    key={obj.name}    
    name={obj.name} 
    handleOnClick={navApartmentPage}
    backgroundImage={obj.img_link}
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
  margin-bottom: 4%;
  overflow: 'hidden';
`;

return (
  <LayoutComponent>
  <div>
      <img src='/logowbg.png' height='100%' width='100%'></img>
      <Stack direction="row" container justifyContent="flex-end">
      <FilterComponent collection="apartments" setOrder={setAllApartments}></FilterComponent>
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
      <Grid height='100%' justifyContent={'center'} display='flex' flexDirection={'flex-end'} marginTop={'20%'}>
         <Link href='/allapartments' color={'#0495B2'}>View All Apartments</Link>
      </Grid>
  </div>
  </LayoutComponent>

);
}