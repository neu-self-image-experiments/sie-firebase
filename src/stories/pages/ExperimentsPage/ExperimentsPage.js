/*
  TODOs
    #1: Replace old user context with new auth context.
    #2: Revise experiment information fields displayed in cards of slider.
    #3: Divide fetched experiments into 'ongoing' and 'inactive'.
*/
import React, { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider/Slider';
import { Card } from '../../components/Card/Card';
import { AddExperiment } from '../AddExperiment/AddExperiment';
// eslint-disable-next-line max-len
import { HorizontalTitle } from '../../components/HorizontalTitle/HorizontalTitle';
import { getAllExperiments } from '../../../firebase/api/experiments';
// TODO #1.1(fernandowinfield): remove the import below.
import UserServices from '../../../firebase/CRUDServices/userServices';
import { Constrain } from '../../layouts/Constrain/Constrain';

const PLACEHOLDER_EXPERIMENTS = [
  { title: 'Title 1', description: 'Short description' },
  { title: 'Title 2', description: 'Short description' },
  { title: 'Title 3', description: 'Short description' },
  { title: 'Title 4', description: 'Short description' },
  { title: 'Title 5', description: 'Short description' },
  { title: 'Title 6', description: 'Short description' },
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
          description = 'Short description of experiment',
          opened = 'mm-dd-yyyy',
          admin = 'Admin name',
          researchers = ['Researcher Name'],
        },
        i,
      ) =>
        <Card
          modifierClasses='card--active'
          title={title}
          body= {description}
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
        description = 'Short description of experiment',
        opened = 'mm-dd-yyyy',
        admin = 'Admin name',
        researchers = ['Researcher Name'],
      },
      i,
    ) =>
      <Card
        modifierClasses='card--inactive'
        title={title}
        body= {description}
        opened={opened}
        admin={admin}
        researchers={researchers.join(', ')}
        key={i}
      />);

  return error ? (
    <div>{error.errorCode + ': ' + error.errorMessage}</div>
  ) : logInState.isLoggedIn ? (
    <UserContext.Provider value={logInState.user}>
      <Constrain>
        <HorizontalTitle
          modifierClasses="horizontal-title--medium"
          eyebrow={'View All'}
          title={'Experiments'}
          content={
            'Here\'s an overview of what\'s going on your application. ' +
            'You can review your active experiments, ' +
            'check reports and analyze real-time data.'
          }
        />
        {/* Ongoing experiments */}
        <HorizontalTitle
          modifierClasses="horizontal-title--small"
          titleEl="h6"
          title={'Ongoing Experiments'}
          content={<AddExperiment buttonText={'Add New Study'}
            buttonModifierClasses={'button--circular-small'} />
          }
        />
      </Constrain>

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

      {/* Inactive experiments */}
      <Constrain>
        <HorizontalTitle
          modifierClasses="horizontal-title--small"
          titleEl="h6"
          title={'Inactive Experiments'}
        />
      </Constrain>
      {/* TODO #3.4(fernandowinfield): Add ternary operator and content to
      display when there are no inactive experiments */}
      <Slider>
        {inactiveExperimentsSlides}
      </Slider>
    </UserContext.Provider>
  ) : (
    <div>{'No logged in user'}</div>
  );
};
