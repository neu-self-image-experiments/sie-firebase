/* eslint-disable no-console */
import './styles.scss';

import React, { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider/Slider';
import { Card } from '../../components/Card/Card';
import { AddExperiment } from '../AddExperiment/AddExperiment';
// eslint-disable-next-line no-unused-vars
import { Button } from '../../components/Button/Button';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import { getAllExperiments } from '../../../firebase/api/experiments';

// This probably needs to be moved to the App level/higher level component
export const UserContext = React.createContext();

/**
 * Component for Experiments page.
 *
 * @component
 * @return {object} (
 *   <ExperimentsPage/>
 * )
 */
export const ExperimentsPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [logInState, setLogInState] = useState({ isLoggedIn: true });
  // eslint-disable-next-line no-unused-vars
  const [allExperiments, setAllExperiments] = useState(null);
  const [error, setError] = useState();

  // useEffect(() => {
  //   userService.getCurrentUser(setLogInState).catch((e) => {
  //     setLogInState({ isLoggedIn: false });
  //     setError(e);
  //   });
  // }, [logInState.isLoggedIn]);

  useEffect(() => {
    getAllExperiments().then((response) => {
      if (response.status === 200) {
        setAllExperiments(response.data);
      } else {
        setError(response.error);
      }
    });
  }, []);

  const ongoingExperiments = allExperiments ?
    allExperiments.map(({ title = 'Title of Experiment',
      shortDesc = 'Short description of experiment',
      opened = 'mm-dd-yyyy',
      admin = 'Admin name',
      researchers = ['Researcher Name'] }, i) =>
      <Card
        modifierClasses='card--active'
        title={title}
        body= {shortDesc}
        opened={opened}
        admin={admin}
        researchers={researchers.join(', ')}
        key={i}
      />,
    ) :
    [];

  return error ? (
    <div>{error.errorCode + ': ' + error.errorMessage}</div>
  ) : logInState.isLoggedIn ? (
    <UserContext.Provider value={logInState.user}>
      <div>
        <HorizontalTitle
          eyebrow={'Overview'}
          title={'Experiments'}
          content={
            'Here\'s an overview of what\'s going on your application. ' +
            'You can review your active experiments, ' +
            'check reports and analyze real-time data.'
          }
        />

        {/* Ongoing experiments */}
        <div>
          <span>
            ONGOING EXPERIMENTS
          </span>
          <AddExperiment buttonText={'+'} />
        </div>
        <Slider>
          {ongoingExperiments}
        </Slider>

        {/* Inactive experiments go here */}

      </div>
    </UserContext.Provider>
  ) : (
    <div>{'No logged in user'}</div>
  );
};
