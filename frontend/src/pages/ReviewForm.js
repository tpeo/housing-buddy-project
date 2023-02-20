import React, { useState } from "react";
import RadioGroupRating from '../components/RatingComponent';
import {
    Grid,
    TextField,
    FormControlLabel,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Button,
    CardContent,
    Card,
    Box
} from "@mui/material"

export default function ReviewForm() {

    const defaultValues = {
        name: "name",
        location: "location",
        rating: 5
      };

    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        console.log(id);
        setFormValues({
            ...formValues,
            [id]: value,
        });
    };

    const handleRatingChange = (e) => {
        setFormValues({
            ...formValues,
            ["rating"]: e.target.value,
        });
    };

    async function addRating() {
        let apiCall = "http://localhost:4000/review/";
    
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
            body: JSON.stringify({ title: formValues.title, location: formValues.location, rating: formValues.rating })
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

    const card = (
      <React.Fragment>
        <CardContent>
        <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item>
                <TextField
                id="title"
                label="Title"
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
                    handleInputChange={handleRatingChange}
                ></RadioGroupRating>
            </Grid>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Grid>
        
    </form>
    </CardContent>
      </React.Fragment>
    );
    
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
