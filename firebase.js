import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe8H-h-HpWHYpin0jM4rsZMIhh7lRfJj0",
  authDomain: "hr-management-a89a2.firebaseapp.com",
  projectId: "hr-management-a89a2",
  storageBucket: "hr-management-a89a2.appspot.com",
  messagingSenderId: "301506503336",
  appId: "1:301506503336:web:d4a20a49bad8e090b2989d",
  measurementId: "G-RHB6N7TE9Q",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;
