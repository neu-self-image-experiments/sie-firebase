import firestore from '../firebase.js';
import auth from '../firebase.js';

// ============ SIGN UP =============
// How to sign up a user:
//  1. call signUp to register user to firebase.auth()
//  2. call generateUserDoc to create a user doc in 'users' collection

/**
 * Create a user auth object and signs user in
 * @param {string} email valid email
 * @param {string} password valid password
 * @return {UserAuth} user auth object or error code
 * Errors:
 *  email-already-in-use
 *  invalid-email
 *  operation-not-allowed
 *  weak-password
 */
export const signUp = async (email, password) => {
  try {
    return await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    // TODO(qhoang) revisit this
    return error.code;
  }
};

/**
 * Create a user object in 'users' collection
 * @param {UserAuth} userAuth userAuth object returned by firebase.auth
 * @param {UserData} userData user data
 * @return {User} user object
 */
export const generateUserDoc = async (userAuth, userData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();
  if (!snapshot.exists) { // if user doesn't already exists
    const { email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        email,
        createdAt,
        ...userData,
      });
    } catch (error) {
      // TODO(qhoang) add error handling
    }
  }

  return getUser(userAuth.uid);
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
    const userDoc = await firestore.doc(`users/${uid}`);
    return {
      uid,
      ...userDoc.data(),
    };
  } catch (error) {
    // TODO(qhoang) add error handling
  }
};

/**
 * Check if user is authenticated
 * @return {UserAuth} user auth object if current user is signed in else null
 */
export const getCurrentUser = () => {
  // resolve: callback function if resolved
  // reject: callback function if rejected
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

/**
 * Update user data for signed in users
 * @param {*} updatedData data to be updated
 */
export const updateUserData = async (updatedData) => {
  // auth.currentUser is null if user is not signed in
  const userUid = auth.currentUser.uid;

  const userRef = firestore.doc(`users/${userUid}`);
  try {
    await userRef.set({
      ...updatedData,
    });
  } catch (error) {
    // TODO(qhoang) add error handling
  }
};

// TODO(qhoang) implement password reset feature
// TODO(qhoang) re-implement method to delete a user
