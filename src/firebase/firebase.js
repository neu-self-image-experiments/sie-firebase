import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// the following config does not work please refer to doc and make change locally.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: config.REACT_APP_FIREBASE_API_KEY,
    authDomain: config.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: config.REACT_APP_PROJECT_ID,
    storageBucket: config.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: config.REACT_APP_MSG_SENDER_ID,
    appId: config.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
