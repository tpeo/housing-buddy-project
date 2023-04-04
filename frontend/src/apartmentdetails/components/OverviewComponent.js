import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  Grid,
  Box, 
  Stack
} from '@mui/material';

import StaticRating from './StaticRating';

export default function OverviewComponent({rating, name, stats}) {

  const ratings = ["Cleanliness", "Management", "Parking", "Amenities", "Proximity", "Spaciousness"];
  return (
    <Paper
      sx={{
        position: 'relative',
        color: '#0495B2',
        height: '550px',
        mb: 0,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${process.env.PUBLIC_URL}/mainbanner.png)`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {/*<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />*/}

      <Box display="flex" direction="column" justifyContent="center" alignItems='center' sx={{backgroundColor: 'rgba(0,0,0,0)'}}>
        <Grid width={'100%'}>
          <Grid item xs={12}></Grid>
          <Grid width={'100%'} display={'flex'} direction={'row'} justifyContent={'center'}>
            <Typography component="h1" variant="h1" fontWeight={'bold'} color="inherit" gutterBottom>
              {name}
            </Typography>
          </Grid>
          <Grid container spacing={2} width={'100%'} display={'flex'} direction={'row'}>
            <Grid item xs={5}></Grid>
            <Grid flexDirection={'row'}>  
              <Grid flexDirection={'column'}>
                <Box marginLeft={'1rem'} sx={{backgroundColor: 'rgba(113, 218, 249, 0.33)'}}>
                    <Typography marginRight='1rem' marginLeft='1rem' component='h3' variant="h3" fontWeight={'bold'} color="inherit" paragraph>
                      {Number(rating).toFixed(1)}/5
                    </Typography>
                </Box>
                <Box marginLeft={'25px'}>
                  <Typography variant={'h10'}>Overall Rating</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <StaticRating value={Math.round(Number(rating).toFixed(1))}></StaticRating>
            </Grid>
            <Grid marginTop={'20px'} width={'100%'} display={'flex'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
              <Grid width={'60%'} height={'245px'} sx={{border: '7px solid #0495B2'}} display={'flex'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
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
                                          value={parseInt(stats[rating.toLowerCase()]) || 0}
                                        ></StaticRating>
                                    </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                            </Box>
              </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

//took this out for now since it has no functionality 
//</Grid>
//<Grid key="review and sort"></Grid>
//<Grid></Grid>

// OverviewComponent.propTypes = {
//   post: PropTypes.shape({
//     description: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     imageText: PropTypes.string.isRequired,
//     linkText: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//   }).isRequired,
// };
