import * as React from 'react';
import { 
    Divider,
    Box,
    Typography,
    Container,
    Link,
    Grid,
    TextField,
    Button,
    Stack,
    createTheme
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { ThemeProvider } from '@emotion/react';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        2023HousingBuddy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
    const theme = createTheme({
        typography: {
            body1: {
              color: 'white'
            },
            h1: {
              color: "#0495b2"
            },
            button: {
              color: "#71daf9"
            }
          }
    });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: "100%",
        minHeight: '50vh',
      }}
    >

        <ThemeProvider theme={theme}>
        <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? "#0495b2"
              : theme.palette.grey[800],
        }}
      >
        <Grid component="footer" 
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
             }}>
            <Grid key="contact">
                <Typography variant="body1">Contact Us</Typography>
                <Typography variant="body1">000-000-0000</Typography>
                <href>housingbuddy@gmail.com</href>
            </Grid>
            <Grid>
                <Typography variant="body1">APARTMENT MARKETING INSIGHTS TO YOUR INBOX</Typography>
                <form>
                    <TextField
                    id="email"
                    label="Email"
                    type="text"
                    ></TextField> 
                    <Button variant="button" color="primary" type="submit">Submit</Button>
                </form>
            </Grid> 
            <Grid key="follow">
                <Typography variant="body1">FOLLOW US</Typography>
                <Stack direction="row">
                    <FacebookIcon></FacebookIcon>
                    <TwitterIcon></TwitterIcon>
                    <InstagramIcon></InstagramIcon>
                </Stack>
            </Grid>
        </Grid>


        <Container maxWidth={false}>
            <Divider></Divider>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="body1">
            Apartment Marketing Austin, Texas. All Rights Reserved
            </Typography>
            <Typography variant="body1">
             PRIVACY POLICY
            </Typography>
            <Typography variant="body1">
             TERMS AND CONDITIONS
            </Typography>
            </Stack>
            <Copyright />
        </Container>
      </Box>
        </ThemeProvider>
      
    </Box>
  );
}