import firestore from '../firebase.js';

import {
  firestoreCollections as collections,
} from '../constants.js';

/**
 * Create a new experiment document
 * @param {Experiment} experimentData experiment data
 * @return {string} document id of the newly created experiment
 */
export const createExperiment = async (experimentData) => {
  const collectionRef = firestore.collection(`${collections.EXPERIMENT}`);
  const newDocRef = collectionRef.doc();
  try {
    newDocRef.set(experimentData);
    return newDocRef.id;
  } catch (error) {
    return null;
  }
};

/**
 * Get all experiments
 * @return {Experiment[]} a list of filtered Experiment object
 */
export const getAllExperiments = async () => {
  const collectionRef = firestore.collection(`${collections.EXPERIMENT}`);
  const snapshot = await collectionRef.get();
  const res = [];
  if (!snapshot.empty) {
    snapshot.forEach((doc) => {
      // TODO(qhoang) let's not send back all information but
      // only those necessary for frontend
      res.push(doc.data());
    });
  }

  return res;
};

/**
 * Get experiment by id
 * @param {string} experimentId experiment's doc id
 * @return {Experiment} experiment document
 */
export const getExperimentById = async (experimentId) => {
  const expRef = firestore
    .collection(`${EXPERIMENT_COLLECTION}`)
    .doc(experimentId);
  const snapshot = await expRef.get();

  return snapshot.exists ? snapshot.data() : null;
};

/**
 * Update an experiment given its id
 * @param {string} experimentId experiment's doc id
 * @param {Experiment} updatedData updated data
 */
export const updateExperiment = async (experimentId, updatedData) => {
  const expRef = firestore
    .collection(`${collections.EXPERIMENT}`)
    .doc(experimentId);
  const snapshot = await expRef.get();
  if (snapshot.exists) {
    try {
      expRef.update(...updatedData);
    } catch (error) {
      // TODO(qhoang) error handling
    }
  }
};

/**
 * Delete an experiment given its doc id
 * @param {string} experimentId experiment's doc id
 */
export const deleteExperiment = async (experimentId) => {
  const expRef = firestore
    .collection(`${collections.EXPERIMENT}`)
    .doc(experimentId);
  const snapshot = await expRef.get();
  if (snapshot.exists) {
    try {
      expRef.delete();
    } catch (error) {
      // TODO(qhoang) error handling
    }
  }
};
