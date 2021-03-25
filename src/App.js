import './App.scss';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './stories/pages/Login/Login';
import { Signup } from './stories/pages/Signup/Signup';
import {
  Dashboard,
  DashboardContent,
  ExperimentContent,
} from './stories/pages/Dashboard/Dashboard';
import { AuthContext } from './contexts/auth-provider';
import { useContext } from 'react';
import { AccountPage } from './stories/pages/AccountPage/AccountPage';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dashboard">
          {user ? (
            <Dashboard>
              <DashboardContent />
            </Dashboard>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/account">
          {user ? (
            <Dashboard>
              <AccountPage />
            </Dashboard>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/experiments">
          {user ? (
            <Dashboard>
              <ExperimentContent />
            </Dashboard>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route exact path="/signup">
          {user ? <Redirect to="/dashboard" /> : <Signup isDarkTheme={false} />}
        </Route>
        <Route
          path="/"
          render={() => {
            return user ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            );
          }}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
