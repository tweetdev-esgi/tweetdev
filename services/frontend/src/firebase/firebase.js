// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDsfs_WJ9yvOPxmPtqBq6duDiXcX3fdNwI",
    authDomain: "tweetdev-45480.firebaseapp.com",
    projectId: "tweetdev-45480",
    storageBucket: "tweetdev-45480.appspot.com",
    messagingSenderId: "394208925772",
    appId: "1:394208925772:web:c0fa04d9a3351a2cfdbce9",
    measurementId: "G-SBBYWPRE49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}