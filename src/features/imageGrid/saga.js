import { call, put, select, takeLatest } from 'redux-saga/effects';
import { unsplashImagesAction } from './slice';
import { fetchImages } from '../../api';

function* handleUnsplashImagesLoad(action) {
  const page = yield select((state) => state.images.page);
  const { loadSuccess, loadFail } = unsplashImagesAction;

  try {
    const images = yield call(fetchImages, page);
    console.log('fetch_images', images);
    console.log('page', page);
    console.log(loadSuccess);
    yield put(loadSuccess({ images }));
  } catch (e) {
    yield put(loadFail(e));
  }
}

export function* watchUnplashImages() {
  const { load } = unsplashImagesAction;
  yield takeLatest(load, handleUnsplashImagesLoad);
}
