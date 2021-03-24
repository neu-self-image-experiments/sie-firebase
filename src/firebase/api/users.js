import { firestore, auth } from '../firebase.js';
import { StatusCodes } from 'http-status-codes';

import { firestoreCollections as collections } from '../constants.js';

// ============ SIGN UP =============
// How to sign up a user:
//  1. call signUp to register user to firebase.auth()
//  2. signup will call generateUserDoc
//     to create a user doc in 'users' collection

/**
 * Create a user auth object and signs user in
 * @param {string} email valid email
 * @param {string} password valid password
 * @param {UserData} userData user data
 * @return {JSON} user auth object or error code
 * Errors:
 *  email-already-in-use
 *  invalid-email
 *  operation-not-allowed
 *  weak-password
 */
export const signUp = async (email, password, userData) => {
  try {
    const userAuth = await auth.createUserWithEmailAndPassword(email, password);
    await generateUserDoc(userAuth.user, userData);
    return {
      status: StatusCodes.CREATED,
      data: userAuth,
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
 * Reset a user password
 * @param {string} newPassword valid password
 * @return {JSON} user auth object or error code
 * Errors:
 *  not logged in
 *  no such user
 *  operation-not-allowed
 *  weak-password
 */
export const resetUserPassword = async (newPassword) => {
  const userAuth = await getCurrentUser();
  if (!userAuth) {
    throw new Error('userAuth not available.');
  }
  try {
    await userAuth.currentUser.updatePassword(newPassword);
    return {
      status: StatusCodes.OK,
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      status: StatusCodes.NOT_MODIFIED,
      data: null,
      error,
    };
  }
};

/**
 * Create a user object in 'users' collection
 * @param {UserAuth} userAuth userAuth object returned by firebase.auth
 * @param {UserData} userData user data
 * @return {User} user object if userAuth is valid else null
 */
export const generateUserDoc = async (userAuth, userData) => {
  if (!userAuth) {
    throw new Error('userAuth not available.');
  }
  const userRef = firestore.doc(`${collections.USER}/${userAuth.uid}`);

  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    // if user doesn't already exists
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...userData,
      });
    } catch (error) {
      throw new Error(error.errorCode);
    }
  }

  return await getUser(userAuth.uid);
};

// ============ SIGN UP =============

/**
 * Get user by their uid
 * @param {string} uid user's id unique to Firebase project
 * @return {User} user document
 */
export const getUser = async (uid) => {
  if (!uid) {
    return null;
  }

  try {
    const userDoc = firestore.doc(`${collections.USER}/${uid}`);
    const user = await userDoc.get();
    return {
      status: StatusCodes.OK,
      data: {
        uid,
        ...user.data(),
      },
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
 * Check if user is authenticated
 * @return {UserAuth} user auth object if current user is signed in else null
 */
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

/**
 * Update user data for signed in users
 * @param {JSON} updatedData data to be updated
 * @return {JSON} HTTP status code
 */
export const updateUserData = async (updatedData) => {
  // auth.currentUser is null if user is not signed in
  const userUid = auth.currentUser.uid;

  const userRef = firestore.doc(`${collections.USER}/${userUid}`);
  try {
    await userRef.set({
      ...updatedData,
    });

    return {
      status: StatusCodes.OK,
      data: null,
      error: null,
    };
  } catch (error) {
    return {
      status: StatusCodes.NOT_MODIFIED,
      data: null,
      error,
    };
  }
};

/**
 * Signs out user
 */
export const logout = async () => {
  try {
    await auth.signOut();
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
