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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider, "Google");

export default firebase;
