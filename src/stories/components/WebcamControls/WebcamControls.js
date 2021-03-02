import './styles.scss';

import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Webcam from 'react-webcam';

import { Constrain } from '../../layouts/Constrain/Constrain';
import { Button } from '../Button/Button';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';
import { ToggleCamera } from '../ToggleCamera/ToggleCamera';

/**
 * Component for webcam controls element.
 *
 * @component
 * @return {object} (
 *   <WebcamControls />
 * )
 */
export const WebcamControls = () => {
  const [cameraIsOn, setWebcamOn] = useState(false);
  const [snapshot, setSnapshot] = useState('');
  const webcamRef = React.useRef(null);

  const toggleCamera = () => {
    // do something
    setWebcamOn(!cameraIsOn);
  };


  const capturePhoto = React.useCallback(
    () => {
      setSnapshot(webcamRef.current.getScreenshot());
    },
    [webcamRef],
  );

  return (
    <div className="webcam-controls">
      <Constrain modifierClasses="constrain--narrow">
        <InstructionsAndControls cameraIsOn={cameraIsOn}
          onClick={() => toggleCamera()}
        />
      </Constrain>
      <div className="webcam-controls__images">
        <div className="webcam-controls__item">
          <ImageGuidelines content={ cameraIsOn &&
            <Webcam screenshotFormat='image/jpeg'
              height={240} width={320} ref={webcamRef}
            />
          } />
          <p>Align your face with the guiding lines.</p>
          { cameraIsOn &&
            <Button
              modifierClasses="button--small button--secondary"
              isButton={true}
              text="Take a photo"
              onClick={() => capturePhoto()}
            />
          }
        </div>
        <div className="webcam-controls__item">
          <ImageGuidelines content={ <img src={snapshot} /> } />
          <p>Your photo will appear here. If you are satisfied with it,
            you can submit it.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Component for instructions and webcam controls element.
 *
 * @component
 * @param {boolean} cameraIsOn whether the webcam is on or off.
 * @param {func} onClick function to toggle camera on/off.
 * @return {object} (
 *   <InstructionsAndControls turnCameraOn={turnCameraOn}
 *      turnCameraOff={turnCameraOff} cameraIsOn={cameraIsOn}
 *    />
 * )
 */
const InstructionsAndControls = ({ cameraIsOn, onClick }) =>
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
    <ToggleCamera onClick={onClick} toggleOn={cameraIsOn} />
  </Fragment>;

InstructionsAndControls.propTypes = {
  /**
   * InstructionsAndControls's onClick
   */
  onClick: PropTypes.func,
  /**
   * InstructionsAndControls's cameraIsOn
   */
  cameraIsOn: PropTypes.bool,
};

InstructionsAndControls.defaultProps = {
  onClick: null,
  cameraIsOn: false,
};
