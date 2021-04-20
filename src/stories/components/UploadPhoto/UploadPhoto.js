import './styles.scss';

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import PropTypes from 'prop-types';

import { PhotoInstructions } from '../PhotoInstructions/PhotoInstructions';
import { Button } from '../Button/Button';
import { ImageGuidelines } from '../ImageGuidelines/ImageGuidelines';
import { ToggleCamera } from '../ToggleCamera/ToggleCamera';
import { FileUpload } from '../FileUpload/FileUpload';
import { uploadSelfImage, observeFacialDetectionStatus }
  from '../../../firebase/api/gcp-utils';
import { Loader } from '../Loader/Loader';
import { StatusCodes } from 'http-status-codes';

// Milliseconds to wait before checking for the facial detection scan result
const FACIAL_DETECTION_WAIT = 10000;

const INITIAL_STATE = {
  imageFeedback: 'Once you are ready. You can upload your photo here.',
};

/**
 * Component for webcam controls and photo uploading.
 *
 * @component
 * @return {object} (
 *   <UploadPhoto />
 * )
 */
export const UploadPhoto = ({ photoUploadCompletionHandler }) => {
  // ===== STATE ==============================================================
  const { experimentId, participantId } = useParams(); // Parse URL params
  const [cameraIsOn, setWebcamOn] = useState(false);
  const [file, setFile] = useState(''); // For photos uploaded through form
  const [image, setImage] = useState(''); // For photos taken with webcam
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageFeedback, setImageFeedback] =
      useState(INITIAL_STATE.imageFeedback);
  const webcamRef = React.useRef(null);

  // ===== STATUS CHECKS ======================================================
  // Check for status of facial detection scan
  useEffect(() => {
    if (loading) {
      // Wait for facial detection to execute
      setTimeout(() => {
        observeFacialDetectionStatus(
          participantId,
          experimentId,
          setImageFeedback,
        );
      }, FACIAL_DETECTION_WAIT);
    }
  }, [loading]);

  // Check if photo uploading step is complete
  useEffect(() => {
    if (imageFeedback === 'Photo requirements passed!') {
      photoUploadCompletionHandler(true);
    } else {
      photoUploadCompletionHandler(false);
    }
    setLoading(false);
  }, [imageFeedback]);

  // ===== WEBCAM FUNCTIONALITY ===============================================
  // Toggle device camera on/off
  const toggleCamera = () => {
    setWebcamOn(!cameraIsOn);
  };

  // Take a photo via webcam
  const capturePhoto = React.useCallback(() => {
    setImage(webcamRef.current.getScreenshot());
    setFile('');
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
    setImageFeedback(INITIAL_STATE.imageFeedback);
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
      break;
    case StatusCodes.INTERNAL_SERVER_ERROR:
      setError(true);
      break;
    default:
      break;
    };
  };

  // ===== RENDERING ==========================================================
  // To preview photos that come from <FileUpload /> we need to generate a src
  const imageSrc = file ?
    URL.createObjectURL(file) :
    image;

  return loading ?
    <Loader text="Please wait! Your photo is being processed..." /> :
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
      {(image || file) &&
        <div className="upload-photo__submit">
          <p>{imageFeedback}</p>
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
      }
    </div>;
};

UploadPhoto.propTypes = {
  /**
   * React hook to signal completion of the photo uploading step
   */
  photoUploadCompletionHandler: PropTypes.func,
};
