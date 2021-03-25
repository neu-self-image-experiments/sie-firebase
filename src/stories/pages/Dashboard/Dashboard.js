import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../../layouts/Header/Header';
import { Branding } from '../../components/Branding/Branding';
import { Main } from '../../layouts/Main/Main';
import { Sidebar } from '../../layouts/Sidebar/Sidebar';
import { MainMenu } from '../../components/MainMenu/MainMenu';
import { HorizontalTitle } from
  '../../components/HorizontalTitle/HorizontalTitle';

/**
 * Component for dashboard page.
 *
 * @component
 * @param {node} children component to show
 * @return {object} (
 *   <Dashboard>{children}</Dashboard>
 * )
 */

export const Dashboard = ({ children }) => {
  return (
    <Main>
      <div className="dashboard">
        <Header leftContent={<Branding text="SIE" />} />
        <Sidebar leftContent={<Navigation />} rightContent={children} />
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

Dashboard.propTypes = {
  /**
   * Content to show in the left hand side
   */
  children: PropTypes.node.isRequired,
};

// TODO: put the real components
const content =
  'Here\'s an overview of what\'s going on in your ' +
  'application. You can review active experiments, check reports, ' +
  'and analyze real-time data.';

export const DashboardContent = () => {
  return (
    <HorizontalTitle eyebrow="Overview" title="Dashboard" content={content} />
  );
};

export const ExperimentContent = () => {
  return (
    <HorizontalTitle eyebrow="Overview" title="Experiments" content={content} />
  );
};
