import React, { useState } from "react";
import RadioGroupRating from '../components/RatingComponent';
import NavBarComponent from "../components/layout/NavBarComponent";
import Footer from "../components/layout/Footer"
import PostSubmissionModal from "../components/PostSubmissionModal";
import { styled } from '@mui/material/styles';
import {
    Grid,
    TextField,
    Stack,
    Button,
    Modal,
    Card,
    Box,
    Typography
} from "@mui/material"

import { useParams } from "react-router-dom";
import { fontFamily, fontWeight } from "@mui/system";

export default function ReviewForm() {
  const params = useParams();
    
  const name = params.apartment;
  const user_obj = JSON.parse(window.localStorage.getItem("@user"));

  const defaultValues = {
      name: "name",
      title: "title",
      rating: 0,
      review: "hello"
    };
  
  const defaultTags = {
    cleanliness: false,
    management: false,
    parking: false,
    amenities: false,
    proximity: false,
    spaciousness: false
  }
    
    const ratings = ["Cleanliness", "Management", "Parking", "Amenities", "Proximity", "Spaciousness"];
    const [formValues, setFormValues] = useState(defaultValues);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [tags, setTags] = useState(defaultTags);
  
    const [msg, setMsg] = useState("no submission");

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
            [e.target.name.toLowerCase()]: e.target.value
        });
    };

    async function addRating() {
      
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/review/new/${user_obj.uid}`;

        let selected = [];
        for (const tag in tags) {
          if (tags[tag] === true) {
            selected.push(tag)
          }
        }
    
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
              cleanliness: formValues.cleanliness,
              amenities: formValues.amenities,
              management: formValues.management,
              parking: formValues.parking,
              proximity: formValues.proximity,
              spaciousness: formValues.spaciousness,
              tags: selected
            })
          })
            .then((response) => {
              setMsg("Review Submitted Successfully!");
              if (response.status !== 200) {
                setMsg("Review Failed");
                throw new Error();
              }
              return response.json();
            })
            .then((response)=> {
              const user_obj = JSON.parse(window.localStorage.getItem("@user"));
              user_obj["review"] = response;
              window.localStorage.setItem("@user", JSON.stringify(user_obj));
            })
            .catch((e) => {
              console.log(e);
            });
        }

        async function deleteRating() {
          let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/review/delete`;
          if (formValues.review === "") {return;}
              await fetch(apiCall, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                apartment: {name},
                uid: user_obj.uid,
                review_id: user_obj.review
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
        setOpen(true);
        if (user_obj.review_id !== undefined) {
          deleteRating();
        }
        addRating();
        //after submit erase input
    };

    const handleTags = (event) => {
      const tag = event.target.id.toLowerCase()
      const prev = tags[tag]

      if (prev === true) {
        //set color
      }

      setTags({
        ...tags,
        [tag]: !prev
      });

    }

    const card = (
      <Grid>
        <form onSubmit={handleSubmit}>
        <Grid container display="flex" alignItems="center" justify="center" direction="column" spacing={4} marginTop={'3%'} marginBottom={'3%'}>
            <Grid item>
                <Typography color={"#0495b2"} fontWeight={'bold'}>Name (optional)</Typography>
                <TextField
                id="name"
                label="Name"
                type="text"
                onChange={handleInputChange}
                ></TextField>
                <Typography color={"#0495b2"} fontSize={'10px'}>First & Last Name</Typography>
            </Grid>
            <Grid item>
                <Typography color={"#0495b2"} fontWeight={'bold'}>Title</Typography>
                <TextField
                id="title"
                label="Title"
                type="text"
                onChange={handleInputChange}
                ></TextField>
            </Grid>
            <Grid item display="flex" > 
              <Typography variant="body" color={"#0495b2"} fontWeight={'bold'}>Overall Review</Typography>
                <RadioGroupRating
                    name="rating"
                    handleInputChange={handleRatingChange}
                    styled={{}}
                ></RadioGroupRating>
            </Grid>
            <Grid id="category ratings" display='flex' justifyContent={'center'} item>
              <Box sx={{flexGrow: 1}}>
              <Grid container spacing={2} 
                  display="flex"
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  marginLeft={'4%'}
                  width={'31rem'}
                  >
                  {ratings.map((rating) => (
                      <Grid item xs={6} key={rating}>
                      <Stack>
                        <Typography variant="body" color={'#0495b2'}>{rating}</Typography>
                        <RadioGroupRating
                          name={rating}
                          handleInputChange={handleRatingChange}
                      ></RadioGroupRating>
                      </Stack>
                      </Grid>
                  ))}
              </Grid>
            </Box>

            </Grid>
            <Grid id="comments" width={'450px'} display='flex' direction='column' justifyContent={'center'} item>
                <Typography color={"#0495b2"} fontWeight={'bold'}>Comments (optional)</Typography>
                <TextField id="review" label ="Type your review here" type="text" placeholder="Review" multiline rows={2} onChange={handleInputChange}> 
                </TextField>
            </Grid>
            <Grid id="tags" item>
              <Stack id="button-group" direction="row">
                {ratings.map((rating) => (
                  <Button onClick={handleTags} variant="outlined" id={rating}
                  style={{color: '#12AAC9', '&:click': {color: 'success',}, '&:iconFill': {color: 'success',}, borderRadius: '16px'}}> {rating} </Button>
                ))}
              </Stack>
            </Grid>
            <Grid item>
              <Button variant="contained" style={{backgroundColor: '#0495B2', fontWeight:'bold', fontFamily:'sans-serif'}} color="primary" type="submit">Submit Review</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
              <PostSubmissionModal info={msg} nav="app_main" appt={name}></PostSubmissionModal>
            </Modal>
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
