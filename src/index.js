import React from 'react';
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import { rootReducer } from "./reducers/reducers";
import App from "./App";
// import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAKfiia3PSIRembuSOVtUhO1GTPmE_m7WY",
  authDomain: "uncleteslim-react-clientpanel.firebaseapp.com",
  databaseURL: "https://uncleteslim-react-clientpanel.firebaseio.com",
  projectId: "uncleteslim-react-clientpanel",
  storageBucket: "uncleteslim-react-clientpanel.appspot.com",
  messagingSenderId: "1090900509212",
  appId: "1:1090900509212:web:f1128129ea4ec4d7bc15d9",
  measurementId: "G-ZRVMJ0CN90"
};

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

if (localStorage.getItem('settings') == null) {
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}


const initialState = { settings: JSON.parse(localStorage.getItem('settings'))};


const store = createStore(
  rootReducer,
  initialState,
  compose(
    // reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, //since we are using Firestore
};


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
      </ReactReduxFirebaseProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
