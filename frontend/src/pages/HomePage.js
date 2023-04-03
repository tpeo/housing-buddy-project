import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ListApartmentComponent from "../components/ListApartmentComponent";
import AddApartmentModal from "../components/AddApartmentModal";
import FilterComponent from "../components/FilterComponent";
import LayoutComponent from "../components/layout/LayoutComponent";

import {
    Box,
    Grid,
    Link,
    Divider,
    Stack,
    IconButton
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from "react-router-dom";

const StyleBox = styled.div` 
  display: flex;
  justify-content: 'center';
  margin-left: 10%;
  margin-right: 10%,
  padding: auto;
  margin-top: 2%;
  margin-bottom: 4%;
  overflow: 'hidden';
  position: 'relative';
`;

export default function AllApartments() {
    const navigate = useNavigate();

    const [allApartments, setAllApartments] = useState([]);
    //const [order, setOrder] = useState([]); //default order

    useEffect(() => {
        getAllApartments();
        //setOrder(allApartments);
    }, []);

    const navApartmentPage = (event) => {
      navigate(`/mainpage/${event.target.id.toLowerCase()}`); //bugs out for cards

    }

    async function getAllApartments() {
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/apartments/rating`;
    
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

const nineCards = allApartments.slice(0, 9);
  
return (
  <LayoutComponent>
        <img src='/logowbg.png' height='100%' width='100%' alt="bg-img"></img>
        <Stack direction="row" container justifyContent="space-between">
            <AddApartmentModal txt="Apartment Request Form"/>
          <FilterComponent collection="apartments" setOrder={setAllApartments}></FilterComponent>
        </Stack>
        <Divider color="#0495b2" sx={{ borderBottomWidth: 15 }}></Divider>

        <Box sx={{flexGrow: 1, marginTop: '20px', marginBottom: '20px'}}>
            <Grid container spacing={4} 
                  justifyContent="center"
                >
              {nineCards.map((obj) => (
                  <ListApartmentComponent
                    key={obj.name}    
                    name={obj.name} 
                    handleOnClick={navApartmentPage}
                    backgroundImage={obj.img_link}
                  />
              ))}

            </Grid>
          </Box>
      <Grid justifyContent={'center'} display='flex' item>
          <Link href='/allapartments' color={'#0495B2'}>View All Apartments</Link>
      </Grid>

  </LayoutComponent>

);
}