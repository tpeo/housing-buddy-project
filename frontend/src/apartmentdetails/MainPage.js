import React, { useEffect, useState } from "react";
import NavBarComponent from '../components/NavBarComponent';
import OverviewComponent from "./components/OverviewComponent";
import Footer from '../components/Footer';
import StaticRating from "./components/StaticRating";
import FilterComponent from "../components/FilterComponent";
import SortIcon from '@mui/icons-material/Sort';
import ApartmentHeader from "./components/ApartmentHeader";
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

import { useNavigate, useParams } from "react-router-dom";
import ReviewComponent from "./components/ReviewComponent";

export default function MainPage() {
    const params = useParams();
    
    const name = params.apartment;
    
    const info_obj = {
      "name": "name",
      "link": "link",
      "number": "number"
    }

    const [info, setInfo] = useState(info_obj);

    let navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getReviews();
        getInfo();
    }, [])

    const handleOnClick = () =>  {
        if (localStorage.getItem("loggedIn") == "true") {
            navigate(`/${name}/review`);
        } else {
            //push to login popup?
        }
    }

    async function getReviews() {
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/review/${name}`;
    
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
                let newRev = [];
                response.forEach((data) => {newRev.push(data)})
                setReviews(newRev);
              })
            .catch((e) => {
              console.log(e);
            });
        }

      async function getInfo() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/${name}/info`;
    
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
                console.log(response)
                setInfo(response);
              })
            .catch((e) => {
              console.log(e);
            });
        }

  return (
    <Grid name="main" display="flex" direction="column">
        <NavBarComponent></NavBarComponent>
        <ApartmentHeader info={info}></ApartmentHeader>
        <OverviewComponent name={info.name}></OverviewComponent>
        <Grid display="flex" direction="row" justifyContent="flex-end">
            <Button onClick={handleOnClick}>Add a review</Button>
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
        <Footer></Footer>
    </Grid>

  );
}