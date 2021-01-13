import { watchUnplashImages } from './imageGrid/saga';
import { unsplashImagesReducer } from './imageGrid/slice';
import { watchUnplashStats } from './stats/saga';
import { unsplashStatsReducer } from './stats/slice';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  images: unsplashImagesReducer,
  stats: unsplashStatsReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([watchUnplashImages(), watchUnplashStats()]);
}

const createStoreReduxTooltip = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: tree,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStoreReduxTooltip;
