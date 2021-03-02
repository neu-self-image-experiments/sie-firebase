import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component for webcam controls element.
 *
 * @component
 * @param {funct} handleCameraOn turn webcam on.
 * @param {funct} handleCameraOff turn webcam off.
 * @return {object} (
 *   <WebcamControls handleCameraOn={handleCameraOn}
 *             handleCameraOff={handleCameraOff}
 *   />
 * )
 */
export const WebcamControls = ({ handleCameraOn, handleCameraOff }) => {
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
    </div>
  );
};

WebcamControls.propTypes = {
  /**
   * WebcamControls's handleCameraOn
   */
  handleCameraOn: PropTypes.func,
  /**
   * WebcamControls's handleCameraOff
   */
  handleCameraOff: PropTypes.func,
};

