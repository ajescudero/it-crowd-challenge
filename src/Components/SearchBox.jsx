import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& > *": {
      margin: theme.spacing(0),
      width: "auto",
    },
  },
}));

function SearchBox({ search, setSearch, setError }) {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();

    setSearch({
      city: e.target.city.value,
      request: true,
    });
  };

  const handleReset = (e) => {
    setSearch({
      city: "",
      request: false,
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
        onChange={(e) => {
          setSearch({
            ...search,
            city: e.target.value,
            request: false,
          });
        }}
        required
      />
      <IconButton color="primary" type="submit">
        <SearchIcon />
      </IconButton>
    </form>
  );
}

export default SearchBox;
