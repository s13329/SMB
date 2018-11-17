import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase'
import listReducer from './modules/list'

const rootReducer = combineReducers({
  form: formReducer,
  list: listReducer,
  firebase: firebaseReducer
});

export default rootReducer;
