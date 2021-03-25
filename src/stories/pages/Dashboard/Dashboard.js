import React from 'react';
import { Route, Switch } from 'react-router';

import { Header } from '../../layouts/Header/Header';
import { Branding } from '../../components/Branding/Branding';
import { Main } from '../../layouts/Main/Main';
import { Sidebar } from '../../layouts/Sidebar/Sidebar';
import { AccountPage } from '../AccountPage/AccountPage';
import { AddExperiment } from '../AddExperiment/AddExperiment';
import { MainMenu } from '../../components/MainMenu/MainMenu';
import { HorizontalTitle } from
  '../../components/HorizontalTitle/HorizontalTitle';
import { Constrain } from '../../layouts/Constrain/Constrain';

/**
 * Component for dashboard page.
 *
 * @component
 * @return {object} (
 *   <Dashboard />
 * )
 */

export const Dashboard = () => {
  const user = useContext(AuthContext);
  return (
    <Main>
      <div className="dashboard">
        <Header
          leftContent={<Branding text="SIE" />}
          rightContent={user.role === 'Administrator' &&
            <AddExperiment butttonText="New Experiment" />}
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
  'application. You can review active experiments, update your account ' +
  'information and create new experiments.';

const DashboardContent = () => {
  return (
    <Constrain>
      <HorizontalTitle
        modifierClasses="horizontal-title--medium"
        eyebrow="Overview"
        title="Dashboard"
        content={content}
      />
    </Constrain>
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
