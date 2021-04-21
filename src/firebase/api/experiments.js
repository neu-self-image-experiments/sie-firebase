import { firestore } from '../firebase';
import { StatusCodes } from 'http-status-codes';

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
    return {
      status: StatusCodes.CREATED,
      data: newDocRef.id,
      error: null,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      error,
    };
  }
};

/**
 * Get all experiments
 * @return {Experiment[]} a list of filtered Experiment object
 */
export const getAllExperiments = async () => {
  try {
    const collectionRef = firestore.collection(`${collections.EXPERIMENT}`);
    const snapshot = await collectionRef.get();
    const res = [];
    if (!snapshot.empty) {
      snapshot.forEach((doc) => {
        res.push({ ...doc.data(), experimentId: doc.id });
      });
    }

    return {
      status: StatusCodes.OK,
      data: res,
      error: null,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      error,
    };
  }
};

/**
 * Get experiment by id
 * @param {string} experimentId experiment's doc id
 * @return {Experiment} experiment document
 */
export const getExperimentById = async (experimentId) => {
  try {
    const expRef = firestore
      .collection(`${collections.EXPERIMENT}`)
      .doc(experimentId);
    const snapshot = await expRef.get();

    return {
      status: snapshot.exists ? StatusCodes.OK : StatusCodes.NOT_FOUND,
      data: snapshot.exists ? snapshot.data() : null,
      error: null,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      error,
    };
  }
};

/**
 * Update an experiment given its id
 * @param {string} experimentId experiment's doc id
 * @param {Experiment} updatedData updated data
 */
export const updateExperiment = async (experimentId, updatedData) => {
  try {
    const expRef = firestore
      .collection(`${collections.EXPERIMENT}`)
      .doc(experimentId);
    const snapshot = await expRef.get();
    if (snapshot.exists) {
      expRef.update(...updatedData);
    }

    return {
      status: snapshot.exists ? StatusCodes.OK : StatusCodes.NOT_FOUND,
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      error,
    };
  }
};

/**
 * Delete an experiment given its doc id
 * @param {string} experimentId experiment's doc id
 */
export const deleteExperiment = async (experimentId) => {
  try {
    firestore
      .collection(`${collections.EXPERIMENT}`)
      .doc(experimentId)
      .delete();

    // NOTE: this does NOT delete this doc' subcollections
    return {
      status: StatusCodes.OK,
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      error,
    };
  }
};

/**
 * Store experiment data into specific experiment document of the user.
 * @param {String} userId user id
 * @param {String} experimentId experiment id
 * @param {JSON} resultData json object such as {'jsPsych': data}
 * @return {JSON} response
 */
export const storeExperimentResult = async (userId, experimentId,
  resultData) => {
  // locate the specific experiment id of the user
  const userRef = firestore
    .collection(collections.USER)
    .doc(userId);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    return {
      status: StatusCodes.NOT_FOUND,
      data: null,
      error: `user ${userId} is not found`,
    };
  }

  const expRef = userRef.collection(collections.EXPERIMENT)
    .doc(experimentId);
  // update the experiment document under user's experiments collection
  // will create if not exists

  expRef.set(resultData,
    { merge: true })
    .then(() => {
      return {
        status: StatusCodes.OK,
        data: null,
        error: null,
      };
    }).catch((error) => {
      return {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: null,
        error,
      };
    });
};
