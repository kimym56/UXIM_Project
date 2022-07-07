// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import {getStorage} from 'firebase/storage'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAP2azA8UIeMPVL5TI3K5F1sl312Yzt88o',
  authDomain: 'uxim-project.firebaseapp.com',
  projectId: 'uxim-project',
  storageBucket: 'uxim-project.appspot.com',
  messagingSenderId: '542680425590',
  appId: '1:542680425590:web:9451f8edbd629c2e3a2b57',
  measurementId: 'G-Q4WE7M6ZHL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
