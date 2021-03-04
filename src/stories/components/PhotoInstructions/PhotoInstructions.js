import './styles.scss';

import React from 'react';

/**
 * Component for photo upload instructions.
 *
 * @component
 * @return {object} (
 *   <PhotoInstructions />
 * )
 */
export const PhotoInstructions = () =>
  <div className="photo-instructions">
    <p>Please upload or use your webcam to take and submit a picture of your
      face that meets the following requirements:</p>
    <ol className="photo-instructions__steps">
      <li>Well-lit with face clearly visible;</li>
      <li>Face centered in the middle of the frame;</li>
      <li>Facing forward, eyes looking into camera;</li>
      <li>Neutral facial expression;</li>
      <li>Nothing in front of face (e.g., no hats; glasses removed;
        hair (including bangs) pulled away from face; hands not
        touching face; large earrings removed).</li>
    </ol>
    <p>Take a photo with your webcam or upload a photo using the below tools.
      Please ensure your image meets the requirements outlined above,
      and that your face is aligned with the guiding lines.</p>
  </div>;
