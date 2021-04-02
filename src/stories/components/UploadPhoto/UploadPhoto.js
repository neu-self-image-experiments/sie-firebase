import './styles.scss';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam';

import { PhotoInstructions } from '../PhotoInstructions/PhotoInstructions';
import { Button } from '../Button/Button';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';
import { ToggleCamera } from '../ToggleCamera/ToggleCamera';
import { FileUpload } from '../FileUpload/FileUpload';
import { uploadSelfImage, observeStimuliCompletion }
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
  const { experimentId, participantId } = useParams();

  const [cameraIsOn, setWebcamOn] = useState(false);
  const [file, setFile] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(false);
  const webcamRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [stimuliUrls, setStimuliUrls] = useState([]);

  // TODO call useEffect() to listen for stimuli completion
  // TODO: call observeStimuliCompletion here with timer to avoid
  // long open listeners, should be around 4000ms;
  useEffect(() => {
    setTimeout(() => {
      observeStimuliCompletion(
        participantId,
        experimentId,
        setStimuliUrls,
        stimuliReadyFailed,
      );
    }, 4000);
  }, []);

  // TODO: useEffect({}, [urls]) to check if all urls are fetched
  useEffect(() => {
    checkStimuli();
    stimuliReady();
  }, [stimuliUrls]);

  // TODO: image URLs handler
  const stimuliReady = () => {
    // Probably call custom hook here to save stimuli urls in state
    // Maybe also enable 'next' button
    window.alert('Stimuli URLs are ready!');
  };

  // TODO: image error handler
  const stimuliReadyFailed = (errorCode) => {
    window.alert('Stimuli fetching failed: ' + errorCode);
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

  // check if stimuli generation is successful
  const checkStimuli = () => {
    if (stimuliUrls.length > 0) {
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
