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

