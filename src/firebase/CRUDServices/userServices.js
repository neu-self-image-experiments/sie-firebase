/* eslint-disable no-console */
import firebase from '../firebase';

/* eslint-disable no-invalid-this */
export default class UserServices {
  // singleton instance.
  static userServiceInstance = null;

  /**
   * Creating singleton instance.
   * @return {UserServices} instance
   */
  static getInstance = () => {
    if (!self.userServiceInstance) {
      self.userServiceInstance = new UserServices();
    }
    return self.userServiceInstance;
  };

  /**
   * post new user to authentication.
   * @param {User} user user object contains email and password.
   * @return {User} return user credential object.
   */
  postUser = async (user) => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      return res;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    }
  };

  /**
   * Send new user email verification when they register.
   * @return {Response} result.
   */
  sendEmailVerification = async () => {
    try {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const res = await user.sendEmailVerification();
          return res;
        } else {
          return {
            errorCode: 'auth/no user',
            errorMessage: 'did not find user',
          };
        }
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    }
  };

  /**
   *
   * @param {User} user user object contains email and password.
   * @return {Response} result.
   */
  signUp = async (user) => {
    try {
      const res = await this.postUser(user);
      if (res) {
        // this.sendEmailVerification();
        return { status: 200, message: 'created' };
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    }
  };

  /**
   * Sign in user.
   * @param {User} user user object with email and password.
   * @return {user} authenticated user object.
   */
  signIn = async (user) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);
      return userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    }
  };

  /**
   * Observer function which calls callback function.
   * @param {Function} callback listener function.
   */
  getCurrentUser = async (callback) => {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          callback({ isLoggedIn: true, user });
        } else {
          callback({ isLoggedIn: false });
        }
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    }
  };

  /**
   * Delete current signed-in user.
   * @return {Response} result.
   */
  deleteUser = async () => {
    try {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user.delete();
          return { status: 200, message: 'deleted' };
        } else {
          return {
            errorCode: 'auth/no user',
            errorMessage: 'did not find user',
          };
        }
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return { errorCode, errorMessage };
    }
  };
}
