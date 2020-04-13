import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& > *": {
      margin: theme.spacing(0),
      width: "auto"
    }
  }
}));

const SearchBox = ({ search, setSearch, setError }) => {
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();

    setSearch({
      city: e.target.city.value,
      unit: e.target.unit.value,
      request: true
    });
  };

  const handleReset = e => {
    setSearch({
      city: "",
      unit: "celsius",
      request: false
    });

    setError(false);
  };

  return (
    <form
      className={classes.root}
      autoComplete="on"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <IconButton color="primary" type="reset">
        <HomeIcon />
      </IconButton>
      <TextField
        id="city"
        name="city"
        label="City"
        variant="outlined"
        size="small"
        value={search.city}
        onChange={e => {
          setSearch({
            ...search,
            city: e.target.value,
            request: false
          });
        }}
        required
      />
      <ToggleButtonGroup
        value={search.unit}
        exclusive
        onChange={ e => {
          setSearch({
            ...search,
            unit: e.target.value,
            request: false
          })
        }}
        aria-label="text alignment"
      >
        <ToggleButton value="celsius" aria-label="celsius">
        <b>C</b>
        </ToggleButton>
        <ToggleButton value="farenheit" aria-label="farenheit">
          <b>F</b>
        </ToggleButton>
      </ToggleButtonGroup>
      <IconButton color="primary" type="submit">
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default SearchBox;
