import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDz2DtEBRbut_KwcN1XQxAc5c-zArJ_2GA",
  authDomain: "mobilefinalproject-ad3dd.firebaseapp.com",
  databaseURL: "https://mobilefinalproject-ad3dd-default-rtdb.firebaseio.com",
  projectId: "mobilefinalproject-ad3dd",
  storageBucket: "mobilefinalproject-ad3dd.appspot.com",
  messagingSenderId: "756805699502",
  appId: "1:756805699502:web:da3af59bd742b121522a3f",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = getDatabase();
const firestore = getFirestore();
export { db, firestore, auth };
