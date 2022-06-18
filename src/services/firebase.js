import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyC42MHSCGEaJFVCI0rpGLSu_-0nduFLvAA",
        authDomain: "neelanjan-manna.firebaseapp.com",
        databaseURL: "https://neelanjan-manna.firebaseio.com",
        projectId: "neelanjan-manna",
        storageBucket: "neelanjan-manna.appspot.com",
        messagingSenderId: "853491017807",
        appId: "1:853491017807:web:6d3ebdce91ac4f38dae23a",
        measurementId: "G-0XDFFT78QF"
    });
}

const db = firebase.app().firestore();
const storage = firebase.app().storage();
const auth = firebase.app().auth();

export { db, storage, auth }
