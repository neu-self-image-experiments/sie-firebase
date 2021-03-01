import firebase from '../firebase';

export default class UserServices {
  constructor() {
  }

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
  }

  /**
   * post new user to authentication.
   * @param {User} user user object contains email and password.
   * @return {User} return user credential object.
   */
  postUser = async (user) => {
    try {
      const res = await firebase.auth().
        createUserWithEmailAndPassword(user.email, user.password);
      return res;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {errorCode, errorMessage};
    }
  }

  /**
   * Send new user email verification when they register.
   * @return {Boolean} success or not.
   */
  sendEmailVerification = async () => {
    try {
      self.user = firebase.auth().currentUser;
      await self.user.sendEmailVerification();
      return true;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      return {errorCode, errorMessage};
    }
  }

  /**
   * Sign in user.
   * @param {User} user user object with email and password.
   * @return {user} authenticated user object.
   */
  signIn = async (user) => {
    try {
      const userCredential = await firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password);
      return userCredential.user;
    } catch (error) {
      return error;
    }
  }

  /**
   * Observer function which calls callback function.
   * @param {Function} callback listener function.
   */
  getCurrentUser = async (callback) => {
    try {
      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          callback(user);
        } else {
          return 'no user';
        }
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * Delete current signed-in user.
   * @return {Boolean} sucess or not.
   */
  deleteUser = async () => {
    try {
      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          user.delete();
          return true;
        } else {
          return 'no user';
        }
      });
    } catch (error) {
      return error;
    }
  }
}
