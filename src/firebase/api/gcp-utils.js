import { firestore, app } from '../firebase';
import { firestoreCollections, storageBuckets } from '../constants';
import { StatusCodes } from 'http-status-codes';

/**
 * Upload image for self image experiment.
 * @param {String} userId userId
 * @param {String} experimentId experimentId
 * @param {Blob} image image file to be uploaded
 *
 * @return {JSON}
 */
export const uploadSelfImage = async (userId, experimentId, image) => {
  return uploadImageToStorage(userId, experimentId,
    image, storageBuckets.SIE_RAW_IMGS);
};

/**
 * Upload an image to the specified bucket.
 * @param {String} userId userId
 * @param {String} experimentId experimentId
 * @param {Blob} image image file to be uploaded
 * @param {String} bucket bucket destination bucket
 *
 * @return {JSON}
 */
const uploadImageToStorage = async (
  userId, experimentId, image, bucket) => {
  const imageName = `${userId}-${experimentId}.${image.name.split('.').pop()}`;

  const rawImageBucketRef = app.storage(bucket).ref();
  const newImageRef = rawImageBucketRef.child(imageName);
  return await newImageRef.put(image).then(() => {
    return {
      status: StatusCodes.CREATED,
      data: null,
      error: null,
    };
  }).catch((error) => {
    return {
      status: StatusCodes.UNAUTHORIZED,
      data: null,
      error: `user not authenticated ${error.code}`,
    };
  });
};

/**
 * Convert user selection result json array into csv
 * than upload to storage bucket.
 * @param {String} userId userId
 * @param {String} experimentId experimentId
 * @param {Array} selectionResult user selection result JSON Array
 *
 * @return {JSON}
 */
export const uploadSelectionResult = async (
  userId, experimentId, selectionResult) => {
  const csvPath = `${userId}-${experimentId}/user_selection.csv`;
  // convert json to csv
  const csvStr = jsonArray2CSV(selectionResult);
  const csvBlob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
  const userSelectionBucketRef = app.storage(
    storageBuckets.SIE_USER_SELECTIONS).ref();

  const csvRef = userSelectionBucketRef.child(csvPath);
  return await csvRef.put(csvBlob).then(() => {
    return {
      status: StatusCodes.CREATED,
      data: null,
      error: null,
    };
  }).catch((error) => {
    return {
      status: StatusCodes.UNAUTHORIZED,
      data: null,
      error: `user not authenticated ${error.code}`,
    };
  });
};

/**
 * Convert json array into csv string
 * @param {Array} jsonArray
 * @return {String}
 */
const jsonArray2CSV = (jsonArray) => {
  // handle null values
  const replacer = (_, value) => value === null ? '' : value;
  const header = Object.keys(jsonArray[0]);
  // convert each json object into csv row
  let csv = jsonArray.slice(1).map((json) =>
    header.map((fieldName) => JSON.stringify(json[fieldName], replacer))
      .join(','));
  // move to the top
  csv.unshift(header.join(','));
  csv = csv.join('\r\n');

  return csv;
};

/**
 * Listen to user document for the status of facial detection process
 * @param {String} userId userId
 * @param {String} experimentId experimentId
 * @param {Function} imageFeedbackHandler react hook function for imageFeedback
 */
export const observeFacialDetectionStatus =
  async (userId, experimentId, imageFeedbackHandler) => {
    try {
      firestore.collection(firestoreCollections.USER)
        .doc(userId).collection(firestoreCollections.EXPERIMENT)
        .doc(experimentId).onSnapshot(async (doc) => {
          const userDoc = doc.data();
          // TODO: should check if userDoc exists here
          const facialDetectionStatus = userDoc['facial_detection_status'];
          if (facialDetectionStatus === 'completed') {
            imageFeedbackHandler('Photo requirements passed!');
          } else {
            imageFeedbackHandler(facialDetectionStatus);
          }
        });
    } catch (error) {
      imageFeedbackHandler(error);
    }
  };

/**
 * Listen to user document for the signal of stimuli generation completion
 * @param {String} userId userId
 * @param {String} experimentId experimentId
 * @param {Function} imageUrlsHandler react hook function for imageUrls
 * @param {Function} errorHandler react hook function for error.
 */
