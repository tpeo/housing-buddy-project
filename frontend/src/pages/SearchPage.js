import React from "react";
import {
    Avatar,
    InputBase,
    IconButton,
    Button,
    Tooltip,
    Icon,
    Grid,
    Typography,
} from "@mui/material"
import Footer from "../components/layout/Footer";
import NavBarComponent from "../components/layout/NavBarComponent";

import { styled, alpha } from '@mui/material/styles';

import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function SearchPage() {

    const navigate = useNavigate();
    let searchQuery = "";

    const queryParameters = new URLSearchParams(window.location.search);
    if (queryParameters.has("query")) {
	    searchQuery = queryParameters.get("query");
    }

    console.log(searchQuery)

    return (
        <Grid>
            <NavBarComponent></NavBarComponent>
            <Typography variant="h1">Search Results</Typography>
            <Footer></Footer>
        </Grid>

    );
}
