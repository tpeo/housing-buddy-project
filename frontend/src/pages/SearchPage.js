import { React, useEffect, useState } from "react";
import {
    Link,
    Stack,
    Grid,
    Typography,
} from "@mui/material"
import Footer from "../components/layout/Footer";
import NavBarComponent from "../components/layout/NavBarComponent";

import { styled, alpha } from '@mui/material/styles';

import { useNavigate } from "react-router-dom";


export default function SearchPage() {
  //include isLoaded
    const navigate = useNavigate();
    const [allApartments, setAllApartments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("")
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const queryParameters = new URLSearchParams(window.location.search);

    useEffect(() => {
      if (queryParameters.has("query")) {
        setSearchQuery(queryParameters.get("query").toLowerCase());
      }

      let hits = [];
      let sugg = [];

      allApartments.forEach((apartment) => {
        if (apartment.toLowerCase().includes(searchQuery.toLowerCase())) {
          console.log(searchQuery.toLowerCase())
          hits.push(apartment);
        } else {
          for (let i = 0; i < searchQuery.length; i++) {
            if (apartment.indexOf(searchQuery.charAt(i)) >= 0) {
              sugg.push(apartment);
              break;
            }
          }
        }
      })
      setResults(hits);
      setSuggestions(sugg);
    }, [queryParameters.get("query")])


    useEffect(() => {
      getAllApartments();
    }, [])

    async function getAllApartments() {
      let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/apartments/name`;
  
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
            response.forEach((data) => {apartments.push(data.name)})
            setAllApartments(apartments);
          })
          .catch((e) => {
            console.log(e);
          });
      }

      const handleNav = (event) => {
        navigate(`/mainpage/${event.target.id.toLowerCase()}`);
      }

    function renderHits() {
      // console.log(results) //why does this work
      if (results.length !== 0) {
        return (
          <Stack>
            {
              results.map((res) => (
                <Link key={`hits_${res}`} onClick={handleNav} id={res}>{res}</Link>
              ))
            }
          </Stack>

        )
      } else if (suggestions.length !== 0) {
        return (
          <Stack>
            <Typography variant="body">No direct hits: Did you mean this?</Typography>
            {
              suggestions.map((res) => (
                <Link key={`sugg_${res}`} id={res} onClick={handleNav}>{res}</Link>
              ))
            }
          </Stack>

        )
      } else {
        return (
          <Typography>No results found</Typography>
        )
      }
    }

    return (
        <Grid>
            <NavBarComponent></NavBarComponent>
            <Typography variant="h1">Search Results</Typography>
            <Typography variant="h3">{` for ${searchQuery}: `}</Typography>
            {renderHits()}
            <Footer></Footer>
        </Grid>

    );
}
