import {
    Grid,
    Card,
    Button,
    Typography,
} from "@mui/material"

import { useNavigate } from "react-router-dom";
import StaticRating from "./StaticRating";

export default function ReviewComponent({title, review, rating}) {
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
        backgroundSize: 'cover',
        backgroundPosition: 'center'

    }   

  return (
    <Grid item xs={4} sm={6} md={4}>
        <Card sx={gridItem} height="100%">
            <Typography variant="h1">{title}</Typography>
            <StaticRating value={rating}></StaticRating>
            <Typography variant="body1">{review}</Typography>
        </Card>
    </Grid>

  );
}
