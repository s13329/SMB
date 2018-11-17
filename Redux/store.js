import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './index';

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk,
)(createStore);

const store = createStoreWithMiddleware(reducers);

export default store;
