
import React from 'react';
import { Route, Switch } from 'react-router';

import { Header } from '../../layouts/Header/Header';
import { Branding } from '../../components/Branding/Branding';
import { Main } from '../../layouts/Main/Main';
import { Sidebar } from '../../layouts/Sidebar/Sidebar';
import { AccountPage } from '../AccountPage/AccountPage';
import { MainMenu } from '../../components/MainMenu/MainMenu';

/**
 * Component for login page.
 *
 * @component
 * @return {object} (
 *   <Dashboard />
 * )
 */

export const Dashboard = () => {
  return (
    <Main>
      <div
        className="dashboard"
      >
        <Header
          leftContent={<Branding text="SIE" />}
        />
        <Sidebar leftContent={<Navigation />} rightContent={<MainContent />} />
      </div>
    </Main>
  );
};


const Navigation = () => {
  return (
    <MainMenu />
  );
};

const MainContent = () => {
  return (
    <Switch>
      <Route path="/account">
        <AccountPage />
      </Route>
      <Route path="/dashboard">
        Some Welcome to the dashboard
      </Route>
    </Switch>
  );
};
