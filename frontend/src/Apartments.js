import React, { useState } from "react";
import RadioGroupRating from './components/RatingComponent';
import {
    Grid,
    TextField,
    FormControlLabel,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Button
} from "@mui/material"

import './App.css';

export default function Apartments() {

    const defaultValues = {
        name: "name",
        location: "location",
        rating: 5
      };

    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        console.log(value);
        setFormValues({
            ...formValues,
            [id]: value,
        });
    };

    async function addRating() {
        let apiCall = "http://localhost:4000/apartments/";
    
        if (formValues.name === "") {return;}
            await fetch(apiCall, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify({ name: formValues.name, location: formValues.location, rating: formValues.rating })
          })
            .then((response) => {
              if (response.status !== 200) {
                throw new Error();
              }
              console.log(formValues);
            })
            .catch((e) => {
              console.log(e);
            });
        }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        addRating();
        //after submit erase input
    };
    
  return (
    <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item>
                <TextField
                id="name"
                label="Name"
                type="text"
                onChange={handleInputChange}
                ></TextField>
            </Grid>
            <Grid item>
                <TextField
                id="location"
                label="Location"
                type="text"
                onChange={handleInputChange}
                ></TextField>
            </Grid>
            <Grid item>
                <RadioGroupRating
                    handleInputChange={handleInputChange}
                ></RadioGroupRating>
            </Grid>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Grid>
        
    </form>
  );
}
