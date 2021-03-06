import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import listReducer from './modules/list'

const rootReducer = combineReducers({
  form: formReducer,
  list: listReducer
});

export default rootReducer;
