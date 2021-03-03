import firebase from '../firebase';
const { PubSub } = require('@google-cloud/pubsub');

export default class ImageService {
  constructor() {
    self.storageRef = firebase.storage().ref();
    self.sieRawImagesBucketRef = storageRef.child('sie-raw-images');
    self.sieProcessedImagesBucketRef = storageRef.child('sie-processed-images');
    self.subscriptionName =
  'projects/cs6510-spr2021/subscriptions/sie-image-processing-result-test-sub';
  }

    // singleton instance.
    static sieInstance = null;

    /**
     * creating singleton instance.
     * @return {ImageService} instance
     */
    static getInstance = () => {
      if (self.sieInstance == null) {
        self.sieInstance = new ImageService();
      }
      return self.sieInstance;
    }

    /**
     * Put a self image into the cloud storage.
     * @param {String} userName user name.
     * @param {String} experimentId experiment id.
     * @param {File} image self image file.
     * @return {Boolean} succeed or not.
     */
    postImage = async (userName, experimentId, image) => {
      const folderPath = userName + '-' + experimentId + '/';
      const imagePath = folderPath + image.name;
      const rawImageRef = self.sieRawImagesBucketRef.child(imagePath);
      rawImageRef.put(image).then(() => {
        return true;
      }).catch((error) => {
        return false;
      });
    }

    /**
     * Get all existing self images in the messaging queue.
     * @param {String} userName user name.
     * @param {String} experimentId experiment id.
     * @return {Image[]} array of self image files.
     */
    getImages = async (userName, experimentId) => {
      // Creates a client; cache this for further use
      pubSubClient = new PubSub();
      // References an existing subscription
      const subscription = pubSubClient.subscription(self.subscriptionName);

      // Create an event handler to handle messages
      const messageArray = [];
      const messageHandler = (message) => {
        messageArray.push(message.data);
        // "Ack" (acknowledge receipt of) the message
        message.ack();
      };

      // Listen for new messages until timeout is hit
      subscription.on('message', messageHandler);

      setTimeout(() => {
        subscription.removeListener('message', messageHandler);
      }, timeout * 1000);

      // loop through the messages to locate those processed images
      // message format: [userName]-[experimentId]-[status]
      for (let index = 0; index < messageArray.length; index++) {
        const message = messageArray[index];
        const [msgUserName, msgExperimentId, status] = message.split('-');

        if (msgUserName == userName && msgExperimentId == experimentId) {
          if (status == 'complete') {
            const folderPath = userName + '-' + experimentId + '/';
            const processedImagesRef =
            self.sieProcessedImagesBucketRef.child(folderPath);
            // TODO: download directly in the browser for all processed images
            processedImagesRef.getDownloadURL().then((url) => {
              const xhr = new XMLHttpRequest();
              xhr.responseType = 'blob';
              // xhr.onload = (event) => {
              //   const blob = xhr.response;
              // };
              xhr.open('GET', url);
              xhr.send();
            });
            // exist the loop if found the message
            break;
          }
        }
      }
    }


    /**
     * Delete self image by userName-experimentId in cloud storage.
     * @param {String} userName user name.
     * @param {String} experimentId experiment id.
     * @return {Boolean} succeed or not.
     */
    deleteImage = async (userName, experimentId) => {
      const folderPath = userName + '-' + experimentId + '/';
      const imagePath = folderPath + image.name;
      const rawImageRef = self.sieRawImagesBucketRef.child(imagePath);
      rawImageRef.delete().then(() => {
        return true;
      }).catch((error) => {
        return false;
      });
    }
}
