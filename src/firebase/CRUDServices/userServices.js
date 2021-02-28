import firebase from '../firebase';

export default class UserServices {
  constructor() {
    self.db = firebase.firestore();
    self.users = 'Users';
  }

  // singleton instance.
  static sieInstance = null;

  /**
   * Creating singleton instance.
   * @return {UserServices} instance
   */
  static getInstance = () => {
    if (self.sieInstance === null) {
      self.sieInstance = new UserServices();
    }
    return self.sieInstance;
  }

  /**
   * Create user in database.
   * @param {String} userId id of the new user.
   * @param {User} user user object.
   * @return {Boolean} succeed or not.
   */
  postUser = async (userId, user) => {
    try {
      await db.collection(self.users).doc(userId)
        .set(user);
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Get all exsisting users.
   * @return {User[]} array of user object.
   */
  getUsers = async () => {
    try {
      const userRef = db.collection(self.users);
      const snapshot = await userRef.get();
      const res = [];
      if (snapshot.empty) {
        // TODO: add logic here
        return res;
      }

      // add documents to response array
      snapshot.forEach( (doc) => {
        res.push(doc.data());
      });

      return res;
    } catch (err) {
      // TODO: add logic here
    }
  }


  /**
   * Get user by specific id.
   * @param {String} userId id of user.
   * @return {User} user object.
   */
  getUserById = async (userId) => {
    try {
      const userRef = db.collection(self.users)
        .doc(userId);
      const doc = await userRef.get();
      if (!doc.exists) {
        // TODO: add logic here
        return {};
      } else {
        return doc.data();
      }
    } catch (err) {
      // TODO: add logic here
    }
  }

  /**
   * Update specific attributs of user by id.
   * @param {String} userId id of user.
   * @param {User} user updating attributes and values.
   * @return {Boolean} succeed or not.
   */
  updateUserById = async (userId, user) => {
    try {
      const userRef = db.collection(self.users)
        .doc(userId);
      await userRef.update(user);
      return true;
    } catch (err) {
      // TODO: add logic here
      return false;
    }
  }

  /**
   * Delete users by id.
   * @param {String} userId id of user.
   * @return {Boolean} succeed or not.
   */
  deleteUserById = async (userId) => {
    try {
      await db.collection(self.users)
        .doc(userId).delete();
      return true;
    } catch (err) {
      // TODO: add logic here
      return false;
    }
  }
}
