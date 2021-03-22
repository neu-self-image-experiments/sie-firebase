import './styles.scss';

import React, { useState } from 'react';
import Webcam from 'react-webcam';

import { PhotoInstructions } from '../PhotoInstructions/PhotoInstructions';
import { Button } from '../Button/Button';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';
import { ToggleCamera } from '../ToggleCamera/ToggleCamera';
import { FileUpload } from '../FileUpload/FileUpload';
import ImageService from '../../../firebase/CRUDServices/imageService';

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
  const [image, setImage] = useState('');
  const webcamRef = React.useRef(null);

  // toggle device camera
  const toggleCamera = () => {
    setWebcamOn(!cameraIsOn);
  };

  // take a photo
  const capturePhoto = React.useCallback(
    () => {
      setImage(webcamRef.current.getScreenshot());
    },
    [webcamRef],
  );

  const uploadPhoto = () => {
    const service = ImageService.getInstance();
    const userId = 'test';
    const experimentId = '001';
    service.postRawImage(userId, experimentId, image).then((response) => {
      // REMOVE EVENTUALLY
      window.alert(response);
    });
  };

  const selectImage = (target) => {
    setImage(target.files.item(0));

    if (document.getElementById('file-upload__input')) {
      const name = document.getElementById('file-upload__input');
      const selectedFile = name.files.item(0).name;
      document.getElementById('file-upload__selected').innerHTML = selectedFile;
    }
  };

  return (
    <div className="upload-photo">
      <PhotoInstructions />
      <ToggleCamera onClick={() => toggleCamera()} toggleOn={cameraIsOn} />
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
      <FileUpload onChange={(e) => selectImage(e.target)} />
      <div className="upload-photo__submit">
        <p>Once you are ready. You can upload your photo here.</p>
        <Button
          isButton={true}
          modifierClasses="upload-photo__btn button--small"
          text="Upload"
          onClick={() => uploadPhoto()} />
      </div>
    </div>
  );
};
