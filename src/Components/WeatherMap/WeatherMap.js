import React from 'react';
import { useGoogleMaps } from "react-hook-google-maps";


const WeatherMap = (city) => {
    const { ref } = useGoogleMaps(
        // Use your own API key, you can get one from Google (https://console.cloud.google.com/google/maps-apis/overview)
        "AIzaSyCuLSgnH7OyXxO9ovBysLPuisG3W5o3Z5g",
        // NOTE: even if you change options later
        {
        center: { lat: city.city.lat, lng: city.city.lon },
        zoom: 5,
        }
    )

    return <div ref={ref} style={{ width: 750, height: 300 }} />;
}
     
export default WeatherMap;