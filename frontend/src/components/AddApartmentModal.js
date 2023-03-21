import * as React from 'react';
import { useEffect, useState } from "react";
import { send } from 'emailjs-com';
import PostSubmissionModal from './PostSubmissionModal';

import {
  Grid,
  Box,
  Link,
  Button,
  Typography,
  Modal,
  TextField
} from "@mui/material"

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

export default function AddApartmentModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const defaultValues = {
    apartmentname: "name",
    location: "hello",
    review: "review"
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const [nestOpen, setNestOpen] = useState(false);
  const handleNestOpen = () => setNestOpen(true);
  const handleNestClose = () => setNestOpen(false);

  const [msg, setMsg] = useState("no submission");

  const handleInputChange = (e) => {
      const {id, value} = e.target;
      setFormValues({
          ...formValues,
          [id]: value,
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send(
    //   'service_jpp3un6',
    //   'housing-buddy-0392839',
    //   formValues,
    //   '68k_zMjh1nRJjIRlN'
    // )
    //   .then((response) => {
          setMsg("Request successfully sent");
    //     console.log('SUCCESS!', response.status, response.text); //make submission okay modal

    //   })
    //   .catch((err) => {
            //setMsg(`Request Failed ${err}`);
    //     console.log('FAILED...', err);

    //   });
    setNestOpen(true);
    //setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleOpen}>Don't See an Apartment? Request to Add One!</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
        <Grid container display="flex" alignItems="center" justify="center" direction="column" spacing={4}>
            <Grid item>
                <TextField
                id="apartmentname"
                label="Apartment Name"
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
                <TextField
                id="email"
                label="Email"
                type="text"
                onChange={handleInputChange}
                ></TextField>
            </Grid>
            <Grid id="comments"item>
                <TextField id="review" label ="Review" type="text" placeholder="Review" onChange={handleInputChange}> 
                </TextField>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Grid>
            
        </Grid>
        </form>
        <Modal
          open={nestOpen}
          onClose={handleNestClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <PostSubmissionModal info={msg} nav="home" appt="home" ></PostSubmissionModal>
        </Modal>
        </Box>
      </Modal>
    </div>
  );
}
