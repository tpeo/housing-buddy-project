import {
    Grid,
    Card,
    Button,
} from "@mui/material"

import { useNavigate } from "react-router-dom";

export default function ListApartmentComponent(name) {
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
    <Grid item xs={4} sm={6} md={4}>
        <Card sx={gridItem}  key={name} height="100%">
            <h2></h2>
            <Button>Visit Page</Button>
        </Card>
    </Grid>

  );
}
