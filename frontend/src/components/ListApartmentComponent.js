import {
    Grid,
    Card,
    Button,
    Typography,
    CardActionArea
} from "@mui/material"
//import './fonts.css';
import { shadows } from '@mui/system';
import { useNavigate } from "react-router-dom";

export default function ListApartmentComponent({name, handleOnClick, backgroundImage}) {
    // ^ add backgroundImage to the changing parameters
  return (
    <Card id={name} onClick={handleOnClick} sx={{
        width: '20%',
        height: '43%',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        position: 'absolute',
        backgroundImage: `url(${backgroundImage})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'content-box',
        textAlign: 'center',
        overflow: 'hidden',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        borderRadius: '25px',
        boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)',
    }}>
        <CardActionArea sx={{ flexGrow: 1 }}>
            <Typography component='h3' variant="h3" color='white' fontWeight={'bold'} sx={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 1)' }}>
                {name}
            </Typography>
        </CardActionArea>
        <Button id={name} variant="contained" onClick={handleOnClick} sx={{ mt: 2 }}>
            Visit Page
        </Button>
    </Card>
  );
}
