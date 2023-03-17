import React from "react";
import {
    Grid,
    Card,
    CardActionArea,
    CardActions,
    Collapse,
    Button,
    Stack,
    IconButton,
    CardContent,
    Box,
    Typography,
} from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag';

import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import StaticRating from "./StaticRating";

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

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const ratings = ["Affordability", "Management", "Parking", "Amenities", "Proximity", "Spaciousness"];
    const stats = [];
    ratings.forEach((rating) => {
        stats.push(fullR[`${rating.toLowerCase()}`]);
    })

    const gridItem = {
        margin: "10px",
        width: "80%",
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
    <Grid item xs={4} sm={6} md={4}>
        <Card sx={gridItem} height="100%">
            <Grid name="main" display="flex" direction="row">
                <Grid item >
                    <Box width={'120px'} marginLeft={'1rem'} sx={{backgroundColor: 'rgba(113, 218, 249, 0.33)'}}>
                            <Typography marginLeft='7px' component='h3' variant="h3" fontWeight={'bold'} color="inherit" paragraph>
                            {rating}/5
                            </Typography>
                    </Box>
                    <Typography variant="body">name</Typography>
                    <Stack direction="row">
                        <IconButton id={fullR.id} onClick={(event) => handleLike(event, "likes")}>
                            <ThumbUpOffAltOutlinedIcon></ThumbUpOffAltOutlinedIcon>
                        </IconButton>
                        <Typography variant="body">{fullR.likes}</Typography>
                        <IconButton id={fullR.id} onClick={(event) => handleLike(event, "dislikes")}>
                            <ThumbDownOffAltOutlinedIcon></ThumbDownOffAltOutlinedIcon>
                        </IconButton>
                        <Typography variant="body">{fullR.dislikes}</Typography>
                    </Stack>
                </Grid>
                <Grid item>
                    <Typography variant="h1">{title}</Typography>
                    
                    <StaticRating value={rating}></StaticRating>
                    <Typography variant="body1">{review}</Typography>
                    <CardActions>
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
                                    <Grid item xs={6} key={rating}>
                                    <Stack>
                                        <Typography variant="body" color={'#0495b2'}>{rating}</Typography>
                                        <StaticRating
                                        value={stats[index] || 0}
                                    ></StaticRating>
                                    </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                            </Box>

                            </Grid>
                        </CardContent>
                    </Collapse> 
                </Grid>
                <Grid item>
                    <Typography>{date}</Typography>
                    <IconButton>
                        <OutlinedFlagIcon></OutlinedFlagIcon>
                    </IconButton>
                </Grid>
            </Grid>


        </Card>
    </Grid>

  );
}
