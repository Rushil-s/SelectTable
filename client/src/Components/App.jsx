import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider,
} from '@material-ui/core';

import { Provider } from '../Hooks/useAuth';
import { AuthRoute, ProtectedRoute } from './Routes/Auth.js';

import Dashboard from './Dashboard';
import Navbar from './Navbar';
import SignIn from './SignIn';
import SignUp from './SignUp';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const App = () => {
  const loggedUser = JSON.parse(window.localStorage.getItem('user'));
  const [user, setUser] = React.useState(loggedUser || {});

  return (
    <Router>
      <CssBaseline />
      <MuiThemeProvider theme={theme}>
        <Provider value={{ user, setUser }}>
          <Navbar />
          <Switch>
            <AuthRoute
              exact={true}
              loggedIn={user.firstName !== undefined}
              path="/"
              component={SignIn}
            />
            <AuthRoute
              exact={true}
              loggedIn={user.firstName !== undefined}
              path="/signup"
              component={SignUp}
            />
            <ProtectedRoute
              exact={true}
              loggedIn={user.firstName !== undefined}
              path="/dashboard"
              component={Dashboard}
            />
          </Switch>
          {/* <Switch>
          <ProtectedRoute
            loggedIn={!!user}
            path="/dashboard"
            setUser={setUser}
            component={Dashboard}
          />
        </Switch> */}
        </Provider>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
