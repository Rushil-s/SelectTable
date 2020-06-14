import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import useFormFields, { CHANGE, SET_ERRORS } from '../Hooks/useFormFields';
import { signup } from '../Api/user';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © SelecTable '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const init = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
};

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [{ values, errors }, dispatch] = useFormFields(init);
  const { firstName, lastName, phone, email, password } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, hasErrors } = validate(values);
    if (hasErrors) {
      dispatch({ type: SET_ERRORS, payload: errors });
    } else {
      const user = await signup(values);
      if (user.userId) {
        history.push('/');
      } else {
        dispatch({ type: SET_ERRORS, payload: { email: 'email in use.' } });
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch({ type: CHANGE, payload: { id, value } });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={handleChange}
                error={errors.firstName !== undefined}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                error={errors.lastName !== undefined}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                value={phone}
                onChange={handleChange}
                error={errors.phone !== undefined}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={handleChange}
                error={errors.email !== undefined}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                error={errors.password !== undefined}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/" component={RouterLink} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const validate = ({ firstName, lastName, phone, email, password }) => {
  const errors = {};

  if (firstName.length === 0) {
    errors.firstName = 'Need to supply.';
  }

  if (lastName.length === 0) {
    errors.lastName = 'Need to supply.';
  }

  if (phone.length === 0) {
    errors.phone = 'Need to supply.';
  }

  if (email.length === 0) {
    errors.email = 'Need to supply.';
  }

  if (password.length === 0) {
    errors.password = 'Need to supply.';
  }

  const hasErrors = Object.keys(errors).length > 0;
  return { errors, hasErrors };
};
