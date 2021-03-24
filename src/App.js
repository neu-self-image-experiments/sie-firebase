import './App.scss';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './stories/pages/Login/Login';
import { Signup } from './stories/pages/Signup/Signup';
import { Dashboard } from './stories/pages/Dashboard/Dashboard';
import { AuthContext } from './contexts/auth-provider';
import { useContext } from 'react';


function App() {
  const user = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          {user ? <Dashboard/> : <Login/>}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup isDarkTheme={false} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
