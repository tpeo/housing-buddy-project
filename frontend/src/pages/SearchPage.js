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
import { Hits, connectHits } from 'react-instantsearch-dom';
import { hits } from 'instantsearch.js/es/widgets';

import { styled, alpha } from '@mui/material/styles';

import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { InstantSearch } from "react-instantsearch-dom";

export default function SearchPage() {

    const navigate = useNavigate();
    let searchQuery = "";
    let results = {};

    const algoliasearch = require('algoliasearch');
    const appId = 'MBBVF21PRE';
    const apiKey = '285a861db99cccb9f00fd6587bf86356';
    const searchClient = algoliasearch(appId, apiKey);

    const index = searchClient.initIndex('apartments');

    const queryParameters = new URLSearchParams(window.location.search);
    if (queryParameters.has("query")) {
	    searchQuery = queryParameters.get("query");
    }

    const Hits = ({ hits }) => (
        <ol>
          {hits.map(hit => (
            <li key={hit.objectID}>{hit.name}</li>
          ))}
        </ol>
      );
      
    const CustomHits = connectHits(Hits);

 //   useEffect(() => {
        index.search(searchQuery, {}).then(({ hits }) => {
            console.log(hits)       
        });
  //  }, [searchQuery])


    console.log(results)

    return (
        <Grid>
            <NavBarComponent></NavBarComponent>
            <Typography variant="h1">Search Results</Typography>
            <InstantSearch indexName="apartments" searchClient={searchClient}>
                <CustomHits></CustomHits>
            </InstantSearch>
            <Footer></Footer>
        </Grid>

    );
}
