import './styles.scss';

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';

import { Constrain } from '../../layouts/Constrain/Constrain';
import { Button } from '../Button/Button';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';

/**
 * Component for webcam controls element.
 *
 * @component
 * @return {object} (
 *   <WebcamControls />
 * )
 */
export const WebcamControls = () => {
  const [webcamOn, setWebcamOn] = useState(false);

  const toggleCamera = () => {
    // do something
    setWebcamOn(!webcamOn);
  };

  return (
    <div className="webcam-controls">
      <Constrain modifierClasses="constrain--narrow">
        <InstructionsAndControls webcamOn={webcamOn}
          toggleCamera={() => toggleCamera()}
        />
      </Constrain>
      <div className="webcam-controls__images">
        <div className="webcam-controls__item">
          <ImageGuidelines content={ webcamOn &&
            <Webcam screenshotFormat='image/jpeg' height={240} width={320} />
          } />
          <p>Align your face with the guiding lines.</p>
          <Button
            modifierClasses="button--small button--tertiary"
            isButton={true}
            text="Take a photo"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Component for instructions and webcam controls element.
 *
 * @component
 * @param {boolean} webcamOn whether the webcam is on or off.
 * @param {func} toggleCamera function to toggle camera on/off.
 * @return {object} (
 *   <InstructionsAndControls turnCameraOn={turnCameraOn}
 *      turnCameraOff={turnCameraOff} webcamOn={webcamOn}
 *    />
 * )
 */
const InstructionsAndControls = ({ webcamOn, toggleCamera }) =>
  <Fragment>
    <h3>Photo Instructions and Upload</h3>
    <p>Please upload or use your webcam to take and submit a picture of your
      face that meets the following requirements:</p>
    <ol className="webcam-controls__instructions">
      <li>Well-lit with face clearly visible;</li>
      <li>Face centered in the middle of the frame;</li>
      <li>Facing forward, eyes looking into camera;</li>
      <li>Neutral facial expression;</li>
      <li>Nothing in front of face (e.g., no hats; glasses removed;
        hair (including bangs) pulled away from face; hands not
        touching face; large earrings removed).</li>
    </ol>
    <div className="webcam-controls__buttons">
      <h4>Ready to take a photo?</h4>
      <Button
        modifierClasses={
          `button--small button--secondary ${webcamOn && 'is-disabled'} `
        }
        isButton={true}
        text="Turn Camera On"
        onClick={toggleCamera}
      />
    </div>
  </Fragment>;

InstructionsAndControls.propTypes = {
  /**
   * InstructionsAndControls's toggleCamera
   */
  toggleCamera: PropTypes.func,
  /**
   * InstructionsAndControls's webcamOn
   */
  webcamOn: PropTypes.bool,
};

InstructionsAndControls.defaultProps = {
  toggleCamera: null,
  webcamOn: false,
};
