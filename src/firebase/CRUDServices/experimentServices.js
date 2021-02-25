import firebase from '../firebase';

export default class ExperimentServices {
    constructor() {
        self.db = firebase.firestore();
    }

    // singleton instance.
    static sieInstance = null;

    /**
     * creating singleton instance.
     * @return {ExperimentServices} instance
     */
    static getInstance = () => {
        if (self.sieInstance == null) {
            self.sieInstance = new ExperimentServices();
        }
        return self.sieInstance;
    }

    /**
     * Create experiment in database.
     * @param {String} experimentId id of the new experiment.
     * @param {Experiment} experiment experiment object.
     * @return {Boolean} succeed or not.
     */
    postExperiment = async (experimentId, experiment) => {
        try {
            await db.collection('Experiments').doc(experimentId)
                .set(experiment);
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Get all exsisting experiments.
     * @return {Experiment[]} array of experiment object.
     */
    getExperiments = async () => {
        try {
            const experimentRef = db.collection('Experiments');
            const snapshot = await experimentRef.get();
            const res = [];
            if (snapshot.empty) {
                return res;
            }

            snapshot.forEach( (doc) => {
                res.push(doc.data());
            });
            return res;
        } catch (err) {
            return [];
        }
    }


    /**
     * Get experiment by specific id.
     * @param {String} experimentId id of experiment.
     * @return {Experiment} experiment object.
     */
    getExperimentById = async (experimentId) => {
        try {
            const experimentRef = db.collection('Experiments')
                .doc(experimentId);
            const doc = await experimentRef.get();
            if (!doc.exists) {
                return doc.data();
            } else {
            }
        } catch (err) {
        }
    }

    /**
     * Update specific attributs of experiment by id.
     * @param {String} experimentId id of experiment.
     * @param {Experiment} experiment updating attributes and values.
     * @return {Boolean} succeed or not.
     */
    updateExperimentById = async (experimentId, experiment) => {
        try {
            const experimentRef = db.collection('Experiments')
                .doc(experimentId);
            await experimentRef.update(experiment);
            return true;
        } catch (err) {
            return false;
        }
    }

    /**
     * Delete experiments by id.
     * @param {String} experimentId id of experiment.
     * @return {Boolean} succeed or not.
     */
    deleteExperimentById = async (experimentId) => {
        try {
            await db.collection('Experiments')
                .doc(experimentId).delete();
            return true;
        } catch (err) {
            return false;
        }
    }
}
