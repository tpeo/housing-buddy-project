import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box, 
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  breadcrumbsClasses
} from '@mui/material'
var SortedMap = require("collections/sorted-map");

export default function FilterComponent({collection, setOrder}) {
  const filters = ['Overall Rating', 'Cost', 'Proximity', 'Spaciousness', "Amenities", "Management"];
  const map = new SortedMap();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseNavMenu = (event) => {
    const filter = event.currentTarget.innerText;
    cacheFilter(filter);
    setOrder(localStorage.getItem(filter));
    setAnchorElUser(null);
  };

  function cacheFilter(filter) {
    if (localStorage.getItem(`_${filter}`) != null) {
      cacheSortedFilter(filter.toLowerCase());
    }
  }

  async function cacheSortedFilter(collection, filter) {
    let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/${collection}/${filter}`;

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
            let apartments = [];
            response.forEach((data) => {apartments.push(data)})
            localStorage.setItem(`_${filter}`, apartments);
          })
        .catch((e) => {
          console.log(e);
        });
    }


  function filterHelper(filter) {
    //add error handler for invalid
    let lower = filter.toLowerCase();
    switch(lower) {
      case "overall rating": 
        lower = "rating";
        break;
      default:
        //return;
    }
    // console.log(elements)
    // //populate sorted map
    // elements.forEach((data) => {
    //   console.log(data[`${lower}`]);
    //   map.set(data[`${lower}`], data.name); //handle equals
    // });
    // //from sorted map populate order
    // console.log(map);
    // setOrder(map.values());
    //pass objectsordered map to display
    
  }

  return (
<Box sx={{ flexGrow: 0 }} marginTop={'12px'}>
  <Tooltip title="Open filters">
    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
      <TuneIcon style={{color: "#0495b2"}} fontSize="large"></TuneIcon>
    </IconButton>
  </Tooltip>
  <Menu
    sx={{ mt: '45px' }}
    id="menu-appbar"
    anchorEl={anchorElUser}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    open={Boolean(anchorElUser)}
  >
    {filters.map((filter) => (
      <MenuItem key={filter} onClick={handleCloseNavMenu}>
        <Typography textAlign="center">{filter}</Typography>
      </MenuItem>
    ))}
  </Menu>
</Box>
  );
}

