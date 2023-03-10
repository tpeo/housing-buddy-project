import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';

export default function ApartmentSelectComponent() {
  const [apartment, setApartment] = React.useState('');

  const [allApartments, setAllApartments] = useState([]);

  useEffect(() => {
    getAllApartments();
    }, []);

  async function getAllApartments() {
    let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/apartments/`;

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
            setAllApartments(response);
          })
        .catch((e) => {
          console.log(e);
        });
    }

  const handleChange = (event) => {
    setApartment(event.target.value);
  };

  async function updateApartment() {
    let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/user/apartment`;

    if (apartment === "") {return;}
        await fetch(apiCall, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            user_id: window.localStorage.getItem("user"), //have to parse this
            apartment: {apartment}
        })
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

  const handleSubmit = (event) => {
    updateApartment();
  }

  return (
    <Box sx={{ minWidth: 120 }}>
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Apartment</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={apartment}
          label="Age"
          onChange={handleChange}
        >
            {allApartments.map((name) => (
                <MenuItem value={name}>{name}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}
