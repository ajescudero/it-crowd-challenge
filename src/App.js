import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import { Alert, AlertTitle } from "@material-ui/lab";
import CityList from "./Components/CityList";
import SearchBox from "./Components/SearchBox";
import Error404 from "./Components/Error404";
import City from "./pages/City";
import SearchResult from "./Components/SearchResult";
import { get, set } from "./Services/localstorage";

function App() {
  // State variables
  let citiesInit = get(),
    searchInit = {
      city: "",
      request: false
    };
  
  const [cities, setCities] = useState(citiesInit);
  const [search, setSearch] = useState(searchInit);
  const [currentCity, setCurrentCity] = useState({});
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   const getLocation = async () => {

  //       try {
  //         navigator.geolocation.getCurrentPosition( 
  //           (position) => {
  //               let mapAPI = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=' + process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //               mapAPIRes = await fetch(mapAPI);
  //               locationJSON = await mapAPIRes.json();
  //               .then((response) => response.json())
  //               .then((responseJson) => {
  //                 search.city = responseJson.results[0]
  //                 .address_components.filter(x => x.types.filter(
  //                     t => t === 'administrative_area_level_1').length > 0)[0].short_name
  //                 });
  //                 setSearch({
  //                   city: search.city,
  //                   request: false
  //                 });
  //             } catch (error) {
  //             console.log(error);
  //             setSearch({
  //               city: search.city,
  //               request: false
  //             });
  //           }
  //         }
  //       });
  // });

  //Effect function
  useEffect(() => {
    set(cities);

    const getData = async () => {
      const uriEncodedCity = encodeURIComponent(search.city);

      try {
        let weatherAPI = `https://community-open-weather-map.p.rapidapi.com/weather?units=metric&q=${uriEncodedCity}`,
        weatherRes = await fetch(weatherAPI, {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
              "x-rapidapi-key": process.env.REACT_APP_API_KEY
          }
        }),
        cityJSON = await weatherRes.json();
        setCurrentCity({
          city: cityJSON.name,
          temp: cityJSON.main.temp,
          pressure: cityJSON.main.pressure,
          humidity: cityJSON.main.humidity,
          temp_min: cityJSON.main.temp_min,
          temp_max: cityJSON.main.temp_max,
          lon: cityJSON.coord.lon,
          lat: cityJSON.coord.lat,
          country: cityJSON.sys.country,
          icon: `http://openweathermap.org/img/wn/${cityJSON.weather[0].icon}@2x.png`
        });
      } catch (error) {
        console.log(error);
        setSearch({
          city: search.city,
          request: false
        });
  
        setError(true);
      }
    };
    if(!search.request) {
      return;
    } else {
      getData();
    }
  }, [search, cities]);

  return (
    <Router>
    <HashRouter basename="/">
      <CssBaseline>
        <div className="App">
          <Header />
          <main className="App-main">
            <Switch>
              <Route exact path="/">
                <SearchBox
                  search={search}
                  setSearch={setSearch}
                  setError={setError}
                />
                {!search.request ? (
                  error ? (
                    <Alert
                      severity="error"
                      style={{ maxWidth: 752, margin: "2rem auto 0" }}
                    >
                      <AlertTitle>Error</AlertTitle>
                      We found problems:
                      <ul>
                        <li>
                          City: <b>{search.city}</b>
                        </li>
                      </ul>
                    </Alert>
                  ) : (
                    <CityList
                      cities={cities}
                      setCities={setCities}
                    />                         
                  )
                ) : Object.keys(currentCity).length === 0 ? (
                  <Loader />
                ) : (
                  <SearchResult 
                    currentCity={currentCity}
                    setCurrentCity={setCurrentCity}
                    cities={cities}
                    setCities={setCities}
                    setSearch={setSearch} 
                  />
                )}
              </Route>
              <Route
                path="/city/:id"
                children={<City cities={cities} />}
              />
              <Route path="*" component={Error404} />
            </Switch>
          </main>
        </div>
      </CssBaseline>
    </HashRouter>
  </Router>
  );
}

export default App;