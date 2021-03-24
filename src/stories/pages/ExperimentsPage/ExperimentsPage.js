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

const PLACEHOLDER_EXPERIMENTS = [
  { title: 'Title 1', shortDesc: 'Short description' },
  { title: 'Title 2', shortDesc: 'Short description' },
  { title: 'Title 3', shortDesc: 'Short description' },
  { title: 'Title 4', shortDesc: 'Short description' },
  { title: 'Title 5', shortDesc: 'Short description' },
  { title: 'Title 6', shortDesc: 'Short description' },
];

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
  const [allExperiments, setAllExperiments] = useState(PLACEHOLDER_EXPERIMENTS);
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
    <div/>;

  const inactiveExperiments = PLACEHOLDER_EXPERIMENTS.map(
    ({ title = 'Title of Experiment',
      shortDesc = 'Short description of experiment',
      opened = 'mm-dd-yyyy',
      admin = 'Admin name',
      researchers = ['Researcher Name'] }, i) =>
      <Card
        modifierClasses='card--inactive'
        title={title}
        body= {shortDesc}
        opened={opened}
        admin={admin}
        researchers={researchers.join(', ')}
        key={i}
      />);

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
        <div className='experiments__ongoing-section'>
          <div>
            <h6 className='experiments__section-header'>
              ONGOING EXPERIMENTS
            </h6>
            <AddExperiment buttonText={'+'}
              buttonModifierClasses={'button--circular-small'} />
          </div>
          <Slider>
            {ongoingExperiments}
          </Slider>
        </div>

        {/* Inactive experiments */}
        <div>
          <div>
            <h6>
              INACTIVE EXPERIMENTS
            </h6>
          </div>
          <Slider>
            {inactiveExperiments}
          </Slider>
        </div>

      </div>
    </UserContext.Provider>
  ) : (
    <div>{'No logged in user'}</div>
  );
};
