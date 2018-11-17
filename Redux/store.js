import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebase from "firebase";
import reducers from "./index";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA582by8vnw-BP4KwfJlEoQqjmNij2haAQ",
  authDomain: "smb-3-baa7e.firebaseapp.com",
  databaseURL: "https://smb-3-baa7e.firebaseio.com",
  projectId: "smb-3-baa7e",
  storageBucket: "smb-3-baa7e.appspot.com",
  messagingSenderId: "1042206624785"
};

firebase.initializeApp(firebaseConfig);

// react-redux-firebase options
const config = {
  userProfile: "users", // firebase root where user profiles are stored
  enableLogging: false // enable/disable Firebase's database logging
};

/* const createStoreWithMiddleware = applyMiddleware(
  reduxThunk,
)(createStore);

const store = createStoreWithMiddleware(reducers); */
const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      reduxThunk.withExtraArgument(getFirebase) // Pass getFirebase function as extra argument
    ),
    reactReduxFirebase(firebase, config)
  )
);

export default store;
