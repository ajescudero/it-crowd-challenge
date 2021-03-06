import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import LaunchIcon from "@material-ui/icons/Launch";
import Alert from "@material-ui/lab/Alert";
import AlertDialog from "./AlertDialog";
import { set } from "../Services/localstorage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
    margin: "auto",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  alert: {
    fontSize: "1.5rem",
    justifyContent: "center",
    alignItems: "center",
  },
}));

function CityList({ cities, setCities }) {
  const classes = useStyles();

  const deleteCity = (id) => {
    let citiesFilter = cities.filter((el, index) => index !== id);
    setCities(citiesFilter);
    set(citiesFilter);
  };
  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        {cities.length === 0 ? (
          <Alert severity="error" className={classes.alert}>
            There aren't cities available
          </Alert>
        ) : (
          <List>
            {cities.map((el, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar alt={el.city} src={el.icon} />
                </ListItemAvatar>
                <ListItemText primary={el.city} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" component={Link} to={`/city/${index}`}>
                    <LaunchIcon />
                  </IconButton>
                  <AlertDialog id={index} deleteCity={deleteCity} />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </div>
  );
}

export default CityList;
