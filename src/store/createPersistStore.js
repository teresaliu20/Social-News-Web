// lib/redux.js
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';
import { createLogger } from 'redux-logger';
import { compose, applyMiddleware, createStore } from 'redux';
import config from 'config';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';
import Types from '../actions/index';

function immutableChildren(obj) {
  const state = {};
  Object.keys(obj).forEach((key) => {
    state[key] = Immutable.fromJS(obj[key]);
  });
  return state;
}


function createMiddlewares() {
  const middlewares = [
    thunkMiddleware,
  ];

  if (config.env === 'development' && typeof window !== 'undefined') {
    middlewares.push(createLogger({
      level: 'info',
      collapsed: true,
      stateTransformer: (state) => {
        const newState = {};

        for (const i of Object.keys(state)) {
          if (Immutable.Iterable.isIterable(state[i])) {
            newState[i] = state[i].toJS();
          }
          else {
            newState[i] = state[i];
          }
        }

        return newState;
      },
    }));
  }

  return middlewares;
}

const makeConfiguredStore = (reducer, initialState, middlewares) => createStore(reducer, initialState, compose(applyMiddleware(...middlewares)));

export const createPersistStore = (initialState, { isServer, req, debug, storeKey }) => {
  const middlewares = createMiddlewares({ isServer });
  if (isServer) {
    return makeConfiguredStore(rootReducer, initialState, middlewares);
  }

  const persistConfig = {
    key: 'nextjs',
    // whitelist: ['fromClient', 'user'], // make sure it does not clash with server keys
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = makeConfiguredStore(persistedReducer, initialState, middlewares);

  /* eslint-disable no-underscore-dangle */
  store.__persistor = persistStore(store); // Nasty hack

  return store;
};

export const setClientState = (clientState) => ({
  type: Types.SET_CLIENT_STATE,
  payload: clientState,
});
