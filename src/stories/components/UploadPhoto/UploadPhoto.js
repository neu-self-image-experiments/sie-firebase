import './styles.scss';

import React, { useState } from 'react';
import Webcam from 'react-webcam';

import { PhotoInstructions } from '../PhotoInstructions/PhotoInstructions';
import { Constrain } from '../../layouts/Constrain/Constrain';
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
/* eslint-disable */
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
    console.log(image)
  );

  const uploadPhoto = () => {
    const service = ImageService.getInstance();
    // remove hard coded values eventually
    service.postRawImage('test', '001', image).then(res => {
      console.log('Hello');
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
          <p>Your photo will appear here. If you are satisfied with it,
            you can upload it to the server.
          </p>
        </div>
      </div>
      <Constrain modifierClasses="constrain--narrow">
        <FileUpload onChange={(e) => selectImage(e.target)} />
        <div className="upload-photo__submit">
          <p>Once you're ready. You can upload your photo here.</p>
          <Button
            isButton={true}
            modifierClasses="upload-photo__btn button--small"
            text="Upload"
            onClick={() => uploadPhoto()} />
        </div>
      </Constrain>
    </div>
  );
};
