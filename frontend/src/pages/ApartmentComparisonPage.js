import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/layout/LayoutComponent";
import {
    Grid,
    Button,
    Card,
    CardHeader,
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
        getStats(event.target.value.toLowerCase(), 1);
    };

    const handleChange2 = (event) => {
        setSecond(event.target.value);
        getStats(event.target.value.toLowerCase(), 2);
    };

    const navigate = useNavigate();

    useEffect(() => {
        getAllApartments();
    }, [])

    const navApartmentPage = (event) => {
        navigate(`/mainpage/${event.target.id.toLowerCase()}`);
  
    }

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
        console.log("hello")
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/${name}/stats`;
    
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
                    console.log(response)
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

    const display1 = Object.keys(stats1).map(stat => 
        <Typography key={`stat1_${stat}`}>{`${stat}: ${stats1[stat]}`}</Typography>
    )

    const display2 = Object.keys(stats2).map(stat => 
        <Typography key={`stat1_${stat}`}>{`${stat}: ${stats2[stat]}`}</Typography>
    )

  return (
    <LayoutComponent>
        <Grid container display='flex' justifyContent='center' alignItems='space-around'>
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
                    allApartments.map((name) => (
                        (name !== second) && (
                            <MenuItem id={name} value={name}>{name}</MenuItem>
                    )
                    ))
                    
                }
                    </Select>
                    <FormHelperText>Appartment 1</FormHelperText>
                </FormControl>
                <Card>
                    <CardHeader
                        title={<Typography variant='h3' color='white' align='center'>{first}</Typography>}
                        sx={{backgroundColor: '#0495b2'}}
                    />
                    <CardContent>   
                        {display1}
                    </CardContent>
                    <Button id={first} onClick={navApartmentPage}>Visit Page</Button>
                </Card>
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
                    allApartments.map((name) => (
                        (name !== first) && (
                            <MenuItem id={name} value={name}>{name}</MenuItem>
                    )
                    ))
                    
                }
                </Select>
                <FormHelperText>Apartment 2</FormHelperText>
            </FormControl>
                <Card>
                    <CardHeader
                        title={<Typography variant='h3' color='white' align='center'>{second}</Typography>}
                        sx={{backgroundColor: '#0495b2'}}
                    />
                    <CardContent>   
                        {display2}
                    </CardContent>
                    <Button id={second} onClick={navApartmentPage}>Visit Page</Button>
                </Card>
            </Grid>
        </Grid>
    </LayoutComponent>
  );
}
