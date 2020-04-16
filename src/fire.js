import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyDcgGww23wUJDQREY54zOk1CXvy3dwNn18",
  authDomain: "consume-local-29145.firebaseapp.com",
  databaseURL: "https://consume-local-29145.firebaseio.com",
  projectId: "consume-local-29145",
  storageBucket: "consume-local-29145.appspot.com",
  messagingSenderId: "449710938751",
  appId: "1:449710938751:web:1c396c93e1d4b70d0dbd4a",
  measurementId: "G-TSM3YLMJKT"
};
export default firebase.initializeApp(config);