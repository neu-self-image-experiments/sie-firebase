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
 * Component for dashboard page.
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
        <DashboardContent />
      </Route>
      <Route path="/experiments">
        <ExperimentContent />
      </Route>
    </Switch>
  );
};

const content = 'Here\'s an overview of what\'s going on in your ' +
  'application. You can review active experiments, check reports, ' +
  'and analyze real-time data.';

const DashboardContent = () => {
  return (
    <HorizontalTitle
      eyebrow="Overview"
      title="Dashboard"
      content={content}
    />
  );
};

const ExperimentContent = () => {
  return (
    <HorizontalTitle
      eyebrow="Overview"
      title="Experiments"
      content={content}
    />
  );
};
