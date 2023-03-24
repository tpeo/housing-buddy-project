import { React, useMemo } from 'react';
import { useState, useEffect} from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';


import {
  Box, 
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'

import './Map.css'

export default function MapComponent() {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBpVf-3eE-D5VYjxEHsYgDxkqDjqUJBg-Y',
    });

    const center = useMemo(() => ({ lat: 30.285492906843807, lng: -97.73392795397169 }), []); 

    const defaultProps = {
        center: {lat: 30.33, lng: 97.7341},
        zoom: 15
      };

  return (
    <div className="Map" style={{ height: '100vh', width: '100%' }}>
      {!isLoaded ? (
        <h1>Loading...</h1>
        ) : (
        <GoogleMap
          mapContainerClassName='map-container'
          center={center}
          zoom={defaultProps.zoom}
        >
            <Marker position={{ lat: 30.285492906843807, lng: -97.73392795397169 }} />
        </GoogleMap>    
      )}
    </div>
  );
}


  