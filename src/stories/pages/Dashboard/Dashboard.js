import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../contexts/auth-provider';
import { Header } from '../../layouts/Header/Header';
import { Branding } from '../../components/Branding/Branding';
import { Main } from '../../layouts/Main/Main';
import { Sidebar } from '../../layouts/Sidebar/Sidebar';
import { MainMenu } from '../../components/MainMenu/MainMenu';
import { HorizontalTitle } from
  '../../components/HorizontalTitle/HorizontalTitle';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { AddExperiment } from '../AddExperiment/AddExperiment';

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
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === 'Administrator';

  return (
    <Main>
      <div className="dashboard">
        <Header
          leftContent={<Branding text="SIE" />}
          rightContent={
            isAdmin && <AddExperiment buttonText="Create New Study" />
          }
        />
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

const content =
  'Here\'s an overview of what\'s going on in your ' +
  'application. You can review active experiments, update your account ' +
  'information and create new experiments.';
// TODO: put the real components

export const DashboardContent = () => {
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
