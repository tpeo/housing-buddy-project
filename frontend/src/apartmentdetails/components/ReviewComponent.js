import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardActionArea,
    CardActions,
    Chip,
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
        window.location.reload(false);
    }

    async function updateFlag(id) {
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/review/flag`;
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
        backgroundColor: expanded ? 'white' : '#EEEEEE',
        backgroundPosition: 'center'

    }   

    //verfiy user here?
    async function updateLikes(id, type) {
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/review/${type}`;
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
        window.location.reload(false); //re-render only component by using state?
    }

  return (
    <Grid sx={{display: 'flex', justifyContent: 'center', marginTop: '20px'}} item xs={4} sm={6} md={4}>
        <Card sx={gridItem} height="100%" width='100%'>
            <Grid name="main" display="flex" direction="row" justifyContent='space-between' margin='5px' width='100%' spacing={1} container>
                <Grid alignItems='center' item >
                    <Box sx={{backgroundColor: 'rgba(113, 218, 249, 0.33)'}}>
                            <Typography marginRight='1rem' marginLeft='1rem' component='h3' variant="h3" fontWeight={'bold'} color="inherit" paragraph>
                            {Number(rating).toFixed(1)}/5
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
                <Grid xs={4} item>
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
                                width={'40rem'}
                                >
                                {ratings.map((rating, index) => (
                                    <Grid item  key={`individ_${rating}`}>
                                    <Stack direction="row" margin="10px">
                                        <SentimentSatisfied></SentimentSatisfied>
                                        <Box marginLeft={'1rem'} sx={{backgroundColor: 'rgba(113, 218, 249, 0.33)'}}>
                                            <Typography margin='7px' component='h3' variant="h3" fontWeight={'bold'} color="inherit" paragraph>
                                            {Number(stats[index]).toFixed(1) || 0}/5
                                            </Typography>
                                        </Box>
                                        <Typography variant="body" color={'#0495b2'} margin="10px">{rating}</Typography>
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
                        <Chip key={`chip_disp${tag}`} id={tag} sx={{color:"#0495b2", contrastText: "#0495b2", backgroundColor: "rgba(113, 218, 249, 0.33)"}} label={tag}></Chip>
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
