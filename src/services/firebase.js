import firebase from 'firebase';
import { addUserToStore, addUserToFirebase } from '../ducks';
import store from '../store';

var provider = new firebase.auth.GithubAuthProvider();

/**
 * Write to Firebase
 */

export const writeToFirebase = (collection, reducer) => {
  console.log('write to firebase');
  firebase.database().ref(collection).transaction(reducer);
};

/**
 * Sign in Firebase user
 */

export const signInFirebaseService = async () => {
  const user = await firebase.auth().signInWithPopup(provider);
  const { uid: id, displayName: name = 'Anonymous', email = '', photoURL: photo = '' } = user.user;
  store.dispatch(addUserToFirebase({ id, name, photo, email }));
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
      console.log('user signed in', user.uid);
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
