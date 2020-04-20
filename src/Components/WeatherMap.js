import React from 'react';
import { useGoogleMaps } from "react-hook-google-maps";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    mapContainer: {
        width: 'auto',
        height: 300
    }
});

const WeatherMap = (city) => {
    const classes = useStyles();
    const { ref } = useGoogleMaps(
        // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        // NOTE: even if you change options later
        {
        center: { lat: city.city.lat, lng: city.city.lon },
        zoom: 5,
        }
    )

    return <div ref={ref} className={ classes.mapContainer } />;
}
     
export default WeatherMap;