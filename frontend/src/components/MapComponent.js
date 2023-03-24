/* global google */
import { React, useMemo } from 'react';
import { useState, useEffect} from 'react';
import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";


import {
  Box, 
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Link,
  Typography,
  LinearProgress,
} from '@mui/material'

import './Map.css'

export default function MapComponent() {
    const navigate = useNavigate();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBpVf-3eE-D5VYjxEHsYgDxkqDjqUJBg-Y',
    });

    const [mapRef, setMapRef] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [infoWindowData, setInfoWindowData] = useState();
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        loadMarkerInfo();
    }, [])

    const center = useMemo(() => ({ lat: 30.285492906843807, lng: -97.73392795397169 }), []); 

    async function loadMarkerInfo() {
        let apiCall = `http://${process.env.REACT_APP_HOSTNAME}/map-info`;
    
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
                let temp = []
                response.forEach((marker) => {
                    let t = {
                        name: marker.name,
                        address: marker.address,
                        img_link: marker.img_link,
                        lat: marker.coordinates._latitude,
                        lng: marker.coordinates._longitude
                    }
                    temp.push(t)    
                })
              setMarkers(temp);
            })
            .catch((e) => {
              console.log(e);
            });
        }


    const onMapLoad = (map) => {
        setMapRef(map);
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
    };

    const handleMarkerClick = (id, name, lat, lng, address) => {
        mapRef?.panTo({ lat, lng });
        setInfoWindowData({ id, name, address });
        setIsOpen(true);
      };

    const handleNav = (event) => {
        navigate(`/mainpage/${event.target.id.toLowerCase()}`);
    }

  return (
    <div className="Map" style={{ height: '100vh', width: '100%' }}>
      {!isLoaded ? (
        <h1>Loading...</h1>
        ) : (
        <GoogleMap
          mapContainerClassName='map-container'
          center={center}
          zoom={15}
          onLoad={onMapLoad}
          onClick={() => setIsOpen(false)}
        >
            <Marker icon='https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png' 
                position={{ lat: 30.285492906843807, lng: -97.73392795397169 }} />

            {markers.map(({ address, name, lat, lng }, ind) => (
                <Marker
                key={ind}
                position={{ lat, lng }}
                onClick={() => {
                    handleMarkerClick(ind, name, lat, lng, address);
                }}
                >
                {isOpen && infoWindowData?.id === ind && (
                    <InfoWindow
                    onCloseClick={() => {
                        setIsOpen(false);
                    }}
                    >
                        <Stack>
                            <Typography variant="body">{infoWindowData.name}</Typography>
                            <Typography variant='body'>{infoWindowData.address}</Typography>
                            <Link id={infoWindowData.name} onClick={handleNav}>View Info</Link>
                        </Stack>

                    </InfoWindow>
                )}
                </Marker>
            ))}
        </GoogleMap>    
      )}
    </div>
  );
}


  