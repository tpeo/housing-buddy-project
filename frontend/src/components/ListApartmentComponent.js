import {
    Grid,
    Card,
    Button,
    Typography,
    CardActionArea
} from "@mui/material"
//import './fonts.css';
import { useNavigate } from "react-router-dom";

export default function ListApartmentComponent({name, handleOnClick, backgroundImage}) {
    // ^ add backgroundImage to the changing parameters
  return (
    <Card sx={{
        width: '300px',
        height: '300px',
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
        backgroundPosition: 'center'
    }}>
        <CardActionArea sx={{ flexGrow: 1 }}>
            <Typography variant="h4" color='white' fontFamily='Roboto'>
                {name}
            </Typography>
        </CardActionArea>
        <Button variant="contained" onClick={handleOnClick} sx={{ mt: 2 }}>
            Visit Page
        </Button>
    </Card>
  );
}
