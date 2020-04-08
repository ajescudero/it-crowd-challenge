import React from 'react';
import { useGoogleMaps } from "react-hook-google-maps";


const WeatherMap = (location) => {
    const { ref } = useGoogleMaps(
        // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
        "AIzaSyCuLSgnH7OyXxO9ovBysLPuisG3W5o3Z5g",
        // NOTE: even if you change options later
        {
        center: { lat: location.location.lat, lng: location.location.lon },
        zoom: 5,
        }
    )

    return <div ref={ref} style={{ width: 400, height: 300 }} />;
}
     
export default WeatherMap;