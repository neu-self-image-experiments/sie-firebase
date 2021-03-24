import { firestore, app } from '../firebase.js';
import { firestoreCollections, storageBuckets } from '../constants.js';
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
  return await uploadImageToStorage(userId, experimentId,
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
      message: 'image successfully uploaded',
      data: null,
    };
  }).catch((error) => {
    return {
      status: StatusCodes.UNAUTHORIZED,
      message: `user not authenticated ${error.code}`,
      data: null,
    };
  });
};

/**
 * Subscribes to pubsub to signal stimuli generation completion
 * @param {String} userId userId
 * @param {String} experimentId experimentId
 * @param {Function} imageUrlsHandler react hook function for imageUrls
 * @param {Function} errorHandler react hook function for error.
 */
export const observeStimuliCompletion =
 async (userId, experimentId, imageUrlsHandler, errorHandler) => {
   // TODO: refactor for multiple experiments inside user doc
   firestore.collection(firestoreCollections.USER).doc(userId)
     .onSnapshot((doc) => {
       const userDoc = doc.data();
       const stimuliStatus = userDoc.sie_stimuli_generation_status;
       if (stimuliStatus === 'completed') {
         // call getFileUrlsFromBucket once ready to display stimuli
         getFileUrlsFromBucket(userId, experimentId).then((results) => {
           const status = results.status;
           if (status === StatusCodes.NOT_FOUND) {
             // one of the image url is unable to fetch
             errorHandler(results.message);
           } else {
             // successfully get all image urls
             const imageUrls = results.data;
             imageUrlsHandler(imageUrls);
           }
         });
       } else {
         // “face_missing”, “failed”
         // call setError() for image processing status, display on frontend
         errorHandler(status);
       }
     });
 };

/**
 * Get all file urls from bucket to display in img tags
 * @param {String} userId user id
 * @param {String} experimentId experiment id
 * @return {JSON} JSON object including array of processed self image urls
 */
const getFileUrlsFromBucket = async (userId, experimentId) => {
  const bucketPrefix = `${userId}-${experimentId}`;
  const fileUrls = [];
  const bucketRef = app.storage(storageBuckets.SIE_STIMULI_IMGS).ref();
  const stimuliImagesRef = bucketRef.child(bucketPrefix);

  await stimuliImagesRef.getFiles((err, files) => {
    if (!err) {
      files.forEach((file) => {
        file.getDownloadURL().then((url) => {
          fileUrls.push(url);
        }).catch((error) => {
          return {
            status: StatusCodes.NOT_FOUND,
            message: `Unable to fetch image ${file.name}'s url ${error.code}`,
            data: fileUrls,
          };
        });
      });
    }
  });

  return {
    status: StatusCodes.OK,
    message: 'Stimuli image urls fetched',
    data: fileUrls,
  };
};

