import React, { useEffect, useState } from "react";
import NavBarComponent from "../components/layout/NavBarComponent";
import Footer from '../components/layout/Footer';
import { useNavigate } from "react-router-dom";
import {verifyCredentials} from '../components/login/verifyCredentials';
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

export default function UserProfile() {

    let navigate = useNavigate();
    const [user, setUser] = useState();
    const [loaded, setLoaded] = useState(false);
    const [reviews, setReviews] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setUser(await verifyCredentials(navigate, true));
            setLoaded(true);
        }
        fetchData();
    }, []);


    async function getReviews() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/review/${user.name}`;
    
            await fetch(apiCall, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.status !== 200) {
                throw new Error();
              }
              return response.json();
            })
            .then((response) => {
                let newRev = [];
                response.forEach((data) => {newRev.push(data)})
                setReviews(newRev);
              })
            .catch((e) => {
              console.log(e);
            });
        }
  
  function renderPage() {
    if (loaded) {
      return(
        <div>
            <Typography id="name">{user.name}</Typography>
            <Typography id="email">{user.email}</Typography>
            <Typography id="apartment">{user.apartment}</Typography>
            <Button>Edit Profile</Button>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <Grid name="main" display="flex" direction="column">
      <NavBarComponent></NavBarComponent>
      {renderPage()}
      <Footer></Footer>
    </Grid>

  );
}