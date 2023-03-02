import * as React from 'react';
import { 
    Box,
    Typography,
    Link,
    createTheme
} from '@mui/material';
import { ThemeProvider } from '@emotion/react';

export default function ApartmentHeader({info}) {
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
        width: "100%",
        justifyContent: 'center',
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
          display: 'flex',
          flexDirection: 'row',  
          justifyContent: 'center'
        }}
      >
        <Typography variant="body1">VISIT THE </Typography>
        <Link href={info.link} target="_blank" rel="noopener noreferrer">{`${info.name} WEBSITE`}</Link>
        <Typography variant="body1">OR CALL </Typography>
        <Link href={`tel:${info.number}`}>{info.number}</Link>
        <Typography variant="body1"> FOR MORE INFORMATION</Typography>
      </Box>
        </ThemeProvider>
      
    </Box>
  );
}