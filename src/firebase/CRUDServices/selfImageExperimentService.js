import firebase from '../firebase';

export default class SelfImageExperimentService {
  constructor() {
    self.db = firebase.firestore();
  }

    // singleton instance.
    static sieInstance = null;

    /**
     * creating singleton instance.
     * @return {SelfImageExperimentService} instance
     */
    static getInstance = () => {
      if (self.sieInstance == null) {
        self.sieInstance = new SelfImageExperimentService();
      }
      return self.sieInstance;
    }

    /**
     * Create self image experiment in database.
     * @param {String} experimentId id of the new self image experiment.
     * @param {SelfImageExperiment} selfImageExperiment
     * self image experiment object.
     * @return {Boolean} succeed or not.
     */
    postExperiment = async (experimentId, selfImageExperiment) => {
      try {
        await db.collection('Experiments').doc(experimentId)
          .set(selfImageExperiment);
        return true;
      } catch (err) {
        // TODO: add logic here
        return false;
      }
    }

    /**
     * Get all existing self image experiments.
     * @return {SelfImageExperiment[]} array of self image experiment object.
     */
    getExperiments = async () => {
      try {
        const experimentRef = db.collection('SelfImageExperiments');
        const snapshot = await experimentRef.get();
        if (snapshot.empty) {
          return [];
        }
        const experiments = [];
        snapshot.forEach( (doc) => {
          experiments.push(doc);
        });
        return experiments;
      } catch (err) {
        // TODO: add logic here
        return [];
      }
    }


    /**
     * Get self image experiment by specific id.
     * @param {String} experimentId id of self image experiment.
     * @return {SelfImageExperiment} self image experiment object.
     */
    getExperimentById = async (experimentId) => {
      try {
        const experimentRef = db.collection('SelfImageExperiments')
          .doc(experimentId);
        const doc = await experimentRef.get();
        if (!doc.exists) {
          return {};
        } else {
          return doc.data();
        }
      } catch (err) {
        // TODO: add logic here
        return {};
      }
    }

    /**
     * Update specific attributes of self image experiment by id.
     * @param {String} experimentId id of self image experiment.
     * @param {SelfImageExperiment}
     * selfImageExperiment updating attributes and values.
     * @return {Boolean} succeed or not.
     */
    updateExperimentById = async (experimentId, selfImageExperiment) => {
      try {
        const experimentRef = db.collection('SelfImageExperiments')
          .doc(experimentId);
        await experimentRef.update(selfImageExperiment);
        return true;
      } catch (err) {
        // TODO: add logic here
        return false;
      }
    }

    /**
     * Delete self image experiments by id.
     * @param {String} experimentId id of self image experiment.
     * @return {Boolean} succeed or not.
     */
    deleteExperimentById = async (experimentId) => {
      try {
        await db.collection('SelfImageExperiments')
          .doc(experimentId).delete();
        return true;
      } catch (err) {
        // TODO: add logic here
        return false;
      }
    }
}
