import React, { useEffect, useState } from "react";
import NavBarComponent from '../components/NavBarComponent';
import OverviewComponent from "./OverviewComponent";
import Footer from '../components/Footer';
import {
    Grid,
    Box,
    Divider,
    Stack,
    Menu,
    Tooltip,
    MenuItem,
    Typography,
    IconButton,
    Button
} from "@mui/material"
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';

import { resolvePath, useNavigate } from "react-router-dom";

export default function AllApartments() {


  return (
    <OverviewComponent></OverviewComponent>
  );
}