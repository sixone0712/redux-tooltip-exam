import { watchUnplashImages } from './imageGrid/saga';
import { unsplashImagesReducer } from './imageGrid/slice';
import watchUnplashStatsRequest from './stats/saga';
import { unsplashStatsReducer } from './stats/slice';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  images: unsplashImagesReducer,
  // stats: unsplashStatsReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  // yield all([watchUnplashImages(), watchUnplashStatsRequest()]);
  yield all([watchUnplashImages()]);
}

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
