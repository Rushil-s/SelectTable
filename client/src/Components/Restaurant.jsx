import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  useMediaQuery,
  makeStyles,
} from '@material-ui/core';
import { Star } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '200px',
    width: '100%',
  },
  content: {
    flexGrow: 1,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  img: {
    height: '200px',
    width: '200px',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    maxHeight: '30px',
  },
}));

function Restaurant({ restaurant, setBook }) {
  const { name, stars, imageURL, tags, phone, address } = restaurant;
  const classes = useStyles();
  const media = useMediaQuery('(min-width:980px)');
  let starsContent = [];

  for (let x = 0; x < stars; x++) {
    starsContent.push(<Star key={x} />);
  }

  const tagsContent = tags.join(', ');

  const onBook = () => {
    setBook(restaurant._id);
  };

  return (
    <Card className={classes.root}>
      {media && (
        <CardMedia
          className={classes.img}
          image={imageURL}
          title="Restaurant pic"
        />
      )}
      <CardContent className={classes.content}>
        <Grid className={classes.container} container>
          <Grid item xs={10}>
            <Typography component="h4" variant="h4">
              {name}
            </Typography>
            {starsContent}
            <Typography variant="body2" gutterBottom>
              {tagsContent}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Phone: {phone}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Address: {address}
            </Typography>
          </Grid>
          <Grid className={classes.flex} item>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={onBook}
            >
              Book
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Restaurant;
