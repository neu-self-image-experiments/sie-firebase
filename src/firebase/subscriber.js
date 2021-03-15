import firebase from './firebase';

const subscribe = () => {
  // get ref to custom storage bucket
  const topicName = process.env.TOPIC_NAME;
  const storageRef = firebase.app()
    .storage(process.env.STORAGE_PROCESSED_IMAGES_BUCKET).ref();

  // subscribe to the pub/sub topic for image process status
  firebase.functions.pubsub.topic(topicName).onPublish((message) => {
    const { participantId, experimentId, resultImages } =
      handleMessage(message, storageRef);
    if (resultImages.length > 0) {
      // store into firestore.
      const documentId = `${participantId}-${experimentId}`;
      firebase.firestore().collection('ProcessedImages')
        .doc(documentId).set(resultImages);
    }
  });
};

/**
 * listen to the Pub/Sub topic message queue and collect image urls.
 * @param {String} message image process result messages.
 * @param {*} bucketRef processed images bucket in cloud storage.
 * @return {String[]} array of processed image urls.
 */
const handleMessage = (message, bucketRef) => {
  // Decode the PubSub Message body.
  const messageBody = message.data ?
    Buffer.from(message.data, 'base64').toString() : null;
  if (!messageBody) {
    return [];
  }

  const [participantId, experimentId, status] = messageBody.split('-');
  const resImageURLs = [];

  if (status === 'complete') {
    // get all processed images from cloud storage
    const folderPath = `${participantId}-${experimentId}/`;
    const processedImagesRef = bucketRef.child(folderPath);

    // store the download url in the database
    processedImagesRef.getFiles((err, images) => {
      if (!err) {
        // files is an array of File objects.
        images.forEach((image) => {
          image.getDownloadURL().then((url) => {
            resImageURLs.push(url);
          });
        });
      }
    });
  }
  return { participantId, experimentId, resImageURLs };
};

export default subscribe;
