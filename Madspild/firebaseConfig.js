import { initializeApp, getApps } from "firebase/app";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmMIXMEpLNz8DfaqkVQ1tGfmwVWd1gYn8",
    authDomain: "innoeksamen.firebaseapp.com",
    projectId: "innoeksamen",
    storageBucket: "innoeksamen.appspot.com",
    messagingSenderId: "928017336706",
    appId: "1:928017336706:web:2d99d6e428762622b0679b"
  };

// Initialize Firebase
let firebaseApp = initializeApp(firebaseConfig);
console.log("Firebase has been initialized");

// Console.log if Firebase is initialized.
if (getApps().length > 0) {
  console.log("Firebase is initialized. Apps:", getApps());
} else {
  console.log("Firebase has not been initialized yet.");
}

export default firebaseApp;