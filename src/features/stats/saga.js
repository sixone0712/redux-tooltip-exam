import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { unsplashStatsActions } from './slice';
import { fetchImageStats } from '../../api';
import { unsplashImagesAction } from '../imageGrid/slice';

function* handleStatsLoad(id) {
  const { loadSuccess, loadFail } = unsplashStatsActions;

  try {
    const donwloads = yield call(fetchImageStats(id));
    const {
      downloads: { total },
    } = donwloads;
    yield put(loadSuccess(total));
  } catch (e) {
    yield put(loadFail(e));
  }
}

export default function* watchUnplashStatsRequest() {
  while (true) {
    const { images } = yield take(unsplashImagesAction.loadSuccess);
    for (const image in imaegs) {
      yield fork(handleStatsLoad, image.id);
    }
  }
}
