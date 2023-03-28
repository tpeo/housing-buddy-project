import * as React from 'react';
import { useEffect, useState } from "react";
import { send } from 'emailjs-com';
import PostSubmissionModal from './PostSubmissionModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

import {
  Grid,
  Card,
  Box,
  Link,
  Button,
  Typography,
  Modal,
  TextField,
  IconButton,
  CardHeader
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

export default function AddApartmentModal({txt}) {
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
      <Button startIcon={<AddIcon/>} onClick={handleOpen} style={{color: "#0495b2"}}>{txt}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <CardHeader
            action={
              <IconButton align='left' onClick={() => {setOpen(false)}}>
                <ArrowBackIcon sx={{color:'white'}}/>
              </IconButton>
            }
            title={<Typography variant='h3' color='white' align='center'>Add an Apartment</Typography>}
            subheader={<Typography variant='body' color='white' align='center'>*West Campus Housing ONLY</Typography>}
            sx={{backgroundColor: '#0495b2'}}
          />

          <Box marginTop='15px'>
        <form onSubmit={handleSubmit}>
        <Grid container display="flex" alignItems="center" justify="center" direction="column" spacing={4}>
            <Grid item>
                <TextField
                id="apartmentname"
                label="Apartment Name"
                defaultValue=''
                type="text"
                onChange={handleInputChange}
                variant='outlined'
                required
                ></TextField>
            </Grid>
            <Grid item>
                <TextField
                id="location"
                label="Address"
                type="text"
                onChange={handleInputChange}
                required
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
              <Button variant="contained" sx={{backgroundColor: '#0495b2'}} type="submit">Submit Request</Button>
            </Grid>
            
        </Grid>
        </form>
        </Box>
        <Modal
          open={nestOpen}
          onClose={handleNestClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <PostSubmissionModal info={msg} nav="home" appt="home" ></PostSubmissionModal>
        </Modal>
        </Card>
      </Modal>
    </div>
  );
}
