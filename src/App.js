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
  const user = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return user ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            );
          }}
        ></Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup isDarkTheme={false} />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard>
            <DashboardContent />
          </Dashboard>
        </Route>
        <Route exact path="/account">
          <Dashboard>
            <AccountPage />
          </Dashboard>
        </Route>
        <Route exact path="/experiments">
          <Dashboard>
            <ExperimentContent />
          </Dashboard>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
