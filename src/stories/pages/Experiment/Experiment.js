import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../../layouts/Header/Header';
import { Main } from '../../layouts/Main/Main';
import { Wizard } from '../../layouts/Wizard/Wizard';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { UploadPhoto } from '../../components/UploadPhoto/UploadPhoto';
import { QualtricsEmbed } from '../../components/QualtricsEmbed/QualtricsEmbed';
import { Section } from '../../components/Section/Section';
import { ImageSelectionTask }
  from '../../components/ImageSelectionTask/ImageSelectionTask';
import { getExperimentById } from '../../../firebase/api/experiments';
import {
  getConsentResult,
  getPostSurvey,
  getPreSurvey,
} from '../../../firebase/api/qualtrics';
import { useAuth } from '../../../contexts/auth-provider';
import { signInAnonymousUser } from '../../../firebase/api/users';

/**
 * Component for experiment page.
 *
 * @component
 * @return {object} (
 *   <Experiment />
 * )
 */

export const Experiment = () => {
  const { experimentId, participantId } = useParams();
  // Experiment metadata
  const [experiment, setExperiment] = useState({});
  // Enable/disable 'Next' button of Wizard
  const [showNext, setShowNext] = useState(false);
  // Track the step the Wizard is at
  const [wizardStep, setWizardStep] = useState(1);
  // Keep track of already completed steps
  const [completedSteps, setCompletedSteps] = useState([1]);
  const [consentResponse, setConsentResponse] = useState(null);
  const [preSurvey, setPreSurvey] = useState(null);
  const [postSurvey, setPostSurvey] = useState(null);
  const [photoStepCompleted, setPhotoStepCompleted] = useState(false);
  const [selectionTaskCompleted, setSelectionTaskCompleted] = useState(false);
  const authContext = useAuth();

  useEffect(() => {
    if (!authContext.isAuthenticated) {
      signInAnonymousUser();
      authContext.reloadAuthProvider();
    } else {
      const id = experimentId ? experimentId : 'Pl3WJYa7vQ1ALVt0rHRV';
      getExperimentById(id).then((res) => {
        setExperiment(res.data);
      });
    }
  }, []);

  useEffect(() => {
    let show = false;
    if (completedSteps.includes(wizardStep)) {
      show = true;
    } else {
      switch (wizardStep) {
      case 2:
        getConsentResult(participantId, experimentId, setConsentResponse);
        break;
      case 4:
        getPreSurvey(participantId, experimentId, setPreSurvey);
        break;
      case 6:
        getPostSurvey(participantId, experimentId, setPostSurvey);
        break;
      default:
        break;
      }
    }
    setShowNext(show);
  }, [wizardStep]);

  useEffect(() => {
    if (experiment.preSurvey) {
      if (preSurvey.status === 200) {
        setShowNext(true);
        setCompletedSteps((prevState) => [...prevState, 4]);
      }
    }
  }, [preSurvey]);

  useEffect(() => {
    if (experiment.postSurvey) {
      if (postSurvey.status === 200) {
        setShowNext(true);
        setCompletedSteps((prevState) => [...prevState, 6]);
      }
    }
  }, [postSurvey]);

  useEffect(() => {
    if (consentResponse && consentResponse.data) {
      if (consentResponse.data.response === 'Agree') {
        setShowNext(true);
        setCompletedSteps((prevState) => [...prevState, 2]);
      } else if (consentResponse.data.response === 'Disagree') {
        // TODO: What do we do if participant doesn't give consent?
      }
    }
  }, [consentResponse]);

  useEffect(() => {
    if (selectionTaskCompleted) {
      setShowNext(true);
      setCompletedSteps((prevState) => [...prevState, 5]);
    }
  }, [selectionTaskCompleted]);

  useEffect(() => {
    if (photoStepCompleted) {
      setShowNext(true);
      setCompletedSteps((prevState) => [...prevState, 3]);
    } else if (completedSteps.includes(3)) {
      // In the case that the participant's photo has passed face detection but
      // later on uploads another photo that doesn't pass, we need to disable
      // the 'Next' button again.
      setShowNext(false);
      setCompletedSteps((prevState) => {
        // Remove `3` from the completed steps array
        const prevCompletedSteps = [...prevState];
        const index = prevCompletedSteps.indexOf(3);
        if (index > -1) {
          prevCompletedSteps.splice(index, 1);
        }
        return prevCompletedSteps;
      });
    }
  }, [photoStepCompleted]);

  const steps = [
    'Introduction',
    'Consent form',
    'Photo Instructions and Upload',
    'Pre-Survey',
    'Image Selection Task',
    'Post-Survey',
    'Debriefing',
  ];
  const HEADING = 'h3';

  return (
    <Main>
      <Header leftContent={<h5>{experiment.title}</h5>} />
      <div className="experiment">
        <Constrain>
          <Wizard
            labels={steps}
            showNext={showNext}
            stepHandler={setWizardStep}
          >
            {/* Step 1 */}
            <Section titleEl={HEADING} title="Introduction">
              <h4>{experiment.title}</h4>
              {experiment.description}
            </Section>
            {/* Step 2 */}
            <Section titleEl={HEADING} title="Consent Form">
              <p>
                Please, complete the form below before completing the study.
              </p>
              <QualtricsEmbed
                url={
                  `${experiment.consent}` +
                  `?participant_id=${participantId}` +
                  `&experiment_id=${experimentId}`
                }
              />
            </Section>
            {/* Step 3 */}
            <Section titleEl={HEADING} title="Photo Instructions and Upload">
              <UploadPhoto
                photoUploadCompletionHandler={setPhotoStepCompleted}
              />
            </Section>
            {/* Step 4 */}
            <Section titleEl={HEADING} title="Pre-Study Questionnaire">
              <p>Please complete the pre-survey below.</p>
              <QualtricsEmbed
                url={
                  `${experiment.preSurvey}` +
                  `?participant_id=${participantId}` +
                  `&experiment_id=${experimentId}`
                }
              />
            </Section>
            {/* Step 5 */}
            <Section titleEl={HEADING} title="Image Selection Task">
              <ImageSelectionTask
                selectionTaskCompleted={selectionTaskCompleted}
                selectionTaskCompletionHandler={setSelectionTaskCompleted}
              />
            </Section>
            {/* Step 6 */}
            <Section titleEl={HEADING} title="Post-Study Questionnaire">
              <p>Please complete the post-survey below.</p>
              <QualtricsEmbed
                url={
                  `${experiment.postSurvey}` +
                  `?participant_id=${participantId}` +
                  `&experiment_id=${experimentId}`
                }
              />
            </Section>
            {/* Step 7 */}
            <Section titleEl={HEADING} title="Debriefing">
              <p>
                Thank you for participating in the study! Please complete the
                debriefing below to be credited for your participation.
              </p>
            </Section>
          </Wizard>
        </Constrain>
      </div>
    </Main>
  );
};
