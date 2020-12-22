import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import userReducer from './reducers/user';
import errorReducer from './reducers/error';
import postsReducer from './reducers/posts';
import commentsReducer from './reducers/comments';
import modalReducer from './reducers/modal';

const store = createStore(
  combineReducers({
    user: userReducer,
    error: errorReducer,
    posts: postsReducer,
    comments: commentsReducer,
    modal: modalReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
