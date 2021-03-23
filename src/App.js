import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './stories/pages/Login/Login';
import { Signup } from './stories/pages/Signup/Signup';

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
        <Route path="/study/:studyID">
          <Experiment />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
