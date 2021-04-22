import React, { useEffect, useState } from 'react';
import { Slider } from '../../components/Slider/Slider';
import { Card } from '../../components/Card/Card';
import { AddExperiment } from '../AddExperiment/AddExperiment';
import { HorizontalTitle }
  from '../../components/HorizontalTitle/HorizontalTitle';
import { getAllExperiments } from '../../../firebase/api/experiments';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { useAuth } from '../../../contexts/auth-provider';


const PLACEHOLDER_EXPERIMENTS = [
  { title: 'Title 1', description: 'Short description' },
  { title: 'Title 2', description: 'Short description' },
  { title: 'Title 3', description: 'Short description' },
  { title: 'Title 4', description: 'Short description' },
  { title: 'Title 5', description: 'Short description' },
  { title: 'Title 6', description: 'Short description' },
];

/**
 * Component for Experiments page.
 *
 * @component
 * @return {object} (
 *   <ExperimentsPage/>
 * )
 */
export const ExperimentsPage = () => {
  const { user } = useAuth();
  const [ongoingExperiments, setOngoingExperiments] =
    useState(PLACEHOLDER_EXPERIMENTS);
  const [inactiveExperiments, setInactiveExperiments] =
    useState(PLACEHOLDER_EXPERIMENTS);
  const [error, setError] = useState();

  useEffect(() => {
    getAllExperiments().then((response) => {
      if (response.status === 200) {
        const ongoingExperiments = response.data.filter((experiment) =>
          experiment.isOngoing);
        const inactiveExperiments = response.data.filter((experiment) =>
          !experiment.isOngoing);
        setOngoingExperiments(ongoingExperiments);
        setInactiveExperiments(inactiveExperiments);
      } else {
        setError(response.error);
      }
    });
  }, []);

  // Generate slider's slides for ongoing experiments (if any)
  const ongoingExperimentsSlides = (ongoingExperiments &&
    ongoingExperiments.length > 0) ?
    ongoingExperiments.map((exp, i) => {
      const experimentInfo = {
        title: exp.title,
        body: exp.description,
        opened: exp.date,
        creator: exp.creator,
        consentForm: exp.consent,
        preSurvey: exp.preSurvey,
        postSurvey: exp.postSurvey,
        experimentUrl:
          `http://localhost:3000/${exp.experimentId}/<participantID>`,
      };

      return (
        <Card
          modifierClasses='card--active'
          experimentInfo={experimentInfo}
          key={i}
        />
      );
    }) :
    null;

  // Generate slider's slides for inactive experiments (if any)
  const inactiveExperimentsSlides = (inactiveExperiments &&
    inactiveExperiments.length > 0) ?
    inactiveExperiments.map((exp, i) => {
      const experimentInfo = {
        title: exp.title,
        body: exp.description,
        opened: exp.date,
        creator: exp.creator,
        consentForm: exp.consent,
        preSurvey: exp.preSurvey,
        postSurvey: exp.postSurvey,
        experimentUrl: exp.experimentUrl,
      };

      return (
        <Card
          modifierClasses='card--inactive'
          experimentInfo={experimentInfo}
          key={i}
        />
      );
    }) :
    null;

  return error ? (
    <div>{error.errorCode + ': ' + error.errorMessage}</div>
  ) : user ? (
    <div>
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
          experimentInfo={{
            body: 'No current ongoing experiments. Click the ' +
              '+ above to create one.',
          }}
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

      {inactiveExperimentsSlides ?
        <Slider>
          {inactiveExperimentsSlides}
        </Slider> :
        <Card
          modifierClasses='card--teaser'
          experimentInfo={{
            body: 'No experiments are currently inactive.',
          }}
        />
      }
    </div>
  ) : (
    <div>{'No logged in user'}</div>
  );
};
