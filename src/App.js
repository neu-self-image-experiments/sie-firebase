import './App.scss';

import { useState, useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Login } from './stories/pages/Login/Login';
import { Signup } from './stories/pages/Signup/Signup';
import { Dashboard } from './stories/pages/Dashboard/Dashboard';
import { Experiment } from './stories/pages/Experiment/Experiment';

import { AppContext } from './libs/contextLib';
import { getCurrentUser } from './firebase/api/users';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import { AccountInfoPage } from
  './stories/pages/AccountPage/AccountInfoPage/AccountInfoPage';


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
      <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
        <Switch>
          <AuthenticatedRoute exact path="/">
            <Dashboard/>
          </AuthenticatedRoute>
          <UnauthenticatedRoute exact path="/login">
            <Login />
          </UnauthenticatedRoute>
          <UnauthenticatedRoute exact path="/signup">
            <Signup isDarkTheme={false} />
          </UnauthenticatedRoute>
          <AuthenticatedRoute exact path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/experiments">
            <Experiment />
          </AuthenticatedRoute>
          <AuthenticatedRoute exact path="/account">
            <AccountInfoPage />
          </AuthenticatedRoute>
        </Switch>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
