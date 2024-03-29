import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/layout/LayoutComponent";
import AddApartmentModal from "../components/AddApartmentModal";
import MapComponent from "../components/MapComponent";
import InfiniteScroll from 'react-infinite-scroll-component';
import {
    Grid,
    Box,
    Link, 
    Item,
    Button,
    Card,
    Typography
} from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function AllApartmentsPage() {
    const navigate = useNavigate();
    const [allApartments, setAllApartments] = useState([]);

    useEffect(() => {
      getAllApartments();
  }, [])

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    //use effect update whenever soomething changes

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
              response.forEach((data) => {apartments.push(data)})
              setAllApartments(apartments);
            })
            .catch((e) => {
              console.log(e);
            });
        }

        const navApartmentPage = (event) => {
          navigate(`/mainpage/${event.target.id.toLowerCase()}`);
    
        }

        const windowNav = (e) => {
          e.preventDefault();
          
          const letter = e.target.id.toLowerCase();
          let loc = "";
          const length = allApartments.length;
          for (let i = 0; i < length; i++) {
            let cur = allApartments[i];
            if (cur.name.toString().toLowerCase().startsWith(letter)) {
              loc = cur.name;
              break;
            }
          }
          window.location.replace(`#${loc}`);
        }


  return (
    <LayoutComponent>
        <Typography variant="h3" fontWeight={'bold'} color={'#0495b2'} align='center'>All Apartments</Typography>
        <Grid 
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >

        <Grid width='50%' margin='20px' display="flex"
                flexDirection='column' item>


          <Box sx={{flexGrow: 1}}>
              <Grid width="100%" container spacing={1} 
                  display="flex"
                  justifyContent="center"
                  alignItems="stretch"
                  >


                    <div
                      id="scrollableDiv"
                      style={{
                        height: "800px",
                        width: "95%",
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                      }}>
                   <InfiniteScroll
                      dataLength={allApartments.length}
                      style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                      loader={<h4>Loading...</h4>}
                      scrollableTarget="scrollableDiv"
                    >
                  {allApartments.map((obj) => (
                            <Card 
                              key={`app-card-${obj.name}`}
                              sx={{
                                width: '95%',
                                height: '150px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxSizing: 'content-box',
                                textAlign: 'center',
                                overflow: 'hidden',
                                backgroundImage: `url(${obj.img_link})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '25px',
                                boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)',
                                margin: '10px'
                          }}>
                              <Button sx={{
                                width: "500px",
                                height: "49px",
                              }}
                              id={obj.name}
                              key={`allapp-button-${obj.name}`}
                              onClick={navApartmentPage}
                              >
                                <Typography key={`allapp-label-${obj.name}`} id={obj.name} component='h3' variant="h3" color='white' fontWeight={'bold'} 
                                      sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                                  {obj.name}
                              </Typography>
                              </Button>
                              
                            </Card>
  ))}
  </InfiniteScroll>
  </div>  
  <Grid item
                display="flex"
                flexDirection='column'
                justifyContent="center"
                alignItems="stretch"
              >
              {alphabet.map((letter) => (
                <Link key={letter} id={letter} underline="hover"  onClick={windowNav} sx={{color: '#0495b2'}}>{letter}</Link>
              ))}
         </Grid>
  </Grid>
  </Box>
  </Grid>

          

        </Grid>
        <Grid display='flex' justifyContent='center' item>
          <AddApartmentModal txt={"Don't See an Apartment? Request to Add One!"}/>
        </Grid>
        <MapComponent/>
        
    </LayoutComponent>
  );
}
