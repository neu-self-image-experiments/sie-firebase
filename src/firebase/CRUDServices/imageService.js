import firebase from '../firebase';

export default class ImageService {
  constructor() {
    self.storageRef = firebase.storage().ref();
    self.sieRawImagesBucketRef = storageRef.child('sie-raw-images');
    self.sieProcessedImagesBucketRef = storageRef.child('sie-stimuli-images');
    self.topicName =
    'projects/cs6510-spr2021/topics/sie-image-processing-result-test';
  }

    // singleton instance.
    static sieInstance = null;

    /**
     * creating singleton instance.
     * @return {ImageService} instance
     */
    static getInstance = () => {
      if (!self.sieInstance) {
        self.sieInstance = new ImageService();
      }
      return self.sieInstance;
    }

    /**
     * Put a self image into the cloud storage.
     * @param {String} userId user id.
     * @param {String} experimentId experiment id.
     * @param {File} image self image file.
     * @return {Boolean} succeed or not.
     */
    postRawImage = async (userId, experimentId, image) => {
      // const folderPath = userId + '-' + experimentId + '/';
      // const imagePath = folderPath + image.name;
      const rawImageRef = self.storageRef.child(image.name);
      rawImageRef.put(image).then(() => {
        return true;
      }).catch((error) => {
        return false;
      });
    }

    /**
     * Get all existing self images in the messaging queue.
     * @param {String} userId user id.
     * @param {String} experimentId experiment id.
     * @return {File[]} array of self image files.
     */
    getImages = async (userId, experimentId) => {
      const resultImages = [];

      firebase.functions.pubsub.topic(self.topicName).onPublish((message) => {
        // Decode the PubSub Message body.
        const messageBody = message.data ?
          Buffer.from(message.data, 'base64').toString() : null;

        if (!messageBody) {
          return [];
        }

        const [msgUserId, msgExperimentId, status] = messageBody.split('-');
        if (msgUserId === userId && msgExperimentId === experimentId) {
          if (status === 'complete') {
            // get all processed images from cloud storage
            const folderPath = userId + '-' + experimentId + '/';
            const processedImagesRef =
            self.sieProcessedImagesBucketRef.child(folderPath);

            processedImagesRef.getFiles((err, images) => {
              if (!err) {
                // files is an array of File objects.
                images.forEach((image) => {
                  image.getDownloadURL().then((url) => {
                    const xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = (event) => {
                      const blob = xhr.response;
                      // xhr.response will be a Blob ready to save
                      resultImages.push(blob);
                    };
                    xhr.open('GET', url);
                    xhr.send();
                  });
                });
              }
            });
          }
        }
      });

      return resultImages;
    }

    /**
     * Delete self image by userId-experimentId in cloud storage.
     * @param {String} userId user id.
     * @param {String} experimentId experiment id.
     * @return {Boolean} succeed or not.
     */
    deleteImage = async (userId, experimentId) => {
      const folderPath = userId + '-' + experimentId + '/';
      const imagePath = folderPath + image.name;
      const rawImageRef = self.sieRawImagesBucketRef.child(imagePath);
      rawImageRef.delete().then(() => {
        return true;
      }).catch((error) => {
        return false;
      });
    }
}
