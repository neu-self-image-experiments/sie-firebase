import './styles.scss';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam';

import { PhotoInstructions } from '../PhotoInstructions/PhotoInstructions';
import { Button } from '../Button/Button';
import { Alert } from '../Alert/Alert';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';
import { ToggleCamera } from '../ToggleCamera/ToggleCamera';
import { FileUpload } from '../FileUpload/FileUpload';
import { uploadSelfImage, observeStimuliCompletion }
  from '../../../firebase/api/gcp-utils';
import { Loader } from '../Loader/Loader';
import { StatusCodes } from 'http-status-codes';

// Milliseconds to wait before attempting to fetch generated stimuli URLs
const STIMULI_GENERATION_WAIT_1 = 40000;
const STIMULI_GENERATION_WAIT_2 = 10000;

// Milliseconds to display alert for image upload
const DISPLAY_ALERT_TIME = 5000;

/**
 * Component for webcam controls and photo uploading.
 *
 * @component
 * @return {object} (
 *   <UploadPhoto />
 * )
 */
export const UploadPhoto = () => {
  // ===== STATE ==============================================================
  const { experimentId, participantId } = useParams(); // Parse URL params
  const [cameraIsOn, setWebcamOn] = useState(false);
  const [file, setFile] = useState(''); // For photos uploaded through form
  const [image, setImage] = useState(''); // For photos taken with webcam
  const [error, setError] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const webcamRef = React.useRef(null);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [stimuliUrls, setStimuliUrls] = useState([]);

  // ===== STATUS CHECKS ======================================================
  // Check for stimuli generation completion; 1st try.
  useEffect(() => {
    if (loading) {
      // Wait for the stimuli to be generated
      setTimeout(() => {
        observeStimuliCompletion(
          participantId,
          experimentId,
          setStimuliUrls,
          stimuliFetchingFirstTryFailed,
        );
      }, STIMULI_GENERATION_WAIT_1);
    }
  }, [loading]);

  // Check if stimuli URLs have been fetched
  useEffect(() => {
    if (stimuliUrls.length > 0) {
      setComplete(true);
      setLoading(false);
      setError(false);
    }
  }, [stimuliUrls]);

  // Check if photo uploading step is complete
  useEffect(() => {
    if (complete) {
      // TODO (fernandowinfield): enable 'Next' button.
      setDisplayAlert(true);
    }
  }, [complete]);

  useEffect(() => {
    if (displayAlert) {
      if (complete) {
        setAlertType('success');
        setTimeout(() => {
          setAlertType('');
        }, DISPLAY_ALERT_TIME);
      } else {
        setAlertType('fail');
        setTimeout(() => {
          setAlertType('');
        }, DISPLAY_ALERT_TIME);
      }
    }
  }, [complete]);

  // ===== STIMULI FETCHING RETRY HANDLERS ====================================
  // Error handler that checks for stimuli generation completion; 2nd try.
  const stimuliFetchingFirstTryFailed = (errorCode) => {
    // TODO (fernandowinfield): handle based on `errorCode`. Currently
    // `errorCode` is always undefined.
    setTimeout(() => {
      observeStimuliCompletion(
        participantId,
        experimentId,
        setStimuliUrls,
        stimuliFetchingSecondTryFailed,
      );
    }, STIMULI_GENERATION_WAIT_2);
  };

  // Error handler that prompts the participant to retake/reupload.
  const stimuliFetchingSecondTryFailed = (errorCode) => {
    // TODO (fernandowinfield): handle based on `errorCode`. Currently
    // `errorCode` is always undefined.

    setDisplayAlert(true);
  };

  // ===== WEBCAM FUNCTIONALITY ===============================================
  // Toggle device camera on/off
  const toggleCamera = () => {
    setWebcamOn(!cameraIsOn);
  };

  // Take a photo via webcam
  const capturePhoto = React.useCallback(() => {
    setImage(webcamRef.current.getScreenshot());
    document.getElementById('fileName').innerHTML = 'No file selected.';
  }, [webcamRef]);


  // ===== FILE UPLOADING THROUGH FORM ========================================
  // Upload file from form (<FileUpload/>) input
  const uploadFile = (target) => {
    setFile(target.files.item(0));
    setImage('');
  };

  // ===== UPLOAD TO SERVER FUNCTIONALITY =====================================
  // Upload photo to the server to generate stimuli
  const uploadPhoto = () => {
    if (image) {
      // Case 1: photo was taken with the webcam
      fetch(image).then((response) => response.blob())
        .then((blob) => {
          const imageFile = new File([blob], 'photo', { type: 'image/jpeg' });
          setFile(imageFile);
          uploadSelfImage(
            participantId, experimentId, imageFile,
          ).then((response) => {
            handleUploadSelfImage(response);
          });
        });
    } else if (file) {
      // Case 2: photo was uploaded through the form (<FileUpload/>)
      uploadSelfImage(
        participantId, experimentId, file,
      ).then((response) => {
        handleUploadSelfImage(response);
      });
    }
  };

  // Check if photo was uploaded successfully to the server
  const handleUploadSelfImage = (response) => {
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
  };

  // ===== RENDERING ==========================================================
  // To preview photos that come from <FileUpload /> we need to generate a src
  const imageSrc = file ?
    URL.createObjectURL(file) :
    image;

  return (
    loading ?
      <Loader text="Please wait! Your photo is being processed..." /> :
      <div>
        { alertType === 'success' ?
          <Alert
            modifierClasses="success"
            title="SUCCESS"
            content="Your photo has been accepted" /> :
          alertType === 'fail' ?
            <Alert
              modifierClasses="error"
              title="ERROR"
              content={'Something went wrong. Please use your webcam to ' +
                'retake your photo or use the form to upload your photo ' +
                'again'} /> :
            null
        }
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
              <ImageGuidelines content={ <img src={imageSrc} /> } />
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
      </div>
  );
};
