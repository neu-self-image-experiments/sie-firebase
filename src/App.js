import './App.scss';

import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './stories/pages/Login/Login';
import { Signup } from './stories/pages/Signup/Signup';
import { Experiment } from './stories/pages/Experiment/Experiment';
import { ExperimentLogin }
  from './stories/pages/ExperimentLogin/ExperimentLogin';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = async () => {
    try {
      const userAuth = await getCurrentUser();
      if (userAuth) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      // TODO: error handling
    }
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/study/:experimentId">
          <ExperimentLogin />
        </Route>
        {/* <Route path="/study/:experimentId/user/:participantId"> */}
        <Route path="/user/:participantId/study/:experimentId">
          <Experiment />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
