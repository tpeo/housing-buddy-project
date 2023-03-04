import React, { useState } from "react";
import RadioGroupRating from '../components/RatingComponent';
import NavBarComponent from "../components/NavBarComponent";
import Footer from "../components/Footer"
import {
    Grid,
    TextField,
    Stack,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Button,
    CardContent,
    Card,
    Box,
    Typography
} from "@mui/material"

import { useParams } from "react-router-dom";

export default function ReviewForm() {
  const params = useParams();
    
  const name = params.apartment;

    const defaultValues = {
        name: "name",
        title: "title",
        rating: 0,
        review: "hello"
      };
    
    const ratings = ["affordability", "management", "parking", "amenities", "proximity", "spaciousness"];
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setFormValues({
            ...formValues,
            [id]: value,
        });
    };

    const handleRatingChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    async function addRating() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/review/`;
    
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
      <Grid>
        <form onSubmit={handleSubmit}>
        <Grid container display="flex" alignItems="center" justify="center" direction="column" spacing={4}>
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
                id="title"
                label="Title"
                type="text"
                onChange={handleInputChange}
                ></TextField>
            </Grid>
            <Grid item display="flex" direction="column"> 
              <Typography variant="body">Overall Review</Typography>
                <RadioGroupRating
                    name="rating"
                    handleInputChange={handleRatingChange}
                ></RadioGroupRating>
            </Grid>
            <Grid id="category ratings" item>
              <Box sx={{flexGrow: 1}}>
              <Grid container spacing={2} 
                  display="flex"
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  >
                  {ratings.map((rating) => (
                      <Stack>
                        <Typography variant="body">{rating}</Typography>
                        <RadioGroupRating
                          name={rating}
                          handleInputChange={handleRatingChange}
                      ></RadioGroupRating>
                      </Stack>
                  ))}
              </Grid>
            </Box>

            </Grid>
            <Grid id="comments"item>
                <TextField id="review" label ="review" type="text" placeholder="review" multiline rows={2} maxRows={4} onChange={handleInputChange}> 
                </TextField>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Grid>
            
        </Grid>
        
      </form>
      </Grid>
    );
    
  return (
    <div>
      <NavBarComponent></NavBarComponent>
      <Box sx={{}}>
        <Card variant="outlined">{card}</Card>
      </Box>
      <Footer></Footer>
    </div>

  );
}
