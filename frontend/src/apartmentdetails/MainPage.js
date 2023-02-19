import React, { useEffect, useState } from "react";
import NavBarComponent from '../components/NavBarComponent';
import OverviewComponent from "./OverviewComponent";
import Footer from '../components/Footer';
import StaticRating from "./StaticRating";
import FilterComponent from "../components/FilterComponent";
import SortIcon from '@mui/icons-material/Sort';
import ApartmentHeader from "./ApartmentHeader";
import {
    Grid,
    Box,
    Divider,
    Stack,
    Menu,
    Tooltip,
    MenuItem,
    Typography,
    IconButton,
    Button
} from "@mui/material"
import TuneIcon from '@mui/icons-material/Tune';

import { resolvePath, useNavigate } from "react-router-dom";
import ReviewComponent from "./ReviewComponent";

export default function MainPage() {
    const [reviews, setReviews] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getReviews();
    }, [])

    async function getReviews() {
        let apiCall = "http://localhost:4000/apartments/lark";
    
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
                let newRev = [];
                response.forEach((data) => {newRev.push(data)})
                setReviews(newRev);
              })
            .catch((e) => {
              console.log(e);
            });
        }

  return (
    <Grid name="main" display="flex" direction="column">
        <ApartmentHeader></ApartmentHeader>
        <OverviewComponent name="lark"></OverviewComponent>
        <Grid display="flex" direction="row" justifyContent="flex-end">
            <IconButton>
            <SortIcon fontSize="large"></SortIcon>
            </IconButton>
            <FilterComponent></FilterComponent>
        </Grid>
        <Grid>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={4} 
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    >
                    {reviews.map((r) => (
                        <ReviewComponent key={r.title}
                            title={r.title}
                            review={r.review}
                            rating={r.rating}
                        ></ReviewComponent>))}
                </Grid>
            </Box>
        </Grid>
    </Grid>

  );
}