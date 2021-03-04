import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login } from './stories/pages/Login/Login';
import { Signup } from './stories/pages/Signup/Signup';
import { AccountPage } from './stories/pages/AccountPage/AccountPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup isDarkTheme={false} />
        </Route>
        <Route path="/account">
          <AccountPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
