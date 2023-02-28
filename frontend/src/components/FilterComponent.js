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
  Typography
} from '@mui/material'
var SortedMap = require("collections/sorted-map");

export default function FilterComponent({setOrder, elements}) {
  const filters = ['Overall Rating', 'Cost', 'Proximity', 'Spaciousness', "Amenities", "Management"];
  const map = new SortedMap();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseNavMenu = (event) => {
    filterHelper(event.currentTarget.innerText);
    setAnchorElUser(null);
  };

  function filterHelper(filter) {
    const lower = filter.toLowerCase();
    //populate sorted map
    elements.forEach((data) => {
      map.put(data[`${lower}`], data.name);
    });
    //from sorted map populate order
    setOrder(map.values());
    //pass objectsordered map to display
    
  }

  return (
<Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open filters">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <TuneIcon color="#0495b2" fontSize="large"></TuneIcon>
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
                    <MenuItem key={filter} onClick={() => handleCloseNavMenu()}>
                      <Typography textAlign="center">{filter}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
  );
}

