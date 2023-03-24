import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/layout/LayoutComponent";
import {
    Grid,
    TextField,
    Box,
    Link, 
    Button,
    Card,
    CardContent,
    Typography,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    FormHelperText,
} from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function ApartmentComparisonPage() {
    const stat_obj = {
        "name": "",
        "rating": 0,
        "cleanliness": 0,
        "amenities": 0,
        "management": 0,
        "proximity": 0,
        "parking": 0,
        "spaciousness": 0,
    }

    const [first, setFirst] = useState('');
    const [second, setSecond] = useState('');
    const [stats1, setStats1] = useState(stat_obj);
    const [stats2, setStats2] = useState(stat_obj);
    const [allApartments, setAllApartments] = useState([]);

    const handleChange1 = (event) => {
        setFirst(event.target.value);
        getStats(event.target.value.toLowerCase(), setStats1);
    };

    const handleChange2 = (event) => {
        setSecond(event.target.value);
        getStats(event.target.value.toLowerCase(), setStats2);
    };

    const navigate = useNavigate();

    useEffect(() => {
        getAllApartments();
    }, [])

    const navApartmentPage = (event) => {
        navigate(`/mainpage/${event.target.id.toLowerCase()}`);
  
    }

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
            let appt = [];
            response.forEach((data) => {
                appt.push(data.name)
            })
              setAllApartments(appt);
            })
            .catch((e) => {
              console.log(e);
            });
        
        }

    async function getStats(name, number) {
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
                if (number === 1) {
                    setStats1(response);
                } else {
                    setStats2(response);
                }
              })
            .catch((e) => {
              console.log(e);
            });

      }

      //move displays to render function only when first selected?
  return (
    <LayoutComponent>
        <Grid display='flex' justifyContent='center'>
            <Grid id="appt-1" item>
                <FormControl sx={{ m: 1, minWidth: 120 }} >
                    <InputLabel id="demo-simple-0-disabled-label">Apartment 1</InputLabel>
                    <Select
                        labelId="demo-simple-select-disabled-label"
                        id="appt1select"
                        value={first}
                        label="First"
                        onChange={handleChange1}
                    >
                        {
                            allApartments.map((name, img) => (
                                <MenuItem id={name} value={name}>{name}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormHelperText>Appartment 1</FormHelperText>
                </FormControl>
                <Box>
                    <Typography>{first}</Typography>
                    <Typography>{stats1.rating}</Typography>
                    <Button id={first} onClick={navApartmentPage}>Visit Page</Button>
                </Box>
            </Grid>
            <Grid id="appt-2" item>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-disabled-label">Appartment 2</InputLabel>
                <Select
                labelId="demo-simple-select-disabled-label"
                id="appt2select"
                value={second}
                label="Second"
                onChange={handleChange2}
                >
                {
                    allApartments.map((name, img) => (
                        <MenuItem id={name} value={name}>{name}</MenuItem>
                    ))
                }
                </Select>
                <FormHelperText>Apartment 2</FormHelperText>
            </FormControl>
                <Box>
                    <Typography>{second}</Typography>
                    <Typography>{stats2.rating}</Typography>
                    <Button id={second} onClick={navApartmentPage}>Visit Page</Button>
                </Box>
            </Grid>
        </Grid>
    </LayoutComponent>
  );
}
