import firebase from './firebase';

// initiate another app to get ref of another bucket
const topicName = process.env.TOPIC_NAME;
const storageRef = firebase.app()
  .storage(process.env.STORAGE_PROCESSED_IMAGES_BUCKET).ref();

// subscribe to the pub/sub topic for image process status
firebase.functions.pubsub.topic(topicName).onPublish((message) => {
  const { userId, experimentId, resultImages } =
    handelMessage(message, storageRef);
  if (resultImages.length > 0) {
    // store into firestore.
    const documentId = userId + '-' + experimentId;
    firebase.firestore().collection('Images').doc(documentId).set(resultImages);
  }
});

/**
 * listen to the Pub/Sub topic message queue and collect image urls.
 * @param {String} message image process result messages.
 * @param {*} bucketRef processed images bucket in cloud storage.
 * @return {String[]} array of processed image urls.
 */
const handelMessage = (message, bucketRef) => {
  // Decode the PubSub Message body.
  const messageBody = message.data ?
    Buffer.from(message.data, 'base64').toString() : null;
  if (!messageBody) {
    return [];
  }

  const [userId, experimentId, status] = messageBody.split('-');
  const resultImages = [];

  if (status === 'complete') {
    // get all processed images from cloud storage
    const folderPath = userId + '-' + experimentId + '/';
    const processedImagesRef = bucketRef.child(folderPath);

    // store the download url in the database
    processedImagesRef.getFiles((err, images) => {
      if (!err) {
        // files is an array of File objects.
        images.forEach((image) => {
          image.getDownloadURL().then((url) => {
            resultImages.push(url);
          });
        });
      }
    });
  }
  return { userId, experimentId, resultImages };
};
