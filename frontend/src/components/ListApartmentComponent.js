import React, { useState } from "react";
import {
    Grid,
    TextField,
    Button,
    CardContent
} from "@mui/material"

import { useNavigate } from "react-router-dom";

export default function ListApartmentComponent(name) {
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login');
    }

    const navigateAppa = () => {
        navigate('/apartments');
    }

  return (
    <div>
        <h3>name</h3>
    </div>
  );
}