export const observeStimuliCompletion =
  async (userId, experimentId, imageUrlsHandler, errorHandler) => {
    // TODO: refactor for multiple experiments inside user doc
    firestore.collection(firestoreCollections.USER)
      .doc(userId).onSnapshot(async (doc) => {
        const userDoc = doc.data();
        const stimuliStatus = userDoc.sie_stimuli_generation_status;
        if (stimuliStatus === 'completed') {
          await getSieStimuliFromBucket(userId, experimentId)
            .then((results) => {
              const status = results.status;
              if (status === StatusCodes.OK) {
              // successfully get all image urls
                imageUrlsHandler(results.data);
              } else {
              // one of the image url is unable to fetch
                errorHandler(results.message);
              }
            });
        } else {
          // “face_missing”, “failed”
          // call setError() for image processing status, display on frontend
          errorHandler(stimuliStatus);
        }
      });
  };

/**
 * Get all stimuli image urls from bucket to display in img tags.
 * @param {String} userId user id
 * @param {String} experimentId experiment id
 * @return {JSON} JSON object including array of processed self image urls
 */
export const getSieStimuliFromBucket = (userId, experimentId) => {
  const imageFilterFunction = (url) => {
    const urlObj = new URL(url);
    const pathName = urlObj.pathname.split('/').pop();
    return pathName.split('.')[1] === 'jpg';
  };
  return getFileUrlsFromBucket(userId, experimentId, imageFilterFunction);
};

/**
 * Get all file urls from bucket
 * @param {String} userId user id
 * @param {String} experimentId experiment id
 * @param {Function} filterFunction function for filtering the results
 * @return {JSON} JSON object including array of urls
 */
const getFileUrlsFromBucket = async (userId, experimentId, filterFunction) => {
  const bucketPrefix = `${userId}-${experimentId}`;
  const bucketRef = app.storage(storageBuckets.SIE_STIMULI_IMGS).ref();
  const stimuliImagesRef = bucketRef.child(bucketPrefix);

  const itemRefs = await stimuliImagesRef.listAll().then((res) => res.items);
  return await Promise.all(itemRefs.map(async (itemRef) => {
    return await itemRef.getDownloadURL();
  })).then((fileUrls) => {
    if (fileUrls.length === 0) {
      return {
        status: StatusCodes.NO_CONTENT,
        data: fileUrls.filter(filterFunction),
        error: 'No Stimuli image urls available',
      };
    } else {
      return {
        status: StatusCodes.OK,
        data: fileUrls.filter(filterFunction),
        error: null,
      };
    }
  }).catch((error) => {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      error: `Unable to get stimuli image downloadable urls ${error}`,
    };
  });
};

/**
 * Get CI images from bucket storage.
 * @param {String} userId user's id.
 * @param {String} experimentId experiment's id.
 * @return {Object} response including error or data
 */
const getCIImage = async (userId, experimentId) => {
  const bucketPrefix = `${userId}-${experimentId}`;
  const bucketRef = app.storage(storageBuckets.SIE_CI_IMAGES).ref();
  const stimuliImagesRef = bucketRef.child(bucketPrefix);

  const itemRefs = await stimuliImagesRef.listAll().then((res) => res.items);
  return await Promise.all(itemRefs.map(async (itemRef) => {
    return await itemRef.getDownloadURL();
  })).then((fileUrls) => {
    if (fileUrls.length === 0) {
      return {
        status: StatusCodes.NO_CONTENT,
        data: fileUrls,
        error: 'No Stimuli image urls available',
      };
    } else {
      return {
        status: StatusCodes.OK,
        data: fileUrls,
        error: null,
      };
    }
  }).catch((error) => {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      error: `Unable to get stimuli image downloadable urls ${error}`,
    };
  });
};


/**
 * Listen to user document for the signal of CI image completion
 * @param {String} userId userId
 * @param {String} experimentId experimentId
 * @param {Function} imageUrlsHandler react hook function for imageUrls
 * @param {Function} errorHandler react hook function for error.
 */
export const observeCIImageCompletion =
  async (userId, experimentId, imageUrlsHandler, errorHandler) => {
    try {
      firestore.collection(firestoreCollections.USER)
        .doc(userId).onSnapshot(async (doc) => {
          const userDoc = doc.data();
          const CIStatus = userDoc.sie_ci_generation_status;
          if (CIStatus === 'completed') {
            await getCIImage(userId, experimentId)
              .then((results) => {
                const status = results.status;
                if (status === StatusCodes.OK) {
                // successfully get all image urls
                  imageUrlsHandler(results.data);
                } else {
                // one of the image url is unable to fetch
                  errorHandler(results.message);
                }
              });
          } else {
            // “face_missing”, “failed”
            // call setError() for image processing status, display on frontend
            errorHandler(CIStatus);
          }
        });
    } catch (error) {
      errorHandler(CIStatus);
    }
  };
