import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { send } from 'emailjs-com';

import {
  Box,
  Card,
  CardHeader,
  Button,
  Typography,
  Modal,
} from "@mui/material"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  align: 'center',
  p: 4,
};

export default function PostSubmissionModal({info, nav, appt}) {
  const navigate = useNavigate();

  function navigateTo() {
    if (nav === "home") {
      navigate(`/`);
    } else if (nav === "app_main") {
      navigate(`../mainpage/${appt}`);
    }
  }

  return (
    <Card sx={style}>
      <CardHeader
        title={<Typography variant='h3' color='white' align='center'>Thank You!</Typography>}
        sx={{backgroundColor: '#0495b2'}}
      />
        <Typography variant="body1">{info}</Typography>
        <Button variant='outlined' sx={{color: '#0495b2'}} onClick={() => navigateTo()}>{`Return to ${appt}`}</Button>
    </Card>
  );
}
