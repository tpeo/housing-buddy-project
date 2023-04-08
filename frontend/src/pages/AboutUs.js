import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import ListApartmentComponent from "../components/ListApartmentComponent";
import AddApartmentModal from "../components/AddApartmentModal";
import FilterComponent from "../components/FilterComponent";
import LayoutComponent from "../components/layout/LayoutComponent";
import Logo from "../logo.png"
import {
    Box,
    Grid,
    Link,
    Divider,
    Stack,
    Typography,
    Button,
    IconButton,
    Accordion
} from "@mui/material"

import AddIcon from '@mui/icons-material/Add';

import { useNavigate } from "react-router-dom";



export default function AboutUs() {
    const navigate = useNavigate();


return (
  <LayoutComponent>
        <Grid display="flex"
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          rows={{ sm: 1, md: 2}}
          >
          <Grid width='50%' margin='20px' display="flex" sm={12} md={6}
                flexDirection='column' item>
                  <Typography variant="h4" fontWeight={'bold'} color={'#0495b2'} align='center'>About Us</Typography>
                  <Typography color={'#0495b2'} variant="body1" paragraph={true} sx={{margin: 10}}>
                    Lorem ipsum dolor sit amet. Aut molestias pariatur aut sunt maiores qui mollitia ipsum. Eos laboriosam labore eum consequatur nesciunt qui minus molestiae ad deserunt quia et consequatur sint ea rerum repudiandae. Eos laborum enim sed impedit consectetur 33 error cupiditate in temporibus unde in nostrum ratione sit pariatur tempore. Qui autem temporibus quo aspernatur tempore qui amet corrupti non dolore suscipit est quaerat iste et esse voluptates.

                  Laborum enim sed impedit consectetur 33 error cupiditate in temporibus unde in nostrum ratione sit pariatur tempore. Qui autem temporibus quo aspernatur tempore qui amet corrupti non dolore suscipit est quaerat iste et esse voluptates.
                  </Typography>
                  <Button variant="contained" href="mailto:housingbuddy@gmail.com" style={{backgroundColor: '#0495B2', fontWeight:'bold', fontFamily:'sans-serif', height: 60, width: "70%", marginLeft: "15%"}} color="primary">Contact Us</Button>

          </Grid>
          <Grid width='50%' margin='20px' display="flex" sm={12} md={6}
                flexDirection='column' item>
                  <img src={Logo} style = {{margin: 10, marginTop: 50}} />
          </Grid>
          
        </Grid>
        <Grid
          direction="row"
          alignItems="center"
          marginTop="20px"
          sx={{backgroundColor: "#EEEEEE"}}>
          <Grid  display="flex"
                flexDirection='column' alignItems="center" item>
                  <Typography variant="h4" margin="20px" fontWeight={'bold'} color={'#0495b2'} align='center'>Frequently Asked Questions</Typography>

          
          
          <Accordion sx={{
        width: "80%",
        height: 150,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
      }}

        >
          <Typography variant="h4" fontWeight={'bold'} color={'#0495b2'} align='center'>About Us</Typography>

        </Accordion>
          </Grid>
       

        </Grid>

  </LayoutComponent>

);
}