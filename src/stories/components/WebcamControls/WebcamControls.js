import './styles.scss';

import React, { useState } from 'react';
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

  // toggle device camera
  const toggleCamera = () => {
    setWebcamOn(!cameraIsOn);
  };

  // take a photo
  const capturePhoto = React.useCallback(
    () => {
      setSnapshot(webcamRef.current.getScreenshot());
    },
    [webcamRef],
  );

  return (
    <div className="webcam-controls">
      <Constrain modifierClasses="constrain--narrow">
        <ToggleCamera onClick={() => toggleCamera()} toggleOn={cameraIsOn} />
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
