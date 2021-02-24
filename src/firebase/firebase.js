import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Due to env not working will put here for now cuz its blocking.
const config = {
    REACT_APP_FIREBASE_API_KEY: 'AIzaSyAXaRZRwMxLoe-b1BxqBnJjbdd7NZF-FEY',
    REACT_APP_FIREBASE_AUTH_DOMAIN: 'cs6510-spr2021.firebaseapp.com',
    REACT_APP_PROJECT_ID: 'cs6510-spr2021',
    REACT_APP_STORAGE_BUCKET: 'cs6510-spr2021.appspot.com',
    REACT_APP_MSG_SENDER_ID: '796249853280',
    REACT_APP_APP_ID: '1:796249853280:web:56dc4cd01ba8bd8f7be205',
    REACT_APP_MEASUREMENT_ID: 'G-NTJ3K8ST70',
};

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
