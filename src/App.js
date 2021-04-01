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
import { JsPsych } from './stories/components/JsPsych/JsPsych';

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
              <ExperimentsPage />
            </Dashboard>
          )}
        ></PrivateRoute>
        <Route path="/study/:experimentId">
          <AnonymousLogin />
        </Route>
        <Route path="/user/:participantId/study/:experimentId">
          <Experiment />
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route exact path="/signup">
          {user ? <Redirect to="/dashboard" /> : <Signup isDarkTheme={false} />}
        </Route>
        <Route exact path="/jspsych">
          <JsPsych />
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
