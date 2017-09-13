import uuid from 'uuid';
import store from '../store';
import { isEmpty, values } from 'lodash';
import { getDate } from '../utils/get-date';

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

export const getUser = () => {
  return state().user;
};

export const getPosts = () => {
  return state().posts;
};

export const getPostsByUserId = () => {
  const { user, posts } = state();
  return values(posts).filter(post => post.user === user);
};

export const getAuthentication = () => {
  if (!isEmpty(state().user)) {
    return true;
  }

  return false;
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
  const id = uuid.v4();
  const user = store.getState().user;
  const date = getDate();

  if (!user) {
    return;
  }

  return (dispatch) => writeToFirebase('/posts', (data) => ({
      ...data,
      [id]: { title, image, id, user, date, votes: {} },
    }));
};

export const upvotePost = ({ id, user }) => {
  return (dispatch) =>  writeToFirebase(`/posts/${id}/votes`, (votes) => ({
    ...votes,
    [user]: true,
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
      const { payload } = action;
      const user = payload ? payload.uid : null;

      return {
        ...state,
        user,
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
