import React, { useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Restaurant from './Restaurant';
import Book from './Book';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '10px',
  },
  divider: {
    margin: '3px 0',
  },
}));

function Restaurants({ restaurants }) {
  const classes = useStyles();
  const [book, setBook] = useState({});
  const len = restaurants.length;

  const content = restaurants.map((restaurant, index) => (
    <Grid key={restaurant._id} item sm={8} xs={10}>
      <Grid item xs={12}>
        <Restaurant restaurant={restaurant} setBook={setBook} />
      </Grid>
      {index < len - 1 && <Grid className={classes.divider} />}
    </Grid>
  ));

  const open = Object.keys(book).length > 0;
  return (
    <>
      <Grid className={classes.container} container justify="center">
        {content}
      </Grid>
      {open && (
        <Book restaurantId={book} open={open} handleClose={() => setBook({})} />
      )}
    </>
  );
}

export default Restaurants;
