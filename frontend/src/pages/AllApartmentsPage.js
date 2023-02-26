import React, { useEffect, useState } from "react";
import NavBarComponent from '../components/NavBarComponent';
import Footer from '../components/Footer'
import ListApartmentComponent from "../components/ListApartmentComponent";
import {
    Grid,
    TextField,
    Button,
    CardContent
} from "@mui/material"

export default function AllApartmentsPage() {

    const [allApartments, setAllApartments] = useState([]);
    //use effect update whenever soomething changes

    useEffect(() => {
        getAllApartments();
    }, [])

    async function getAllApartments() {
        let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/apartments/`;
    
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
              let apartments = [];
              response.forEach((data) => {apartments.push(data)})
              setAllApartments(apartments);
            })
            .catch((e) => {
              console.log(e);
            });
        }

        console.log(allApartments);


  return (
    <div>
        <NavBarComponent></NavBarComponent>
        <Footer></Footer>
    </div>
  );
}
