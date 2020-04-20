import React from "react";
import { Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from "@material-ui/core/Avatar";
import WeatherMap from '../Components/WeatherMap'

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
  goHome: {
    justifyContent: "center"
  }
});

const City = ({ cities }) => {
  const classes = useStyles();

  let { id } = useParams(),
    city = cities[id];

  return (
    <Card className={classes.root}>
      <CardActions className={classes.goHome}>
        <Button size="large" color="primary" component={Link} to="/">
          <HomeIcon />
          Home
        </Button>
        </CardActions>
        <CardContent>
            <WeatherMap city={city} />
        </CardContent>
        <CardContent>
        <Typography
          gutterBottom
          variant="h4"
          component="h2"
          className={classes.title}
        >
          {city.city}, {city.country}
        </Typography>

        <TableContainer component={Paper}>
        <CardContent>
        <Avatar alt={city.city} src={city.icon} />
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
                    <TableCell align="right">{city.temp} ºC</TableCell>
                    <TableCell align="right">{city.pressure} hPa</TableCell>
                    <TableCell align="right">{city.humidity} %</TableCell>
                    <TableCell align="right">{city.temp_min} ºC/{city.temp_max} ºC</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default City;
