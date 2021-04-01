import { firestore } from '../firebase.js';
import { StatusCodes } from 'http-status-codes';
import {
  firestoreCollections as collections, message,
} from '../constants.js';

/**
 * Fetch the result of consent form
 * @param {String} uid participant's id
 * @param {String} experimentId experiemtn id of the consent form
 * @return {Object} response including error or data
 */
export const getConsentResult = async (uid, experimentId) => {
  try {
    const collectionRef = firestore.collection(`${collections.USER}`)
      .doc(uid).collection(`${collections.EXPERIMENT}`).doc(experimentId);
    const snapshot = await collectionRef.get();
    const exists = snapshot.exists;
    return {
      status: exists ? StatusCodes.OK : StatusCodes.NOT_FOUND,
      message: exists ? message.OK : message.NOT_FOUND,
      data: exists ? snapshot.data() : null,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
    };
  };
};
