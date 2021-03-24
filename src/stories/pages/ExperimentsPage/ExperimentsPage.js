/*
  TODOs
    #1: Replace old user context with new auth context.
    #2: Revise experiment information fields displayed in cards of slider.
    #3: Divide fetched experiments into 'ongoing' and 'inactive'.
*/

import './styles.scss';

import React, { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider/Slider';
import { Card } from '../../components/Card/Card';
import { AddExperiment } from '../AddExperiment/AddExperiment';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import { getAllExperiments } from '../../../firebase/api/experiments';
// TODO #1.1(fernandowinfield): remove the import below.
import UserServices from '../../../firebase/CRUDServices/userServices';

const PLACEHOLDER_EXPERIMENTS = [
  { title: 'Title 1', shortDesc: 'Short description' },
  { title: 'Title 2', shortDesc: 'Short description' },
  { title: 'Title 3', shortDesc: 'Short description' },
  { title: 'Title 4', shortDesc: 'Short description' },
  { title: 'Title 5', shortDesc: 'Short description' },
  { title: 'Title 6', shortDesc: 'Short description' },
];

// TODO #1.2(fernandowinfield): replace this context with the new auth context.
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
  const [logInState, setLogInState] = useState({ isLoggedIn: true });
  const [allExperiments, setAllExperiments] = useState(PLACEHOLDER_EXPERIMENTS);
  const [error, setError] = useState();

  // TODO #1.3(fernandowinfield): remove the service below.
  const userService = UserServices.getInstance();

  // TODO #1.4(fernandowinfield): adjust `useEffect()` implementation below to
  // use new auth context.
  useEffect(() => {
    userService.getCurrentUser(setLogInState).catch((e) => {
      setLogInState({ isLoggedIn: false });
      setError(e);
    });
  }, [logInState.isLoggedIn]);

  useEffect(() => {
    getAllExperiments().then((response) => {
      if (response.status === 200) {
        // TODO #3.1(fernandowinfield): Filter ongoing and inactive experiments
        // and set state for both instead of setting state for all.
        setAllExperiments(response.data);
      } else {
        setError(response.error);
      }
    });
  }, []);

  // TODO #3.2(fernandowinfield): Map ongoingExperiments instead of all.
  const ongoingExperimentsSlides = allExperiments ?
    allExperiments.map(
      (
        // TODO #2.1(fernandowinfield): add/remove fields below as needed.
        { title = 'Title of Experiment',
          shortDesc = 'Short description of experiment',
          opened = 'mm-dd-yyyy',
          admin = 'Admin name',
          researchers = ['Researcher Name'],
        },
        i,
      ) =>
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
    null;

  // TODO #3.3(fernandowinfield): Map inactiveExperiments instead of all and
  // add ternary operator like in the ongoingExperiments mapping (to handle
  // the case when there are no inactive experiments).
  const inactiveExperimentsSlides = PLACEHOLDER_EXPERIMENTS.map(
    (
      // TODO #2.2(fernandowinfield): here too, add/remove fields below as
      // needed.
      { title = 'Title of Experiment',
        shortDesc = 'Short description of experiment',
        opened = 'mm-dd-yyyy',
        admin = 'Admin name',
        researchers = ['Researcher Name'],
      },
      i,
    ) =>
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
          {ongoingExperimentsSlides ?
            <Slider>
              {ongoingExperimentsSlides}
            </Slider> :
            <Card
              modifierClasses='card--teaser'
              body='No current ongoing experiments. Click the + above to
              create one.'
            />
          }
        </div>

        {/* Inactive experiments */}
        <div>
          <div>
            <h6>
              INACTIVE EXPERIMENTS
            </h6>
          </div>
          {/* TODO #3.4(fernandowinfield): Add ternary operator and content to
          display when there are no inactive experiments */}
          <Slider>
            {inactiveExperimentsSlides}
          </Slider>
        </div>

      </div>
    </UserContext.Provider>
  ) : (
    <div>{'No logged in user'}</div>
  );
};
