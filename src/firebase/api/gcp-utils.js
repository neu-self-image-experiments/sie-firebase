import { app, pubsub as gcpPubsub } from '../firebase.js';
import { pubsub, storageBuckets } from '../constants.js';

/**
 * Upload an image to the specified bucket
 * @param {string} userId userId
 * @param {string} experimentId experimentId
 * @param {Blob} image image file to be uploaded
 *
 * @return {JSON}
 */
export const uploadImageToStorage = async (
  userId, experimentId, image) => {
  const imagePath = `${userId}-${experimentId}/${image.name}`;

  const rawImageBucketRef = app.storage(storageBuckets.SIE_RAW_IMGS).ref();
  const newImageRef = rawImageBucketRef.child(imagePath);
  return await newImageRef.put(image).then(() => {
    return {
      status: 201,
      message: 'image successfully uploaded',
      data: {},
    };
  }).catch((err) => {
    return {
      status: 401,
      message: `not authenticated ${err}`,
      data: {},
    };
  });
};


/**
 * Subscribes to pubsub to signal stimuli generation completion
 * @param {Function} imageUrlsHandler react hook function for imageUrls
 * @param {Function} errorHandler react hook function for error.
 */
export const observeStimuliCompletion =
  async (imageUrlsHandler, errorHandler) => {
    gcpPubsub.topic(pubsub.SIE_RESULT).onPublish((msg) => {
      // Decode the PubSub Message body.
      const status = msg.data ?
        Buffer.from(message.data, 'base64').toString() : null;
      const userId = msg.attributes.participant_id;
      const experimentId = msg.attributes.experiment_id;

      if (status === 'Completed') {
        // call getFileUrlsFromBucket once ready to display stimuli
        getFileUrlsFromBucket(userId, experimentId).then(() => {
          imageUrlsHandler(imageUrls);
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
 * @return {String[]} array of processed self image urls
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
        }).catch(() => {
          return [];
        });
      });
    }
  });

  return fileUrls;
};

