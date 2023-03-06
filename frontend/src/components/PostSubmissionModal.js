import * as React from 'react';
import { useEffect, useState } from "react";
import { send } from 'emailjs-com';

import {
  Grid,
  Box,
  Link,
  Button,
  Typography,
  Modal,
  TextField
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
  p: 4,
};

export default function PostSubmissionModal({info}) {
  return (
    <Box sx={style}>
        <Typography variant="body1">{info}</Typography>
    </Box>
  );
}
