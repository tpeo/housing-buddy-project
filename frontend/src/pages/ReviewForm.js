import React, { useState } from "react";
import RadioGroupRating from '../components/RatingComponent';
import NavBarComponent from "../components/NavBarComponent";
import Footer from "../components/Footer"
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

export default function ReviewForm({name}) {

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
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/review/`;
    
        if (formValues.review === "") {return;}
            await fetch(apiCall, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              apartment: {name},
              title: formValues.title, 
              name: formValues.name, //what if null?
              rating: formValues.rating,
              review: formValues.review,
              affordability: formValues.affordability,
              amenities: formValues.amenities,
              management: formValues.management,
              proximity: formValues.proximity,
              spaciousness: formValues.spaciousness,
            })
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
    <div>
      <NavBarComponent></NavBarComponent>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">{card}</Card>
      </Box>
      <Footer></Footer>
    </div>

  );
}
