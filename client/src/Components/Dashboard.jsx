import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  FormControl,
  InputLabel,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';
import { animateScroll as scroll, Element } from 'react-scroll';
import Restaurants from './Restaurants';
import { getRestaurants } from '../Api/restaurant';

const useStyle = makeStyles({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -2,
    backgroundImage: 'url(/images/table.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: -1,
    backgroundColor: '#000',
    opacity: 0.4,
  },
  container: {
    height: '88vh',
  },
  header: {
    marginTop: '150px',
    fontWeight: 500,
    color: 'white',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    padding: '20px',
    borderRadius: '25px',
    backgroundColor: 'white',
  },
  formControl: {
    marginRight: '20px',
    flexGrow: 1,
  },
});

function Dashboard() {
  const classes = useStyle();
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState('Toronto');

  useEffect(() => {
    if (restaurants.length > 0) {
      const height = window.innerHeight;
      scroll.scrollTo(height, { duration: 1000 });
    }
  }, [restaurants]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await getRestaurants(location);
    setRestaurants(data);
  };

  return (
    <>
      <div className={classes.background} />
      <div className={classes.overlay} />
      <Grid
        className={classes.container}
        container
        justify="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Typography className={classes.header} component="h1" variant="h2">
            Book A Restaurants In Your Favourite Location
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="location">People</InputLabel>
              <Select
                labelId="location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <MenuItem value={'Toronto'}>Toronto</MenuItem>
                <MenuItem value={'Vancouver'}>Vancouver</MenuItem>
                <MenuItem value={'Montreal'}>Montreal</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Search
            </Button>
          </form>
        </Grid>
      </Grid>
      <Element name="myScrollToElement" />
      {restaurants.length !== 0 && <Restaurants restaurants={restaurants} />}
    </>
  );
}

export default Dashboard;
