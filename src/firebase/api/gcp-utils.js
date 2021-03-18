import { storage, pubsub as gcpPubsub } from '../firebase.js';
import { pubsub } from '../constants.js';

/**
 * Upload an image to the specified bucket
 * @param {string} userId userId
 * @param {string} experimentId experimentId
 * @param {Blob} image image file to be uploaded
 * @param {string} bucket destination bucket
 *
 * @return {JSON}
 */
export const uploadImageToStorage = async (
  userId, experimentId, image, bucket) => {
  const imagePath = `${userId}-${experimentId}/${image.name}`;

  const storageRef = storage.ref();
  const rawImageBucketRef = storageRef.child(bucket);
  const newImageRef = rawImageBucketRef.child(imagePath);
  return newImageRef.put(image).then((snapshot) => {
    return {
      status: '201',
      error: null,
    };
  }).catch((error) => {
    return {
      status: '500',
      data: null,
      error,
    };
  });
};


/**
 * Subscribes to pubsub to signal stimuli generation completion
 */
export const observeStimuliCompletion = async () => {
  gcpPubsub.topic(pubsub.SIE_RESULT).onPublish((msg) => {
    // Decode the PubSub Message body.
    const msgBody = msg.data ?
      Buffer.from(message.data, 'base64').toString() : null;
    // eslint-disable-next-line no-unused-vars
    const participantId = msg.attributes.participant_id;
    // eslint-disable-next-line no-unused-vars
    const experimentId = msg.attributes.experiment_id;

    if (msgBody === 'completed') {
      // maybe this should be handled by a react hook?
      // call getFileUrlsFromBucket once ready to display stimuli
    } else {
      // likewise: maybe should be handled by a setError hook
    }
  });
};

/**
 * Get all file urls from bucket to display in img tags
 * @param {string} bucket storage bucket
 * @param {string} bucketPrefix prefix to destination storage directory
 */
export const getFileUrlsFromBucket = async (bucket, bucketPrefix) => {
  const fileUrls = [];
  const bucketRef = storage.ref().child(bucket).child(bucketPrefix);
  bucketRef.getFiles((err, files) => {
    if (!err) {
      files.forEach((file) => {
        file.getDownloadURL().then((url) => {
          fileUrls.push(url);
        }).catch((error) => {
          // TODO(qhoang) error handling
        });
      });
    }
  });

  return fileUrls;
};

