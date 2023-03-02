import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import StaticRating from './StaticRating';

export default function OverviewComponent({rating, name}) {

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
        backgroundImage: `url(${process.env.PUBLIC_URL}/tempblankbckgd.png)`,
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
                <Box width={'120px'} marginLeft={'1rem'} sx={{backgroundColor: 'rgba(113, 218, 249, 0.33)'}}>
                    <Typography marginLeft='7px' component='h3' variant="h3" fontWeight={'bold'} color="inherit" paragraph>
                      4.5/5
                    </Typography>
                </Box>
                <Box marginLeft={'25px'} marginTop={0} paddingTop={0}>
                  <Typography variant={'h10'}>Overall Rating</Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <StaticRating value={rating}></StaticRating>
              <Link variant="subtitle1" href="#"></Link>
            </Grid>
            <Grid marginTop={'20px'} width={'100%'} display={'flex'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
              <Grid width={'60%'} height={'245px'} sx={{border: '7px solid #0495B2'}} display={'flex'} direction={'row'} justifyContent={'center'} alignItems={'center'}>
                <Typography margin={'2%'}>ratings</Typography>
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

OverviewComponent.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
