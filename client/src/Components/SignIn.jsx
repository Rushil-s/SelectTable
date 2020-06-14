import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import useFormFields, { CHANGE, SET_ERRORS } from '../Hooks/useFormFields';
import { login } from '../Api/user';

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

const initValues = {
  email: 'test',
  password: 'test',
};

export default function SignIn() {
  const classes = useStyles();
  const { setUser } = useAuth();
  const [{ values, errors }, dispatch] = useFormFields(initValues);
  const { email, password } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, hasErrors } = validate(values);
    if (hasErrors) {
      dispatch({
        type: SET_ERRORS,
        payload: errors,
      });
    } else {
      const { userId, firstName } = await login(values);
      if (userId) {
        setUser({ userId, firstName });
        window.localStorage.setItem(
          'user',
          JSON.stringify({ userId, firstName })
        );
      } else {
        dispatch({
          type: SET_ERRORS,
          payload: { email: 'wrong', password: 'wrong' },
        });
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            error={errors.email !== undefined}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            error={errors.password !== undefined}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to="/signup" component={RouterLink} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const validate = ({ email, password }) => {
  const errors = {};

  if (email.length === 0) {
    errors.email = 'Need to provide email.';
  }

  if (password.length === 0) {
    errors.password = 'Need to provide password.';
  }

  const hasErrors = Object.keys(errors).length > 0;
  return { errors, hasErrors };
};
