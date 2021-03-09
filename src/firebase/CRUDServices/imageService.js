import firebase from '../firebase';
import 'firebase/storage';

export default class ImageService {
  constructor() {
    self.db = firebase.firestore();
    self.images = 'ProcessedImages';
    self.storageRef = firebase.app()
      .storage(process.env.STORAGE_RAW_IMAGES_BUCKET).ref();
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
     * @param {String} participantId user id.
     * @param {String} experimentId experiment id.
     * @param {File} image self image file.
     * @return {String} succeed or not.
     */
    postRawImage = async (participantId, experimentId, image) => {
      const folderPath = `${participantId}-${experimentId}/`;
      const imagePath = folderPath + image.name;
      const rawImageRef = self.storageRef.child(imagePath);
      return await rawImageRef.put(image).then(() => {
        return 'uploaded';
      }).catch((error) => {
        return 'error';
      });
    }

    /**
     * Get all processed self images urls.
     * @param {String} participantId user id.
     * @param {String} experimentId experiment id.
     * @return {String[]} array of processed self image urls.
     */
    getProcessedImages = async (participantId, experimentId) => {
      const documentId = `${participantId}-${experimentId}`;
      try {
        const imageRef = db.collection(self.images)
          .doc(documentId);
        const doc = await imageRef.get();
        if (!doc.exists) {
          return [];
        } else {
          return doc.data();
        }
      } catch (err) {
        return [];
      }
    }

    /**
     * Delete self image by participantId-experimentId in cloud storage.
     * @param {String} participantId user id.
     * @param {String} experimentId experiment id.
     * @return {Boolean} succeed or not.
     */
    deleteRawImage = async (participantId, experimentId) => {
      const folderPath = `${participantId}-${experimentId}/`;
      const imagePath = folderPath + image.name;
      const rawImageRef = self.sieRawImagesBucketRef.child(imagePath);
      rawImageRef.delete().then(() => {
        return true;
      }).catch((error) => {
        return false;
      });
    }
}
