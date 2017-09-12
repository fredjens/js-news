import firebase from 'firebase';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer, { updateFirebase } from './ducks';
import config from './config';

firebase.initializeApp(config);
const database = firebase.database();

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

database.ref('/').on('value', (snapshot) => {
  const collection = snapshot.val();
  store.dispatch(updateFirebase(collection));
});

export default store;
