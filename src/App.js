import './App.scss';
import { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './stories/pages/Login/Login';
import { Signup } from './stories/pages/Signup/Signup';
import { Experiment } from './stories/pages/Experiment/Experiment';
import { AnonymousLogin } from './stories/pages/AnonymousLogin/AnonymousLogin';
import { AuthContext } from './contexts/auth-provider';
import {
  Dashboard,
  DashboardContent,
} from './stories/pages/Dashboard/Dashboard';
import { AccountPage } from './stories/pages/AccountPage/AccountPage';
import { ExperimentsPage }
  from './stories/pages/ExperimentsPage/ExperimentsPage';
import { PrivateRoute } from './stories/components/PrivateRoute/PrivateRoute';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        {/* TO DO: update the Router paths for AnonymousLogin and Experiment
        before final deployment based on the generated Experiment URL */}
        <Route path="/study/:experimentId/user/:participantId">
          <AnonymousLogin />
        </Route>
        <Route path="/:experimentId/:participantId">
          <Experiment />
        </Route>
        <PrivateRoute
          exact
          path="/dashboard"
          user={user}
          component={() => (
            <Dashboard>
              <DashboardContent />
            </Dashboard>
          )} />
        <PrivateRoute
          exact
          path="/account"
          user={user}
          component={() => (
            <Dashboard>
              <AccountPage />
            </Dashboard>
          )} />
        <PrivateRoute
          exact
          path="/experiments"
          user={user}
          component={() => (
            <Dashboard>
              <ExperimentsPage />
            </Dashboard>
          )} />
        <Route exact path="/login">
          {user ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route exact path="/signup">
          {user ? <Redirect to="/dashboard" /> : <Signup isDarkTheme={true} />}
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
