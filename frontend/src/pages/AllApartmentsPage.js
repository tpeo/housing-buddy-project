import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/layout/LayoutComponent";
import AddApartmentModal from "../components/AddApartmentModal";
import {
    Grid,
    TextField,
    Box,
    Link, 
    Button,
    Card,
    CardContent,
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
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/apartments/name`;
    
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
        <Typography variant="h1">All Apartments</Typography>
        <Grid 
          display="flex"
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
        >

        <Grid width='50%' margin='20px' item>
          <Box sx={{flexGrow: 1}}>
              <Grid width="100%" container spacing={1} 
                  display="flex"
                  direction="column"
                  justifyContent="center"
                  alignItems="stretch"
                  >
                  {allApartments.map((obj) => (
                            <Card sx={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              boxSizing: 'content-box',
                              textAlign: 'center',
                              overflow: 'hidden',
                              backgroundImage: `url(${obj.img_link})`,
                              backgroundSize: '100% 100%',
                              backgroundPosition: 'center',
                              borderRadius: '25px',
                              boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)',
                              margin: '10px'
                          }}>
                              <Button sx={{
                                width: "150px",
                                height: "49px",
                              }}
                              id={obj.name}
                              key={obj.name}
                              onClick={navApartmentPage}
                              >
                                <Typography id={obj.name} component='h3' variant="h3" color='white' fontWeight={'bold'} 
                                      sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                                  {obj.name}
                              </Typography>
                              </Button>
                              
                            </Card>
  ))}
              </Grid>
          </Box>
        </Grid>

          <Grid item
            display="flex"
            direction="column"
            justifyContent="center"
            alignItems="stretch"
          >
          {alphabet.map((letter) => (
            <Link id={letter} onClick={windowNav}>{letter}</Link>
          ))}
          </Grid>

        </Grid>
        <Grid display='flex' justifyContent='center' item>
          <AddApartmentModal txt="Don't See an Apartment? Request to Add One!"/>
        </Grid>

        
    </LayoutComponent>
  );
}
