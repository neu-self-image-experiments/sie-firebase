import './styles.scss';

import React from 'react';
import { Route, Switch } from 'react-router';

import { Header } from '../../layouts/Header/Header';
import { Branding } from '../../components/Branding/Branding';
import { Main } from '../../layouts/Main/Main';
import { Sidebar } from '../../layouts/Sidebar/Sidebar';
import { AccountPage } from '../AccountPage/AccountPage';
import { MainMenu } from '../../components/MainMenu/MainMenu';
import { HorizontalTitle } from
  '../../components/HorizontalTitle/HorizontalTitle';

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
    <div className="navigation">
      <MainMenu />
    </div>
  );
};

const MainContent = () => {
  return (
    <Switch>
      <Route path="/account">
        <AccountPage />
      </Route>
      <Route path="/dashboard">

        <p>Hello</p>
        <DashboardContent />
      </Route>
    </Switch>
  );
};

const DashboardContent = () => {
  return (
    <HorizontalTitle eyebrow="hello"/>
  );
};
