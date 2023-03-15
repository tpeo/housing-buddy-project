import React from "react";
import {
    Avatar,
    InputBase,
    IconButton,
    Button,
    Tooltip,
    Icon,
} from "@mui/material"
import { createElement } from 'react';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';

import SearchIcon from '@mui/icons-material/Search';
import { AutocompleteComponent } from "./AutocompleteComponent";
import { ApartmentItem } from "./ApartmentItem";
import { styled, alpha } from '@mui/material/styles';

import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function SearchComponent() {

    const navigate = useNavigate();
    // For the default version
    const algoliasearch = require('algoliasearch');
    const appId = 'MBBVF21PRE';
    const apiKey = '285a861db99cccb9f00fd6587bf86356';
    const searchClient = algoliasearch(appId, apiKey);

    // For the default version
    // import algoliasearch from 'algoliasearch';
    // For the search only version
    // import algoliasearch from 'algoliasearch/lite';

    const index = searchClient.initIndex('apartments');


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
      
      const valueRef = useRef('');
      const onKeyClick = (event) => {
        if (event.key === 'Enter') {
            navigate({
                pathname: "/search",
                search: `?${createSearchParams({query: event.target.value})}`
            });
            //window.location.reload(false);

        }
      }

      const navSearch = () => {

        navigate({
            pathname: "/search",
            search: `?${createSearchParams({query: valueRef.current.value})}`
        });
        //window.location.reload(false);
      }
    

    return (
        <Search>
            <IconButton onClick={navSearch}>
                <SearchIcon/>
            </IconButton>
            <SearchIconWrapper >
            </SearchIconWrapper>
            <StyledInputBase
                onKeyPress={onKeyClick}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                inputRef={valueRef}
            />
          <AutocompleteComponent
            openOnFocus={true}
            getSources={({ query }) => [
              {
                sourceId: 'apartments',
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: 'apartments',
                        query,
                      },
                    ],
                  });
                },
                templates: {
                  item({ item, components }) {
                    return <ApartmentItem hit={item} components={components} />;
                  },
                },
              },
            ]}
          />
        </Search>

      );
}
