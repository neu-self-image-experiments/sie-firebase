import firebase from '../firebase';

export default class AccountExperimentServices {
  constructor() {
    self.db = firebase.firestore();
    self.account_experiments = 'Account_Experiments';
  }

    // singleton instance.
    static accountExperimentServiceInstance = null;

    /**
     * creating singleton instance.
     * @return {AccountExperimentServices} instance
     */
    static getInstance = () => {
      if (!self.accountExperimentServiceInstance) {
        self.accountExperimentServiceInstance = new AccountExperimentServices();
      }
      return self.accountExperimentServiceInstance;
    }

    /**
     * Create account_experiment in database.
     * @param {String} experimentId id of the new experiment.
     * @param {String} accountId of the account.
     * @param {String} progress of the account_experiment.
     * @param {Boolean} ifConsent of the account_experiment.
     * @return {Boolean} succeed or not.
     */
    postAccountExperiment = async (experimentId, accountId,
      progress, ifConsent) => {
      try {
        await db.collection(self.account_experiments).add({
          experimentId,
          accountId,
          progress,
          ifConsent,
        });
        return true;
      } catch (err) {
        return false;
      }
    }

    /**
     * Get all existing account_experiments.
     * @return {[]} array of account_experiment object.
     */
    getAccountExperiments = async () => {
      try {
        const accountExperimentRef = db.collection(self.account_experiments);
        const snapshot = await accountExperimentRef.get();
        const res = [];
        if (snapshot.empty) {
          // TODO: add logic here
          return [];
        }

        snapshot.forEach((doc) => {
          res.push(doc.data());
        });
        return res;
      } catch (err) {
        // TODO: add logic here
      }
    }


    /**
     * Get account_experiment by specific id.
     * @param {String} experimentId id of experiment.
     * @param {String} accountId id of user.
     * @return {{account_experiment}} account_experiment object.
     */
    getAccountExperimentById = async (experimentId, accountId) => {
      try {
        const experimentRef = db.collection(self.account_experiments);

        const doc = await experimentRef
          .where('experimentId', '==', experimentId)
          .where('accountId', '==', accountId).get();
        if (!doc.exists) {
          // TODO: add logic here
          return {};
        } else {
          return doc.data();
        }
      } catch (err) {
        // TODO: add logic here
      }
    }

    /**
     * Update specific attributes of account_experiment by id.
     * @param {String} experimentId id of experiment.
     * @param {String} accountId of user.
     * @param {String} progress of the account_experiment.
     * @param {Boolean} ifConsent of the account_experiment.
     * @return {Boolean} succeed or not.
     */
    updateAccountExperimentById = async (experimentId, accountId,
      progress, ifConsent) => {
      try {
        await db.runTransaction(async (t) => {
          const experimentRef = db.collection(self.account_experiments);

          const docRef = await experimentRef
            .where('experimentId', '==', experimentId)
            .where('accountId', '==', accountId);

          const updatedAccountExperimentDoc = (await docRef.get()).data();
          updatedAccountExperimentDoc.progress = progress;
          updatedAccountExperimentDoc.ifConsent = ifConsent;

          t.update(docRef, updatedAccountExperimentDoc);
        });
        return true;
      } catch (err) {
        // TODO: add logic here
        return false;
      }
    }

    /**
     * Delete account_experiment.
     * @param {String} experimentId id of experiment.
     * @param {String} accountId of user.
     * @return {Boolean} succeed or not.
     */
    deleteAccountExperimentById = async (experimentId, accountId) => {
      try {
        const experimentRef = db.collection(self.account_experiments);
        const docRef = await experimentRef
          .where('experimentId', '==', experimentId)
          .where('accountId', '==', accountId).get();

        await docRef.ref.delete();
        return true;
      } catch (err) {
        // TODO: add logic here
        return false;
      }
    }
}
