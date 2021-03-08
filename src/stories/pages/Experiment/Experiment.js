import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { Header } from '../../layouts/Header/Header';
import { Main } from '../../layouts/Main/Main';
import { Wizard } from '../../layouts/Wizard/Wizard';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { PhotoInstructions } from
  '../../components/PhotoInstructions/PhotoInstructions';
import { WebcamControls } from '../../components/WebcamControls/WebcamControls';

/**
 * Component for experiment page.
 *
 * @component
 * @param {string} title experiment's title
 * @return {object} (
 *   <Experiment title={title} />
 * )
 */

export const Experiment = ({ title }) => {
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
        leftContent={<h5>{title}</h5>}
      />
      <div className="experiment">
        <Constrain>
          <Wizard labels={steps}>
            <div className="step-1">
              <h3>Introduction</h3>
              <h4>{title}</h4>
              <p>
                Lorem ipsum dolor sit amet, an has summo
                riure epicuri, has illud rationibus et. Prima ridens sit te,
                nam idque explicari expetendis in. An mei adolescens
                mnesarchum, ei periculis adipiscing per, probo populo nec ad.
              </p>
              <p>
                Lorem ipsum dolor sit amet, an has summo
                riure epicuri, has illud rationibus et. Prima ridens sit te,
                nam idque explicari expetendis in. An mei adolescens
                mnesarchum, ei periculis adipiscing per, probo populo nec ad.
              </p>
            </div>
            <div className="step-2">
              <h3>Consent Form</h3>
              <p>
                Lorem ipsum dolor sit amet, an has summo
                riure epicuri, has illud rationibus et. Prima ridens sit te,
                nam idque explicari expetendis in. An mei adolescens
                mnesarchum, ei periculis adipiscing per, probo populo nec ad.
              </p>
              <p>
                Lorem ipsum dolor sit amet, an has summo
                riure epicuri, has illud rationibus et. Prima ridens sit te,
                nam idque explicari expetendis in. An mei adolescens
                mnesarchum, ei periculis adipiscing per, probo populo nec ad.
              </p>
            </div>
            <div className="step-3">
              <h3>Photo Instructions and Upload</h3>
              <PhotoInstructions />
              <WebcamControls />
            </div>
            <div className="step-4">
              <h3>Pre-Survey</h3>
              <p>Please, answer the questionnaire below.</p>
              <p>
                Lorem ipsum dolor sit amet, an has summo
                riure epicuri, has illud rationibus et. Prima ridens sit te,
                nam idque explicari expetendis in. An mei adolescens
                mnesarchum, ei periculis adipiscing per, probo populo nec ad.
              </p>
              <p>
                Lorem ipsum dolor sit amet, an has summo
                riure epicuri, has illud rationibus et. Prima ridens sit te,
                nam idque explicari expetendis in. An mei adolescens
                mnesarchum, ei periculis adipiscing per, probo populo nec ad.
              </p>
            </div>
            <div className="step-5">
              <h3>Image Selection Task</h3>
              <p>
                In the following computer task, you will complete a series of
                trials where you will be asked to make a split-second choice
                between two images of yourself.
              </p>
              <p>
                Each image is based on an actual photograph of you, but there
                is noise/static on top of the photo that may alter its
                appearance. The differences between the two images may be
                quite subtle, so we ask that you go with your gut.
              </p>
              <p>
                Put your middle or index fingers on the E and I keys of your
                keyboard. Two pictures will appear side by side on the screen.
                For each pair of pictures, we would like you to select the
                picture that is most like you. To select the image on the left
                side press the E key; to select the image on the right press
                the I key.
              </p>
              <p>
                This task is timed and will take approximately 20 minutes to
                complete. There are no wrong answers, so GO AS FAST AS YOU
                CAN. Responses that are too slow will not be recorded.
              </p>
              <p>
                To get started, go this [URL]
              </p>
            </div>
            <div className="step-6">
              <h3>Post-Survey</h3>
              <p>Please, answer the questionnaire below.</p>
              <p>
                Lorem ipsum dolor sit amet, an has summo
                riure epicuri, has illud rationibus et. Prima ridens sit te,
                nam idque explicari expetendis in. An mei adolescens
                mnesarchum, ei periculis adipiscing per, probo populo nec ad.
              </p>
              <p>
                Lorem ipsum dolor sit amet, an has summo
                riure epicuri, has illud rationibus et. Prima ridens sit te,
                nam idque explicari expetendis in. An mei adolescens
                mnesarchum, ei periculis adipiscing per, probo populo nec ad.
              </p>
            </div>
            <div className="step-7">
              <h3>Debriefing</h3>
              <p>Thank you for participating in the experiment.</p>
            </div>
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
};

Experiment.defaultProps = {
  title: '',
};
