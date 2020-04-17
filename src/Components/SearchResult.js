import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import HomeIcon from "@material-ui/icons/Home";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import WeatherMap from "../Components/WeatherMap/WeatherMap";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    margin: "2rem auto"
  },
  title: {
    marginBottom: "3rem !important"
  },
  media: {
    backgroundSize: "cover",
    height: "50vh"
  },
  addBtn: {
    justifyContent: "flex-end"
  }
});

const SearchResult = ({
  currentCity,
  setCurrentCity,
  cities,
  setCities,
  setSearch
}) => {
  const classes = useStyles();

  const handleClick = e => {
    var newResults = cities.concat(currentCity).slice(-5);
    setCities(newResults);
    setSearch({
      city: "",
      request: false
    });
    setCurrentCity({});
  };

  return (
    <Card className={classes.root}>
    <CardActions className={classes.goHome}>
      <Button size="large" color="primary" component={Link} to="/">
        <HomeIcon />
        Home
      </Button>
      </CardActions>
      <CardContent>
          <WeatherMap city={currentCity} />
      </CardContent>
      <CardContent>
      <Typography
        gutterBottom
        variant="h4"
        component="h2"
        className={classes.title}
      >
        {currentCity.city}, {currentCity.country}
      </Typography>

      <TableContainer component={Paper}>
      <CardContent>
      <Avatar alt={currentCity.city} src={currentCity.icon} />
      </CardContent>
          <Table className={classes.table} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell align="right">Temperature</TableCell>
                  <TableCell align="right">Pressure</TableCell>
                  <TableCell align="right">Humidity</TableCell>
                  <TableCell align="right">Min/Max</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                  <TableCell align="right">{currentCity.temp} ºC</TableCell>
                  <TableCell align="right">{currentCity.pressure} hPa</TableCell>
                  <TableCell align="right">{currentCity.humidity} %</TableCell>
                  <TableCell align="right">{currentCity.temp_min} ºC/{currentCity.temp_max} ºC</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
      </TableContainer>
      <CardActions className={classes.addBtn}>
        <Button size="large" color="primary" onClick={handleClick}>
          <AddCircleIcon />
          Add
        </Button>
      </CardActions>
    </CardContent>
  </Card>
  );
};

export default SearchResult;
