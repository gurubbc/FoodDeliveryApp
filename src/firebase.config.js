import {getApp, getApps, initializeApp } from "firebase/app"
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "use your api key",
    authDomain: "use your details",
    databaseURL: "use your details from firebase",
    projectId: "use your id",
    storageBucket: "use your details here",
    messagingSenderId: "your info",
    appId: "your id"
  };

// Initialize Firebase
// const app = initializeApp(firebaseConfig); // this will initialize everytime whenever your page refreshed
const app = getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);
const firestore=getFirestore(app) // this is db
const storage=getStorage(app)

export {app,firestore,storage};
  