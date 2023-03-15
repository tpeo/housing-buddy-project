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
import { Hits } from 'react-instantsearch-dom';
import { hits } from 'instantsearch.js/es/widgets';

import { styled, alpha } from '@mui/material/styles';

import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { InstantSearch } from "react-instantsearch-dom";

export default function SearchPage() {

    const navigate = useNavigate();
    let searchQuery = "";
    const [results, setResults] = useState({});

    const algoliasearch = require('algoliasearch');
    const appId = 'MBBVF21PRE';
    const apiKey = '285a861db99cccb9f00fd6587bf86356';
    const searchClient = algoliasearch(appId, apiKey);

    const index = searchClient.initIndex('apartments');

    const queryParameters = new URLSearchParams(window.location.search);
    if (queryParameters.has("query")) {
	    searchQuery = queryParameters.get("query");
    }

    const Hit = ({ hit }) => <p>{hit.name}</p>;

    console.log(searchQuery)
    index.search(searchQuery, {}).then(({ hits }) => {
        console.log(hits)
          
    });

    console.log(results)
    // const hits = results.map((obj) => (
    //     <Hit hitComponent={results} />
    //   ));

    return (
        <Grid>
            <NavBarComponent></NavBarComponent>
            <Typography variant="h1">Search Results</Typography>

            <InstantSearch indexName="apartments" searchClient={searchClient}>
            </InstantSearch>
            <Footer></Footer>
        </Grid>

    );
}
