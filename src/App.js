import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './stories/pages/Login/Login';
import { Signup } from './stories/pages/Signup/Signup';
import { Experiment } from './stories/pages/Experiment/Experiment';
import { ExperimentLogin }
  from './stories/pages/ExperimentLogin/ExperimentLogin';

function App() {
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
