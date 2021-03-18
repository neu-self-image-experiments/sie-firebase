import './styles.scss';

import React, { useState } from 'react';
import Webcam from 'react-webcam';

import { PhotoInstructions } from '../PhotoInstructions/PhotoInstructions';
import { Constrain } from '../../layouts/Constrain/Constrain';
import { Button } from '../Button/Button';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';
import { ToggleCamera } from '../ToggleCamera/ToggleCamera';
import { FileUpload } from '../FileUpload/FileUpload';
import { uploadImageToStorage } from '../../../firebase/api/gcp-utils';

/**
 * Component for webcam controls element.
 *
 * @component
 * @return {object} (
 *   <UploadPhoto />
 * )
 */
export const UploadPhoto = () => {
  const [cameraIsOn, setWebcamOn] = useState(false);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const webcamRef = React.useRef(null);

  // toggle device camera
  const toggleCamera = () => {
    setWebcamOn(!cameraIsOn);
  };

  // take a photo via webcam
  const capturePhoto = React.useCallback(
    () => {
      setImage(webcamRef.current.getScreenshot());
      // reset file
      setFile('');
      // reset input value
      const input = document.getElementById('file-upload__selected');
      input.innerHTML = 'No file selected.';
    },
    [webcamRef],
  );

  // use file input value
  const uploadFile = (target) => {
    // set file variable
    setFile(target.files.item(0));
    // reset image
    setImage('');
  };

  // upload photo to the server to generate stimuli
  const uploadPhoto = () => {
    // REMOVE EVENTUALLY
    const userId = 'test';
    const experimentId = '001';

    if (image) {
      fetch(image).then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], 'photo', { type: 'image/jpeg' });
          setFile(file);
        });
    }
    // call gcp util function
    uploadImageToStorage(
      userId, experimentId, file, 'sie-raw-images',
    ).then((response) => {
      // REMOVE EVENTUALLY
      switch (response.status) {
      case '201':
        // UPDATE WITH BETTER RESPONSE EVENTUALLY
        return;
      case '500':
        setError(true);
        return;
      default:
        return;
      }
    });
  };

  return (
    <div className="upload-photo">
      <Constrain modifierClasses="constrain--narrow">
        <PhotoInstructions />
        <ToggleCamera onClick={() => toggleCamera()} toggleOn={cameraIsOn} />
      </Constrain>
      <div className="upload-photo__images">
        <div className="upload-photo__item">
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
        <div className="upload-photo__item">
          <ImageGuidelines content={ <img src={image} /> } />
          <p>Your photo will appear here.</p>
        </div>
      </div>
      <Constrain modifierClasses="constrain--narrow">
        <FileUpload onChange={(e) => uploadFile(e.target)} />
        <div className="upload-photo__submit">
          <p>Once you are ready. You can upload your photo here.</p>
          <Button
            isButton={true}
            modifierClasses="upload-photo__btn button--small"
            text="Upload"
            onClick={() => uploadPhoto()} />
          { error &&
            <p className="upload-photo__err">
              Something went wrong and your photo could not be uploaded.
              Please, try again.</p>
          }
        </div>
      </Constrain>
    </div>
  );
};
