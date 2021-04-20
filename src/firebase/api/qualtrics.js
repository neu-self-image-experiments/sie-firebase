import { firestore } from '../firebase.js';
import { StatusCodes } from 'http-status-codes';
import {
  firestoreCollections as collections, message,
} from '../constants.js';

/**
 * Fetch the result of consent form
 * @param {String} uid participant's id
 * @param {String} experimentId experiemtn id of the consent form
 * @param {Function} consentHandler callback when consent result is present
 * @return {Object} response including error or data
 */
export const getConsentResult = async (uid, experimentId, consentHandler) => {
  try {
    const unsubscribe = firestore.collection(`${collections.USER}`)
      .doc(uid).collection(`${collections.EXPERIMENT}`).doc(experimentId)
      .onSnapshot( (doc) => {
        const data = doc.data();
        if (data && data.response) {
          const consentData = {
            response: data.response,
            lastname: data.lastname,
            firstname: data.firstname,
          };
          const res = {
            status: StatusCodes.OK,
            message: message.OK,
            data: consentData,
          };
          consentHandler(res);
          unsubscribe();
        } else {
          const res = {
            status: StatusCodes.NOT_FOUND,
            message: message.NOT_FOUND,
            data: null,
          };
          consentHandler(res);
        }
      });
  } catch (error) {
    const res = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
    };
    consentHandler(res);
  };
};

/**
 * Fetch the result of pre-survey.
 * @param {String} uid participant's id
 * @param {String} experimentId experiemtn id of the consent form
 * @param {Function} surveyHandler callback when pre-survey result is present
 * @return {Object} response including error or data
 */
export const getPreSurvey = async (uid, experimentId, surveyHandler) => {
  try {
    await firestore.collection(`${collections.USER}`)
      .doc(uid).collection(`${collections.EXPERIMENT}`).doc(experimentId)
      .onSnapshot( (doc) => {
        const data = doc.data();
        if (data) {
          const res = {
            status: StatusCodes.OK,
            message: message.OK,
          };
          surveyHandler(res);
        } else {
          const res = {
            status: StatusCodes.NOT_FOUND,
            message: message.NOT_FOUND,
          };
          surveyHandler(res);
        }
      });
  } catch (error) {
    const res = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
    surveyHandler(res);
  };
};

/**
 * Fetch the result of post-survey
 * @param {String} uid participant's id
 * @param {String} experimentId experiemtn id of the consent form
 * @param {Function} surveyHandler callback when post-survey result is present
 * @return {Object} response including error or data
 */
export const getPostSurvey = async (uid, experimentId, surveyHandler) => {
  try {
    await firestore.collection(`${collections.USER}`)
      .doc(uid).collection(`${collections.EXPERIMENT}`).doc(experimentId)
      .onSnapshot( (doc) => {
        const data = doc.data();
        if (data) {
          const res = {
            status: StatusCodes.OK,
            message: message.OK,
          };
          surveyHandler(res);
        } else {
          const res = {
            status: StatusCodes.NOT_FOUND,
            message: message.NOT_FOUND,
          };
          surveyHandler(res);
        }
      });
  } catch (error) {
    const res = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
    surveyHandler(res);
  };
};

/**
 * Fetch all the data of a specific experiment for a user
 * @param {String} uid participant's id
 * @param {String} experimentId experiemtn id of the consent form
 * @return {Object} response including error or data
 */
export const getAllDataForUserOfExperiment = async (uid, experimentId) => {
  try {
    const collectionRef = firestore.collection(`${collections.USER}`)
      .doc(uid).collection(`${collections.EXPERIMENT}`).doc(experimentId);
    const snapshot = await collectionRef.get();
    const exists = snapshot.exists;
    return {
      status: exists ? StatusCodes.OK : StatusCodes.NOT_FOUND,
      message: exists ? message.OK : message.NOT_FOUND,
      data: snapshot.data(),
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
    };
  }
};
