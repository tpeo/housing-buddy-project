import React, { useEffect, useState } from "react";
import OverviewComponent from "./components/OverviewComponent";
import FilterComponent from "../components/FilterComponent";
import AddIcon from '@mui/icons-material/Add';
import ApartmentHeader from "./components/ApartmentHeader";
import ApartmentSelectComponent from "../components/ApartmentSelectComponent"
import AddApartmentModal from "../components/AddApartmentModal"
import LayoutComponent from "../components/layout/LayoutComponent";
import {
    Grid,
    Box,
    Pagination,
    Typography,
    Modal,
    Button
} from "@mui/material"

import { useNavigate, useParams } from "react-router-dom";
import ReviewComponent from "./components/ReviewComponent";

export default function MainPage() {
    const params = useParams();
    
    const name = params.apartment;
    const [open, setOpen] = useState(false);
    //const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const info_obj = {
      "name": "name",
      "link": "link",
      "number": "number"
    }

    //new because this has to be constantly updated
    const stat_obj = {
      "rating": 0,
      "affordability": 0,
      "amenities": 0,
      "management": 0,
      "proximity": 0,
      "parking": 0,
      "spaciousness": 0,
    }

    const [info, setInfo] = useState(info_obj);
    const [stats, setStats] = useState(stat_obj);
    const [page, setPage] = React.useState(1);

    let navigate = useNavigate();
    const [reviews, setReviews] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getReviews();
        console.log(reviews)
        getInfo();
        getStats();
    }, [])

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const reviewsPerPage = 1;
    const indexLast = page * reviewsPerPage;
    const indexFirst = indexLast - reviewsPerPage;
    const currentCards = reviews.slice(indexFirst, indexLast);
    

    const handleOnClick = () =>  {
        if (localStorage.getItem("loggedIn") === "true") {
            if (window.localStorage.getItem("@apartment") === name) {
              navigate(`/${name}/review`);
            } else if (window.localStorage.getItem("@apartment") === null) {
              setOpen(true)
            } else {
              //don't allow them ->
            }
        } else {

        }
    }

    const handlePageChange = (event, value) => {
      setPage(value);
    }

    async function getReviews() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/review/${name.toLowerCase()}`;
    
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
    <LayoutComponent>
    {
      <Grid name="main" display="flex" direction="column">
        <ApartmentHeader info={info}></ApartmentHeader>
        <Box>
          <OverviewComponent name={info.name} rating={stats.rating} stats={stats}></OverviewComponent>
        </Box>
        <Box display={'flex'} direction={'row'} height={'70px'} bgcolor={'#EEEEEE'}>
          <Grid marginLeft={'2%'} container spacing={0} xs={10} position={'flex-start'} marginTop={'10px'} marginBottom={'10px'} item> 
            <Button variant={'contained'} onClick={handleOnClick} style={{ backgroundColor: '#0495B2' }}>
              <AddIcon/>
                Create a Review
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography>Where are you living?</Typography>
                <ApartmentSelectComponent></ApartmentSelectComponent>
                <AddApartmentModal></AddApartmentModal>
            </Box>
        </Modal>
          </Grid>
          <Grid  marginTop={'5px'}>
            <FilterComponent apartment={name} collection="review" setOrder={setReviews}></FilterComponent>
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
                            apartment={name}
                            title={r.title}
                            review={r.review}
                            rating={r.rating}
                            fullR={r}
                        ></ReviewComponent>))}

                <Pagination count={3} page={page} 
                    onChange={handlePageChange} />
                </Grid>
            </Box>
        </Grid>
    </Grid>

    }
  </LayoutComponent>
    
  );
}