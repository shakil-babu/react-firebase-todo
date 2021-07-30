import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDud7-DsjxB8PuPwZtf4rMJdrT8_ForLmY",
    authDomain: "daily-routine-todo.firebaseapp.com",
    projectId: "daily-routine-todo",
    storageBucket: "daily-routine-todo.appspot.com",
    messagingSenderId: "280041765415",
    appId: "1:280041765415:web:807f472621f4641b6aec02"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseConfig;


// firestore database
export const db = firebaseApp.firestore();
