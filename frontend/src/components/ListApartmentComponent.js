import {
    Grid,
    Card,
    Button,
    Typography,
    CardActionArea
} from "@mui/material"

import { useNavigate } from "react-router-dom";

export default function ListApartmentComponent({name, handleOnClick}) {
    const navigate = useNavigate();

    const gridItem = {
        margin: "10px",
        width: "80%",
        height: "100%",
        position: 'relative',
        mb: 4,
        justifyContent: 'center',
        direction: 'column',
        alignItems: 'center',
        backgroundImage: `url('/apartments/lark.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'

    }   

  return (
    <Grid id={name} item xs={4} sm={6} md={4}>
        <Card sx={gridItem}  key={name} height="100%" >
            <CardActionArea sx={{
                cardActionArea: {
                    flexGrow: 1,
                    flexDirection: 'column',
                    alignItems: 'stretch',
                  },
            }}>
                <Typography variant="h2">{name}</Typography>
                <Button id={name} onClick={handleOnClick}>Visit Page</Button>                
            </CardActionArea>

        </Card>
    </Grid>

  );
}
