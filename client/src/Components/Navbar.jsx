import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../assets/logo-booking.png';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../Hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    height: '60px',
    margin: 'auto',
    marginTop: '20px',
    flexGrow: 1,
  },
  bar: {
    backgroundColor: 'white',
    height: '100%',
  },
  logoWrapper: {
    flexGrow: 1,
  },
  logo: {
    height: '120px',
  },
  button: {
    fontSize: '18px',
  },
  signup: {
    color: 'white',
    backgroundColor: 'rgb(66, 29, 202)',
    marginRight: '10px',
    '&:hover': {
      background: 'rgb(81, 41, 226)',
    },
  },
}));
export default function Navbar() {
  const { user, setUser } = useAuth();

  const classes = useStyles();

  let buttons;
  if (user.firstName === undefined) {
    buttons = (
      <>
        <Button
          className={`${classes.signup} ${classes.button}`}
          component={NavLink}
          to="/signup"
        >
          Sign Up
        </Button>
        <Button className={classes.button} component={NavLink} to="/">
          Login
        </Button>
      </>
    );
  } else {
    buttons = (
      <Button
        className={classes.button}
        component={NavLink}
        to="/"
        onClick={() => {
          window.localStorage.removeItem('user');
          setUser({});
        }}
      >
        Logout {user.firstName}
      </Button>
    );
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.bar} position="static">
        <Toolbar>
          <div className={classes.logoWrapper}>
            <img className={classes.logo} alt="Website Logo" src={logo} />
          </div>
          {buttons}
        </Toolbar>
      </AppBar>
    </div>
  );
}
