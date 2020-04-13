import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, HashRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import { Alert, AlertTitle } from "@material-ui/lab";
import CityList from "./Components/CityList";
import City from "./Components/City";
import SearchBox from "./Components/SearchBox";
import Error404 from "./Components/Error404";

function App() {
  // State variables
  let citiesInit = JSON.parse(localStorage.getItem("cities")) || [],
    searchInit = {
      city: "",
      unit: "celsius",
      request: false
    };
  
  const [cities, setCities] = useState(citiesInit);
  const [search, setSearch] = useState(searchInit);
  const [unit, setUnit] = useState('celsius');
  const [currentCity, setCurrentCity] = useState({});
  const [error, setError] = useState(false);


  //Effect function
  useEffect(() => {
    localStorage.setItem(cities, JSON.stringify(cities));

    const getData = async () => {
      const uriEncodedCity = encodeURIComponent(search.city);
      console.log(uriEncodedCity);

      try {
        let weatherAPI = `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
        weatherRes = await fetch(weatherAPI, {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
              "x-rapidapi-key": process.env.REACT_APP_API_KEY
          }
        }),
        cityJSON = await weatherRes.json();
        console.log(cityJSON);
        setCurrentCity({
          city: cityJSON.city
        });
      } catch (error) {
        console.log(error);
        setSearch({
          city: "",
          unit: "celsius",
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
  }, [search]);

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
                      Hubo problemas al consultar:
                      <ul>
                        <li>
                          Ciudad: <b>{search.city}</b>
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
                  <div>Mapa Ciudad</div>
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