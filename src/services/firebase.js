import firebase from 'firebase';
import { addUserToStore } from '../ducks';
import store from '../store';

/**
 * Write to Firebase
 */

export const writeToFirebase = (collection, reducer) => {
  console.log('write to firebase');
  firebase.database().ref(collection).transaction(reducer);
};

/**
 * Add user to Firebase
 */

export const addUserToFirebaseService = ({ email, password }) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
    console.log(error);
  });
};

/**
 * Sign in Firebase user
 */

export const signInFirebaseService = ({ email, password }) => {
  firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
    console.log(error);
  });
};

/**
 * Logout Firebase user
 */

export const signOutFirebaseService = () => {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });
};

/**
 * Watch authenication
 */

export const checkFirebaseAuthenication = () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('user signed in');
      store.dispatch(addUserToStore(user));
      return true;
      // ...
    } else {
      console.log('user signed out');
      store.dispatch(addUserToStore(null));
      return false;
    }
  });
};
