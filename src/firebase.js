import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDJ6fdoJZB3UeXibWvLpfxtnNoVnx6iuT4",
  authDomain: "ecommerce-1c7e4.firebaseapp.com",
  projectId: "ecommerce-1c7e4",
  storageBucket: "ecommerce-1c7e4.appspot.com",
  messagingSenderId: "832804237284",
  appId: "1:832804237284:web:159d0e4e05320a1ad621f1"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();