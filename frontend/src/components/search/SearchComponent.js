import React from "react";
import {
    Stack,
    InputBase,
    IconButton,
    Link,
    createTheme,
    Button,
    TextField,
    Icon,
    Grid,
} from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef, useStyles } from "react";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { ThemeProvider } from '@emotion/react';


const filter = createFilterOptions();

export default function SearchComponent() {

    const navigate = useNavigate();

    const [allApartments, setAllApartments] = useState([]);
    const [value, setValue] = React.useState(null);

    useEffect(() => {
      getAllApartments();
    }, [])

    async function getAllApartments() {
      let apiCall = `https://${process.env.REACT_APP_HOSTNAME}/apartments/name`;
  
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
            response.forEach((data) => {apartments.push(data.name)})
            setAllApartments(apartments);
          })
          .catch((e) => {
            console.log(e);
          });
      }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha('#B1B3BC', 0.15),
        '&:hover': {
          backgroundColor: alpha('#B1B3BC', 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));

      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));

      const navSearch = () => {
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({query: value.title})}`
        });
        window.location.reload(false);
      }

      const navApartmentPage = (event) => {
        navigate(`/mainpage/${event.target.innerText.toLowerCase()}`);
  
      }

    return (
        <Search style={{ display: 'flex', flexDirection:'row', alignItems: 'center', minHeight:'55px', marginRight:'10px' }}>
            <IconButton onClick={navSearch} style={{ marginRight:'-40px' }}>
                <SearchIcon/>
            </IconButton>
              <SearchIconWrapper/>
              <Autocomplete 
                  value={value}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      setValue({
                        title: newValue,
                      });
                    } else {
                      setValue(newValue);
                    }

                    if (event.key === 'Enter') {
                      navigate({
                          pathname: "/search",
                          search: `?${createSearchParams({query: event.target.value})}`
                      });
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
            
                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    //const isExisting = options.some((option) => inputValue === option.title);
            
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={allApartments}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Regular option
                    return option.title;
                  }}
                  renderOption={(props, option) => {
                    return (
                      <li {...props}>
                        <Link onClick={navApartmentPage} sx={{color: 'black'}}>{option}</Link>
                    </li>
                    )
                  }}
                  sx={{ width: 300}}
                  freeSolo
                  renderInput={(params) => (
                  //<TextField {...params} label="Search" />
                  <StyledInputBase
                      placeholder="Search…"
                      ref={params.InputProps.ref}
                      inputProps={params.inputProps}
                      sx={{color: 'black'}}
                  />
                )}
            />            
        </Search>
      );
}
