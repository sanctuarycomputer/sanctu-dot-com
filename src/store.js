import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import reducers from 'state/reducers';

const middleware = [thunk, promise];

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createRootReducer = () => {
  return combineReducers({
    ...reducers
  });
};

export const store = createStore(
  createRootReducer(),
  composeEnhancers(applyMiddleware(...middleware))
);
