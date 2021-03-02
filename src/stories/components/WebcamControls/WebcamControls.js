import './styles.scss';

import React, { useState } from 'react';

import { Button } from '../../components/Button/Button';

/**
 * Component for webcam controls element.
 *
 * @component
 * @return {object} (
 *   <WebcamControls handleCameraOn={handleCameraOn}
 *             handleCameraOff={handleCameraOff}
 *   />
 * )
 */
export const WebcamControls = () => {
  const [webcamOn, setWebcamOn] = useState(false);

  const turnCameraOn = () => {
    // do something
    setWebcamOn(true);
  };

  const turnCameraOff = () => {
    // do something
    setWebcamOn(false);
  };

  return (
    <div className="webcam-controls">
      <p>Please upload or use your webcam to take and submit a picture of your
        face that meets the following requirements:</p>
      <ol className="webcam-controls__instructions">
        <li>Well-lit with face clearly visible</li>
        <li>Face centered in the middle of the frame</li>
        <li>Facing forward, eyes looking into camera</li>
        <li>Neutral facial expression</li>
        <li>Nothing in front of face (e.g., no hats; glasses removed;
          hair (including bangs) pulled away from face; hands not
          touching face; large earrings removed)</li>
      </ol>
      <div className="webcam-controls__buttons">
        <Button
          modifierClasses={
            `button--small button--secondary ${webcamOn && 'is-disabled'} `
          }
          isButton={true}
          text="Turn Camera On"
          onClick={() => turnCameraOn()}
        />
        <Button
          modifierClasses={
            `button--small button--quaternary ${!webcamOn && 'is-disabled'} `
          }
          isButton={true}
          text="Turn Camera Off"
          onClick={() => turnCameraOff()}
        />
      </div>
    </div>
  );
};

