import firebase from '../firebase';

export default class UserServices {
    constructor() {
        self.db = firebase.firestore();
    }

    // singleton instance.
    static sieInstance = null;

    /**
     * Creating singleton instance.
     * @return {UserServices} instance
     */
    static getInstance = () => {
        if (self.sieInstance == null) {
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
            await db.collection('Users').doc(userId)
                .set(user);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }

    /**
     * Get all exsisting users.
     * @return {User} user object.
     */
    getUsers = async () => {
        try {
            const userRef = db.collection('Users');
            const snapshot = await userRef.get();
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            snapshot.forEach( (doc) => {
                console.log(doc.data());
            });
        } catch (err) {
            console.error(err);
        }
    }


    /**
     * Get user by specific id.
     * @param {String} userId id of user.
     * @return {User} user object.
     */
    getUserById = async (userId) => {
        try {
            const userRef = db.collection('Users')
                .doc(userId);
            const doc = await userRef.get();
            if (!doc.exists) {
                console.log('No such User!');
            } else {
                console.log('User data:', doc.data());
            }
            return doc;
        } catch (err) {
            console.error(err);
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
            const userRef = db.collection('Users')
                .doc(userId);
            await userRef.update(user);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Delete users by id.
     * @param {String} userId id of user.
     * @return {Boolean} succeed or not.
     */
    deleteUserById = async (userId) => {
        try {
            await db.collection('Users')
                .doc(userId).delete();
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}
