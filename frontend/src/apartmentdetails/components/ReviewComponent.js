import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardActionArea,
    CardActions,
    Collapse,
    Stack,
    IconButton,
    CardContent,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    useScrollTrigger,
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import StaticRating from "./StaticRating";
import SentimentSatisfied from "@mui/icons-material/SentimentSatisfied";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    //transition: theme.transitions.create('transform', {
      //duration: theme.transitions.duration.shortest,
   // }),
  }));

export default function ReviewComponent({apartment, title, review, rating, fullR}) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = React.useState(false);
    const convertDate = new Date(fullR.date._seconds * 1000 + fullR.date._nanoseconds/1000000);
    const date = convertDate.toDateString();
    let tags = [];
    let flag = fullR.flagged;
    const [color, setColor] = useState("#0495b2");

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        tags = fullR.tags;
        if (flag) {
            setColor('red');
        }
    }, [])

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    function handleFlag(event) {
        updateFlag(event.target.id);
        setOpen(false);
    }

    async function updateFlag(id) {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/review/flag`;
        if (apartment === "") {return;}
            await fetch(apiCall, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                id: id,
                apartment: apartment,
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

    const ratings = ["Cleanliness", "Management", "Parking", "Amenities", "Proximity", "Spaciousness"];
    const stats = [];
    ratings.forEach((rating) => {
        stats.push(fullR[`${rating.toLowerCase()}`]);
    })

    const gridItem = {
        margin: "10px",
        width: "100%",
        height: "100%",
        position: 'relative',
        mb: 4,
        justifyContent: 'center',
        direction: 'column',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center'

    }   

    //verfiy user here?
    async function updateLikes(id, type) {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/review/${type}`;
        if (apartment === "") {return;}
            await fetch(apiCall, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                id: id,
                apartment: apartment,
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

    function handleLike(event, type) {
        updateLikes(event.currentTarget.id, type);
    }

  return (
    <Grid sx={{display: 'flex', justifyContent: 'center'}} item xs={4} sm={6} md={4}>
        <Card sx={gridItem} height="100%">
            <Grid name="main" display="flex" direction="row" justifyContent='space-between'>
                <Grid item >
                    <Box width={'120px'} marginLeft={'1rem'} sx={{backgroundColor: 'rgba(113, 218, 249, 0.33)'}}>
                            <Typography marginLeft='7px' component='h3' variant="h3" fontWeight={'bold'} color="inherit" paragraph>
                            {rating}/5
                            </Typography>
                    </Box>
                    <Typography variant="body">{fullR.name}</Typography>
                    <Stack direction="row">
                        <IconButton id={fullR.id} onClick={(event) => handleLike(event, "likes")}>
                            <ThumbUpOffAltOutlinedIcon style={{color: "#0495b2"}}></ThumbUpOffAltOutlinedIcon>
                        </IconButton>
                        <Typography variant="body">{fullR.likes}</Typography>
                        <IconButton id={fullR.id} onClick={(event) => handleLike(event, "dislikes")}>
                            <ThumbDownOffAltOutlinedIcon style={{color: "#0495b2"}}></ThumbDownOffAltOutlinedIcon>
                        </IconButton>
                        <Typography variant="body">{fullR.dislikes}</Typography>
                    </Stack>
                </Grid>
                <Grid item>
                    <Typography variant="h3">{title}</Typography>
                    
                    <StaticRating value={parseInt(rating)}></StaticRating>
                    <Typography variant="body1">{review}</Typography>
                    <CardActions>
                        <Typography variant="body">Click to see more</Typography>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Grid id="category ratings" display='flex' direction='row' justifyContent={'center'} item>
                            <Box sx={{flexGrow: 1}}>
                            <Grid container spacing={2} 
                                display="flex"
                                direction="row"
                                justifyContent="center"
                                alignItems="stretch"
                                marginLeft={'4%'}
                                width={'31rem'}
                                >
                                {ratings.map((rating, index) => (
                                    <Grid item xs={6} key={`individ_${rating}`}>
                                    <Stack direction="row">
                                        <SentimentSatisfied></SentimentSatisfied>
                                        <Box width={'120px'} marginLeft={'1rem'} sx={{backgroundColor: 'rgba(113, 218, 249, 0.33)'}}>
                                            <Typography marginLeft='7px' component='h3' variant="h3" fontWeight={'bold'} color="inherit" paragraph>
                                            {parseInt(stats[index]) || 0}/5
                                            </Typography>
                                        </Box>
                                        <Typography variant="body" color={'#0495b2'}>{rating}</Typography>
                                    </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                            </Box>

                            </Grid>
                        </CardContent>
                    </Collapse> 
                </Grid>
                <Grid id="tags" sx={{marginTop: '10px'}} item>
                    {(fullR.tags != undefined) &&(fullR.tags.map((tag) => (
                        <Typography sx={{ color: '#0495b2', border: 1, borderColor: '#0495b2', 
                            borderRadius: '20px', margin: '4px', backgroundColor: 'rgba(113, 218, 249, 0.33)'}} variant="body">{tag}</Typography>
                    )))}
                </Grid>
                <Grid sx={{margin: '10px'}} item>
                    <Typography>{date}</Typography>
                    <IconButton id={fullR.id} onClick={handleClickOpen}>
                        <OutlinedFlagIcon style={{color: color}}></OutlinedFlagIcon>
                    </IconButton>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title"> Confirm Flag to Review?</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Once you confirm, you cannot undo this, and the team will be notified. </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button id={fullR.id} onClick={(event) => handleFlag(event)} autoFocus>Agree</Button>
                        </DialogActions>
                    </Dialog>
                </Grid>
            </Grid>


        </Card>
    </Grid>

  );
}
