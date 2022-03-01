import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const config = {
  apiKey: "AIzaSyBKEC0WRfTgDlLc7ZGTCssRo2_xwbf7A58",
  authDomain: "ecomm-react-bec21.firebaseapp.com",
  projectId: "ecomm-react-bec21",
  storageBucket: "ecomm-react-bec21.appspot.com",
  messagingSenderId: "568722379852",
  appId: "1:568722379852:web:a6e5a6905494125ad150e9",
  measurementId: "G-25HKT43NXZ",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider, "Google");

export default firebase;