import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import errorReducer from './reducers/error';

const store = createStore(
  combineReducers({ user: userReducer, error: errorReducer }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
