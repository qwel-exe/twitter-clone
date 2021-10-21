import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA8Ww4oxjQ35wfRlNi8RLts-7v-elU1N9M",
  authDomain: "clone-5ce20.firebaseapp.com",
  databaseURL: "https://clone-5ce20-default-rtdb.firebaseio.com",
  projectId: "clone-5ce20",
  storageBucket: "clone-5ce20.appspot.com",
  messagingSenderId: "1070649130222",
  appId: "1:1070649130222:web:7239622193f834834407ff",
  measurementId: "G-HDSGZZC89E",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
