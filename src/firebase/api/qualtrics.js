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
    await firestore.collection(`${collections.USER}`)
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
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
    };
  };
};

/**
 * Fetch the result of pre-survey.
 * @param {String} uid participant's id
 * @param {String} experimentId experiemtn id of the consent form
 * @return {Object} response including error or data
 */
export const getPreSurvey = async (uid, experimentId) => {
  try {
    const collectionRef = firestore.collection(`${collections.USER}`)
      .doc(uid).collection(`${collections.EXPERIMENT}`).doc(experimentId);
    const snapshot = await collectionRef.get();
    const exists = snapshot.exists;
    let preSurvey = null;
    if (exists && snapshot.data().age) {
      const res = snapshot.data();
      preSurvey = {
        age: res.age,
        gender: res.gender,
        genderImportance: res.genderImportance,
        ethnic: res.ethnic,
        selfEsteem: res.selfEsteem,
      };
    }
    return {
      status: exists ? StatusCodes.OK : StatusCodes.NOT_FOUND,
      message: exists ? message.OK : message.NOT_FOUND,
      data: preSurvey,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
    };
  };
};

/**
 * Fetch the result of post-survey
 * @param {String} uid participant's id
 * @param {String} experimentId experiemtn id of the consent form
 * @return {Object} response including error or data
 */
export const getPostSurvey = async (uid, experimentId) => {
  try {
    const collectionRef = firestore.collection(`${collections.USER}`)
      .doc(uid).collection(`${collections.EXPERIMENT}`).doc(experimentId);
    const snapshot = await collectionRef.get();
    const exists = snapshot.exists;
    let postSurvey = null;
    if (exists && snapshot.data().capable) {
      const res = snapshot.data();
      postSurvey = {
        capable: res.capable,
        selfConfident: res.selfConfident,
        competent: res.competent,
        friendly: res.friendly,
        likeable: res.likeable,
        warm: res.warm,
        ambitious: res.ambitious,
        assertive: res.assertive,
        efficient: res.efficient,
      };
    }
    return {
      status: exists ? StatusCodes.OK : StatusCodes.NOT_FOUND,
      message: exists ? message.OK : message.NOT_FOUND,
      data: postSurvey,
    };
  } catch (error) {
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
      data: null,
    };
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
