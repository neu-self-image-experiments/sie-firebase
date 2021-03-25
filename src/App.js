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
import { PrivateRoute } from './stories/components/PrivateRoute/PrivateRoute';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          exact
          path="/dashboard"
          user={user}
          component={() => (
            <Dashboard>
              <DashboardContent />
            </Dashboard>
          )}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/account"
          user={user}
          component={() => (
            <Dashboard>
              <AccountPage />
            </Dashboard>
          )}
        ></PrivateRoute>
        <PrivateRoute
          exact
          path="/experiments"
          user={user}
          component={() => (
            <Dashboard>
              <ExperimentContent />
            </Dashboard>
          )}
        ></PrivateRoute>
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
