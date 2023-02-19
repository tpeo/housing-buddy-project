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
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url()`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {/*<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />*/}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6} display="flex" direction="column" justifyContent="center">
            <Grid>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    {name}
                </Typography>
            </Grid>
            <Grid display="flex" justifyContent="center">
                <Typography variant="h5" color="inherit" paragraph>
                4.5/5
                </Typography>
                <StaticRating value={rating}></StaticRating>
                <Link variant="subtitle1" href="#">
                </Link>
            </Grid>
        </Grid>
      </Grid>
      <Grid key="review and sort">

      </Grid>
      <Grid>
      </Grid>
    </Paper>
  );
}

OverviewComponent.propTypes = {
  post: PropTypes.shape({
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
