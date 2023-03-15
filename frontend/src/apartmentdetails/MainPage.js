import React, { useEffect, useState } from "react";
import NavBarComponent from "../components/layout/NavBarComponent";
import OverviewComponent from "./components/OverviewComponent";
import Footer from '../components/layout/Footer';
import StaticRating from "./components/StaticRating";
import FilterComponent from "../components/FilterComponent";
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import ApartmentHeader from "./components/ApartmentHeader";
import {
    Grid,
    Box,
    Pagination,
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

    //new because this has to be constantly updated
    const stat_obj = {
      "rating": 0,
    }

    const [info, setInfo] = useState(info_obj);
    const [stats, setStats] = useState(stat_obj);
    const [page, setPage] = React.useState(1);

    let navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getReviews();
        getInfo();
        getStats();
    }, [])

    const reviewsPerPage = 1;
    const indexLast = page * reviewsPerPage;
    const indexFirst = indexLast - reviewsPerPage;
    const currentCards = reviews.slice(indexFirst, indexLast);
    
    const handleOnClick = () =>  {
        if (localStorage.getItem("loggedIn") == "true" && window.localStorage.getItem("@apartment") === name) {
            navigate(`/${name}/review`);
        } else {
            //push to login popup?
        }
    }

    const handlePageChange = (event, value) => {
      setPage(value);
    }

    async function getReviews() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/review/${name}`;
    
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
                setInfo(response);
              })
            .catch((e) => {
              console.log(e);
            });
        }

        async function getStats() {
          let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/${name}/stats`;
      
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
                  setStats(response);
                })
              .catch((e) => {
                console.log(e);
              });
          }

  return (
    <Grid name="main" display="flex" direction="column">
      <NavBarComponent></NavBarComponent>
        <ApartmentHeader info={info}></ApartmentHeader>
        <Box>
          <OverviewComponent name={info.name} rating={stats.rating}></OverviewComponent>
        </Box>
        <Box display={'flex'} direction={'row'} height={'70px'} bgcolor={'#EEEEEE'}>
          <Grid marginLeft={'2%'} container spacing={0} xs={10} position={'flex-start'} marginTop={'10px'} marginBottom={'10px'}> 
            <Button variant={'contained'} onClick={handleOnClick} style={{ backgroundColor: '#0495B2' }}>
              <AddIcon/>
                Create a Review
            </Button>
          </Grid>
          <Grid marginLeft={'100px'} position={'flex-end'} marginTop={'10px'}> 
            <IconButton style={{ color: '#0495B2' }}>
              <SortIcon fontSize="large"></SortIcon>
            </IconButton>
          </Grid>
          <Grid  marginTop={'5px'}>
            <FilterComponent></FilterComponent>
          </Grid>
        </Box>
        
        <Grid>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={4} 
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    >
                    {currentCards.map((r) => (
                        <ReviewComponent key={r.title}
                            title={r.title}
                            review={r.review}
                            rating={r.rating}
                        ></ReviewComponent>))}

                <Pagination count={3} page={page} 
                    onChange={handlePageChange} />
                </Grid>
            </Box>
        </Grid>
        <Footer></Footer>
    </Grid>

  );
}