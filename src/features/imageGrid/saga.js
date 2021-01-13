import { call, put, takeLatest } from 'redux-saga/effects';
import { unsplashImagesAction } from './slice';
import { fetchImages } from '../../api';

function* handleUnsplashImagesLoad() {
  const { loadSuccess, loadFail } = unsplashImagesAction;

  try {
    const images = yield call(fetchImages);
    yield put(loadSuccess(images));
  } catch (e) {
    yield put(loadFail(e));
  }
}

export function* watchUnplashImages() {
  const { load } = unsplashImagesAction;
  yield takeLatest(load, handleImageLoad);
}
