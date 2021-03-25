import './App.scss';

import { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Login } from './stories/pages/Login/Login';
import { Signup } from './stories/pages/Signup/Signup';
import { Dashboard } from './stories/pages/Dashboard/Dashboard';
import { Experiment } from './stories/pages/Experiment/Experiment';
import { AnonymousLogin } from './stories/pages/AnonymousLogin/AnonymousLogin';
import { AuthContext } from './contexts/auth-provider';


function App() {
  const user = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact path="/"
          render={() => {
            return (
              user ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
            );
          }}
        >
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup isDarkTheme={false} />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/study/:experimentId">
          <AnonymousLogin />
        </Route>
        <Route path="/user/:participantId/study/:experimentId">
          <Experiment />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
