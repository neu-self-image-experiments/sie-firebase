import { firestore, auth } from '../firebase';
import { StatusCodes } from 'http-status-codes';
import { firestoreCollections as collections } from '../constants';

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
    auth.onAuthStateChanged((user)=>{
      user.sendEmailVerification();
    });
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
 * Sign in user.
 * @param {string} email user email
 * @param {string} password user password
 * @return {JSON} user auth object or error code
 */
export const signIn = async (email, password) => {
  try {
    const userAuth = await auth
      .signInWithEmailAndPassword(email, password);
    return {
      status: StatusCodes.OK,
      data: userAuth,
      error: null,
    };
  } catch (error) {
    if (error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found') {
      return {
        status: StatusCodes.NOT_FOUND,
        data: null,
        error,
      };
    }
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      error,
    };
  }
};

/**
 * Send a reset password confirmation email to
 * user with its email.
 * @param {string} email valid email in firestore
 * @return {JSON} HTTP status code
 * Errors (only list relevant ones):
 *  Invalid email
 *  user not found
 */
export const sendResetPasswordEmail = async (email) => {
  const auth = firebase.auth();
  try {
    await auth.sendResetPasswordEmail(email);
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
      // Authticate user if user verified its email or is an anonymous user.
      if (userAuth && (userAuth.emailVerified || userAuth.isAnonymous)) {
        resolve(userAuth);
      } else {
        // Null if user didn't verify it's email and isn't an anonymous user.
        resolve(null);
      }
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
 * Log current out.
 * @return {Object} response object.
 */
export const logOut = async () => {
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

/**
 * This function give a temporary account for users who do not want to sign up.
 * When user choose to skip the registrition, this function should be called
 * to create an anonymous account for them.
 * Call this function to sign in user anonymously.
 * @param {User} userData user's data
 * @return {Object} user auth or error object.
 */
export const signInAnonymousUser = async (userData) => {
  try {
    const userAuth = await auth.signInAnonymously();
    return {
      status: StatusCodes.OK,
      data: userAuth,
      error,
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
 * Link user to their current anonymousAccount.
 * @param {String} email email of user.
 * @param {String} password password of user.
 * @return {Object} userAuth or error object.
 */
export const linkUserToAnonymousAccount = async (email, password) => {
  try {
    const credential = auth.EmailAuthProvider.credential(email, password);
    const userAuth = await auth.currentUser.linkWithCredential(credential);
    return {
      status: StatusCodes.OK,
      data: userAuth,
      error: 'Linking success',
    };
  } catch (error) {
    if (error.message === 'Cannot read property \'credential\' of undefined') {
      return {
        status: StatusCodes.NOT_FOUND,
        data: null,
        error: {
          message: 'user not found by this email and password',
        },
      };
    }
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      error,
    };
  }
};
