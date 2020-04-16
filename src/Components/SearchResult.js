import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";

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
    console.log(cities, currentCity);
    setCities(cities => [...cities, currentCity]);
    setSearch({
      city: "",
      request: false
    });
    setCurrentCity({});
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={currentCity.icon}
        title={currentCity.city}
      />
      <CardContent>
      <Typography
          gutterBottom
          variant="h4"
          component="h2"
          className={classes.title}
        >
          {currentCity.city}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.lyrics}
        >
          {currentCity.city}
        </Typography>      </CardContent>
      <CardActions className={classes.addBtn}>
        <Button size="large" color="primary" onClick={handleClick}>
          <AddCircleIcon />
          Add
        </Button>
      </CardActions>
    </Card>
  );
};

export default SearchResult;
