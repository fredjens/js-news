import uuid from 'uuid';
import store from '../store';

import {
  writeToFirebase,
  addUserToFirebaseService,
  signInFirebaseService,
  signOutFirebaseService,
} from '../services/firebase';

const initialState = {
  posts: {},
  user: {},
};

/**
 * Commands
 */

const UPDATE = 'UPDATE';
const AUTH = 'AUTH';

/**
 * Selectors
 */

const state = () => store.getState();

export const getAuthentication = () => {
  if (state().user) {
    return true;
  }

  return false;
};

export const getUser = () => {
  return state().user;
};

export const getPosts = () => {
  return state().posts;
};

/**
 * Actions
 */

export const addUser = ({ email, password }) => {
  return () => addUserToFirebaseService({ email, password });
};

export const signInUser = ({ email, password }) => {
  return () =>  signInFirebaseService({ email, password });
};

export const logOutUser = () => {
  return () =>  signOutFirebaseService();
};

/**
 * Write to Firebase
 */

export const addPost = ({ title, image }) => {
  console.log('add new post!');
  const id = uuid.v4();

  return (dispatch) => writeToFirebase('/posts', (data) => ({
      ...data,
      [id]: { title, image, id },
    }));
};

export const upvote = () => {
  console.log('upvote 😀');

  return (dispatch) =>  writeToFirebase((votes) => ({
    ...votes,
    up: votes.up + 1,
  }));
};

export const downvote = () => {
  console.log('downvote 😞');

  return (dispatch) =>  writeToFirebase((votes) => ({
    ...votes,
    down: votes.down + 1,
  }));
};

/**
 * GLobal update function
 */

export const addUserToStore = (payload) => {
 return {
   type: AUTH,
   payload,
 };
};

export const updateFirebase = (collection) => {
  console.log('update');
  return {
    type: UPDATE,
    collection,
  };
};

/**
 * Reducers
 */

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      console.log('action', action);
      return {
        ...state,
        user: action.payload.uid,
      };
    case UPDATE:
      return {
        ...state,
        ...action.collection,
      };
    default:
      return state;
  }
};

export default reducer;
