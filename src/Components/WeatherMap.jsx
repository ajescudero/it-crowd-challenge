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
        process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        {
        center: { lat: city.city.lat, lng: city.city.lon },
        zoom: 5,
        }
    );

    return <div ref={ref} className={ classes.mapContainer } />;
};
     
export default WeatherMap;