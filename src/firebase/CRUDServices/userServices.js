import firebase from '../firebase';

export default class UserServices {
  constructor() {
    this.users = 'Users';
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

  sendEmailVerification = async (user) => {
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

  signIn = async (user) => {
    try {
      const userCredential = await firebase.auth()
        .signInWithEmailAndPassword(user.email, user.password);
      return userCredential;
    } catch (error) {
      return error;
    }
  }

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

  deleteUser = async (user) => {
    try {
      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          user.delete();
        } else {
          return 'no user';
        }
      });
    } catch (error) {
      return error;
    }
  }
}
