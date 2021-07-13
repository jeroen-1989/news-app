import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = firebase.initializeApp(
    {
        apiKey: "AIzaSyAR-9x14fHKF6QJtpBfptFDcvDmccJsKYs",
        authDomain: "eindopdracht-6fa47.firebaseapp.com",
        projectId: "eindopdracht-6fa47",
        databaseURL: "https://eindopdracht-6fa47-default-rtdb.europe-west1.firebasedatabase.app/",
        storageBucket: "eindopdracht-6fa47.appspot.com",
        messagingSenderId: "645976321494",
        appId: "1:645976321494:web:ce9399d73d45eda84d8877",
        measurementId: "G-Y13NSPE34Y"
    }
)

const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
const auth = firebase.auth();
const imageStorage = firebase.storage();

export {firebaseConfig, firestore, timestamp, auth, imageStorage};