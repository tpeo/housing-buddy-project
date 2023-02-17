import React, { useEffect, useState } from "react";
import NavBarComponent from './components/NavBarComponent';
import ListApartmentComponent from "./components/ListApartmentComponent";
import {
    Grid,
    TextField,
    Button,
    CardContent
} from "@mui/material"

import { useNavigate } from "react-router-dom";
import './App.css';

export default function HomePage() {
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login');
    }

    const navigateAppa = () => {
        navigate('/apartments');
    }

    const [allApartments, setAllApartments] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getAllApartments();
    }, [])

    async function getAllApartments() {
        let apiCall = "http://localhost:4000/apartments/";
    
            await fetch(apiCall, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
          })
            .then((response) => {
              if (response.status !== 200) {
                throw new Error();
              }
              let apartments = [];
              response.forEach((data) => {apartments.push(data)})
              setAllApartments(apartments);
            })
            .catch((e) => {
              console.log(e);
            });
        }

        console.log(allApartments);

        const listItems = allApartments.map((ap) => <ListApartmentComponent name={ap}></ListApartmentComponent>);

  return (
    <div>
        <NavBarComponent></NavBarComponent>
        {listItems}
    </div>
  );
}
