import React, { useEffect, useState } from "react";
import LayoutComponent from "../components/layout/LayoutComponent";
import { useNavigate } from "react-router-dom";
import {verifyCredentials} from '../components/login/verifyCredentials';
import {
    Avatar,
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
    const [user, setUser] = useState({
      "name": "name",
      "email": "email"
    }); //do i have to do this?
    const [loaded, setLoaded] = useState(false);
    const [reviews, setReviews] = useState();

    useEffect(() => {
        const fetchData = async () => {
            getUser();
            setLoaded(true);
        }
        fetchData();
    }, []);


    async function getReviews() {
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/review/${user.name}`;
    
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

        async function getUser() {
          let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/user/info/${JSON.parse(window.localStorage.getItem("@user")).uid}`;
      
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
                  setUser(response);
                })
              .catch((e) => {
                console.log(e);
              });
          }
  
  function renderPage() {
    if (loaded) {
      return(
        <Grid>
            <Grid item>
              <Avatar src={window.localStorage.getItem("@pfp")}>
                <img src={window.localStorage.getItem("@pfp")} referrerPolicy="no-referrer"></img>
              </Avatar>
            </Grid>
            <Grid item>
              <Typography id="name">{user.name}</Typography>
              <Typography id="email">{user.email}</Typography>
              <Typography id="apartment">{user.apartment}</Typography>
            </Grid>

            <Button>Edit Profile</Button>
        </Grid>
      )
    } else {
      return null;
    }
  }

  return (
    <LayoutComponent>
    <Grid name="main" display="flex" direction="column">
      {renderPage()}
    </Grid>
    </LayoutComponent>

  );
}