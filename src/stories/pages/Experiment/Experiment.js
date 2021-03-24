import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';

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

/**
 * Component for experiment page.
 *
 * @component
 * @param {string} title experiment's title
 * @param {string} description experiment's description
 * @param {array} consent experiment's conset forms
 * @param {string} url experiment's description
 * @param {string} preSurveys experiment's pre-survey questionnaires
 * @param {string} postSurveys experiment's post-survey questionnaires
 * @return {object} (
 *   <Experiment title={title} description={description} />
 * )
 */

export const Experiment = ({
  title, description, consent, url, preSurveys, postSurveys,
}) => {
  // const { experimentId } = useParams();
  const [experiment, setExperiment] = useState({});
  useEffect(() => {
    getExperimentById('Alessiatest').then((res) => {
      setExperiment(res.data);
    });
  }, []);

  // test Experiment ID Pl3WJYa7vQ1ALVt0rHRV

  const HEADING = 'h3';
  const steps = [
    'Introduction',
    'Consent form',
    'Photo Instructions and Upload',
    'Pre-Survey',
    'Image Selection Task',
    'Post-Survey',
    'Debriefing',
  ];

  return (
    <Main>
      <Header
        leftContent={<h5>{experiment.title}</h5>}
      />
      <div className="experiment">
        <Constrain>
          <Wizard labels={steps}>
            {/* Step 1 */}
            <Section titleEl={HEADING} title='Introduction'>
              <h4>{experiment.title}</h4>
              {description}
            </Section>
            {/* Step 2 */}
            <Section titleEl={HEADING} title='Consent Form'>
              <p>Please, complete the form below before completing the
                study.</p>
              <QualtricsEmbed url={experiment.consent} />
            </Section>
            {/* Step 3 */}
            <Section titleEl={HEADING} title='Photo Instructions and Upload'>
              <UploadPhoto />
            </Section>
            {/* Step 4 */}
            <Section titleEl={HEADING} title='Pre-Study Questionnaire'>
              <p>Please complete the (first/second) pre-survey below.</p>
              { preSurveys.map((form, i) => {
                return <QualtricsEmbed key={i} url={form} />;
              })
              }
            </Section>
            {/* Step 5 */}
            <Section titleEl={HEADING} title='Image Selection Task'>
              <ImageSelectionTask url={url} />
            </Section>
            {/* Step 6 */}
            <Section titleEl={HEADING} title='Post-Study Questionnaire'>
              <p>Please complete the (first/second) post-survey below.</p>
              { postSurveys.map((form, i) => {
                return <QualtricsEmbed key={i} url={form} />;
              })
              }
            </Section>
            {/* Step 7 */}
            <Section titleEl={HEADING} title='Debriefing'>
              <p>Thank you for participating in the study!
                Please complete the debriefing below to be credited
                for your participation.</p>
            </Section>
          </Wizard>
        </Constrain>
      </div>
    </Main>
  );
};

Experiment.propTypes = {
  /**
   * Experiment's title
   */
  title: PropTypes.string,
  /**
   * Experiment's description
   */
  description: PropTypes.string,
  /**
   * Experiment's url
   */
  url: PropTypes.string.isRequired,
  /**
   * Experiment's consent forms
   */
  consent: PropTypes.string.isRequired,
  /**
   * Experiment's pre-survey forms
   */
  preSurveys: PropTypes.array.isRequired,
  /**
   * Experiment's post-survey forms
   */
  postSurveys: PropTypes.array.isRequired,
};

Experiment.defaultProps = {
  title: '',
  description: '',
  url: '',
  consent: '',
  preSurveys: [],
  postSurveys: [],
};
