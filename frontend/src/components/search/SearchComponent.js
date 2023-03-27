import React from "react";
import {
    Stack,
    InputBase,
    IconButton,
    Button,
    TextField,
} from "@mui/material"

import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef, useStyles } from "react";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

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
      
      // const valueRef = useRef('');
      // const onKeyClick = (event) => {
      //   if (event.key === 'Enter') {
      //       navigate({
      //           pathname: "/search",
      //           search: `?${createSearchParams({query: event.target.value})}`
      //       });
      //       //window.location.reload(false);

      //   }
      // }

      const navSearch = () => {
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({query: value.title})}`
        });
        window.location.reload(false);
      }

      const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
          // Default transform is "translate(14px, 20px) scale(1)""
          // This lines up the label with the initial cursor position in the input
          // after changing its padding-left.
          transform: "translate(34px, 20px) scale(1);"
        },
        "& .MuiAutocomplete-inputRoot": {
          color: "purple",
          '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
            // Default left padding is 6px
            paddingLeft: 26
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray"
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray"
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "purple"
          }
        }
      }));
      
    

    return (
        <Search>
            <IconButton onClick={navSearch}>
                <SearchIcon/>
            </IconButton>
            <Stack direction='row'>
              <SearchIconWrapper/>
              <StyledAutocomplete
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
              const isExisting = options.some((option) => inputValue === option.title);
              // if (inputValue !== '' && !isExisting) {
              //   filtered.push({
              //     inputValue,
              //     title: `Add "${inputValue}"`,
              //   });
              // }
      
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
            renderOption={(props, option) => (
              <li {...props} >{option.title}</li>
            )}
            sx={{ width: 300}}
            freeSolo
            renderInput={(params) => (
              //<TextField {...params} label="Search" />
              <StyledInputBase
                  placeholder="Search…"
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
              >
                
              </StyledInputBase>
            )}
          />
            </Stack>

            
        </Search>

      );
}
