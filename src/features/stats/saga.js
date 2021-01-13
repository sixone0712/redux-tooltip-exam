import { call, put, takeLatest } from 'redux-saga/effects';
import { unsplashStatsActions } from './slice';
import { fetchImageStats } from '../../api';

function* handleStatsLoad() {
  const { loadSuccess, loadFail } = unsplashStatsActions;

  try {
    const donwloads = yield call(fetchImageStats);
    const {
      downloads: { total },
    } = donwloads;
    yield put(loadSuccess(total));
  } catch (e) {
    yield put(loadFail(e));
  }
}

export function* watchUnplashStats() {
  const { load } = unsplashStatsActions;

  yield takeLatest(load, handleStatsLoad);
}
