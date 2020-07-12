import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // <- needed if using firestore
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import {
  firebaseReducer,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import cloudFunctionsReducer from "reducers/cloudFunctions";
import progressReducer from "reducers/progress";
import rankingReducer from "reducers/ranking";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { createFirestoreInstance, firestoreReducer } from "redux-firestore"; // <- needed if using firestore
import thunkMiddleware from "redux-thunk";
import App from "./App";

const firebaseConfig = {
  apiKey: "AIzaSyDugUbujhDoAOiq9jw-xidMnC2kBFMAFfM",
  authDomain: "csgo-stats-457a9.firebaseapp.com",
  databaseURL: "https://csgo-stats-457a9.firebaseio.com",
  projectId: "csgo-stats-457a9",
  storageBucket: "csgo-stats-457a9.appspot.com",
  messagingSenderId: "535997578785",
  appId: "1:535997578785:web:7d76b1e95053fc5c4cad60",
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore

if (process.env.NODE_ENV === "development") {
  firebase.firestore().settings({
    host: "localhost:8080",
    ssl: false,
  });
}

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  cloudFunctions: cloudFunctionsReducer,
  ranking: rankingReducer,
  progress: progressReducer,
});

// Create store with reducers
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // <- needed if using firestore
};

render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App store={store} rrfProps={rrfProps} />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
