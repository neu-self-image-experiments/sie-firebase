import './styles.scss';

import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';

import { PhotoInstructions } from '../PhotoInstructions/PhotoInstructions';
import { Button } from '../Button/Button';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';
import { ToggleCamera } from '../ToggleCamera/ToggleCamera';
import { FileUpload } from '../FileUpload/FileUpload';
import { uploadSelfImage, observeStimuliCompletion, unsubscribe }
  from '../../../firebase/api/gcp-utils';
import { Loader } from '../Loader/Loader';
import { StatusCodes } from 'http-status-codes';

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
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [complete, setComplete] = useState(false);

  // image URLs handler
  const imageUrlsHandler = (urlArray) => {
    setUrls(urlArray);
  };

  // image error handler
  const errorHandler = (errorMessage) => {
    // display user message
    setComplete(false);
  };

  // toggle device camera
  const toggleCamera = () => {
    setWebcamOn(!cameraIsOn);
  };

  // take a photo via webcam
  const capturePhoto = React.useCallback(() => {
    setImage(webcamRef.current.getScreenshot());
    document.getElementById('fileName').innerHTML = 'No file selected.';
  }, [webcamRef]);

  // use file input value
  const uploadFile = (target) => {
    // set file variable
    setFile(target.files.item(0));
    // reset image
    setImage('');
  };

  // listen for stimuli completion
  useEffect(() => {
    // TODO: get userId and experimentId here
    observeStimuliCompletion('test', '001', imageUrlsHandler, errorHandler);
    return () => {
      unsubscribe();
    };
  }, [loading]);

  // check if all urls are fetched
  useEffect(() => {
    checkStimuli();
  }, [urls]);

  // check if stimuli generation is successful
  const checkStimuli = () => {
    if (urls.length > 0) {
      setComplete(true);
      setLoading(false);
      setError(false);
    } else {
      setError(true);
    }
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
    uploadSelfImage(
      userId, experimentId, file,
    ).then((response) => {
      // REMOVE EVENTUALLY
      switch (response.status) {
      case StatusCodes.CREATED:
        setLoading(true);
        return;
      case StatusCodes.INTERNAL_SERVER_ERROR:
        setError(true);
        return;
      default:
        return;
      }
    });
  };

  return loading ? (
    <Loader
      text="Please wait! Your photo is being processed..."
    />
  ) : complete ? (
    <div>
      { urls }
    </div>
  ) : (
    <div className="upload-photo">
      <PhotoInstructions />
      <ToggleCamera onClick={() => toggleCamera()} />
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
              onClick={() => {
                capturePhoto();
              }}
            />
          }
        </div>
        <div className="upload-photo__item">
          <ImageGuidelines content={ <img src={image} /> } />
          <p>Your photo will appear here.</p>
        </div>
      </div>
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
    </div>
  );
};
