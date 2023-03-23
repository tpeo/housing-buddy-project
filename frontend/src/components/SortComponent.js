import * as React from 'react';
import { useState, useEffect} from 'react';
import SortIcon from '@mui/icons-material/Sort';

import {
  Box, 
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
} from '@mui/material'
import { Stack } from '@mui/system';
import { connectStorageEmulator } from 'firebase/storage';

export default function SortComponent({apartment, setOrder}) {
    let tagDefault = {
        affordability: false,
        management: false,
        parking: false,
        amenities: false,
        proximity: false,
        spaciousness: false
    }

  const tags = ['Cost', 'Proximity', 'Spaciousness', "Amenities", "Management"];
  const [tagValues, setTagValues] = useState(tagDefault);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [clicks, setClicks] = useState(0);

  const [showTags, setShowTags] = useState([]);

  useEffect(() => {

  }, [showTags])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.target);
    
  };


  const handleCloseNavMenu = (event) => {
    filterTags(showTags);
    setAnchorElUser(null);
  };

  const handleCheck = (event) => {
    const tag = event.target.id.toLowerCase();
    const prev = tagValues[tag]
    setTagValues({
        ...tagValues,
        [tag]: !prev
    });

    let selected = showTags;
    console.log(selected)
    if (tagValues[tag] === false) {
        selected.push(tag)
    } else {
        var idx = selected.indexOf(tag);
        if (idx !== -1) {
            selected.splice(idx, 1)
        }
    }

    console.log(selected)
    setShowTags(selected);
  }

  async function filterTags(tags) {
    if (tags === undefined) {
        return;
    }
    const stringTag = JSON.stringify(tags);
    console.log(stringTag)
    const apiCall = `http://${process.env.REACT_APP_HOSTNAME}/review/${apartment}/tags/${tags}`;

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
            setOrder(response)
          })
        .catch((e) => {
          console.log(e);
        });
    }


  return (
<Box sx={{ flexGrow: 0 }} marginTop={'12px'}>
  <Tooltip title="Open filters">
  <IconButton>
        <SortIcon onClick={handleOpenUserMenu} sx={{ p: 0 }} style={{color: "#0495b2"}} fontSize="large"></SortIcon>
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
    onClose={handleCloseNavMenu}
  >
    <MenuItem key="checkboxes">
        <Stack>
            <Box>
                {(showTags != undefined) &&(showTags.map((tag) => (
                            <Typography sx={{ color: '#0495b2', border: 1, borderColor: '#0495b2', 
                                borderRadius: '20px', margin: '4px', backgroundColor: 'rgba(113, 218, 249, 0.33)'}} variant="body">{tag}</Typography>
                )))}
            </Box>
            <Divider></Divider>
            <Box>
                <FormControl component='checkboxes'>
                <FormLabel>Tags</FormLabel>
                <FormGroup style={{overflow: 'auto'}}>
                {tags.map((tag, idx) => (
                    <FormControlLabel
                        id={tag}
                        control={<Checkbox id={tag} key={idx} onClick={handleCheck} />}
                        label={tag}
                        labelPlacement='end'
                    />
                    ))}
                </FormGroup>
            </FormControl>

            </Box>
            <Button onClick={handleCloseNavMenu}>Save</Button>
        </Stack>
    </MenuItem>
  </Menu>
</Box>
  );
}

