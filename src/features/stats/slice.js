import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  downloads: 0,
  error: null,
};

const reducers = {
  load: (state) => {
    state.isLoading = true;
  },
  loadSuccess: (state, { payload: { downloads } }) => {
    //   [action.id]: {
    //     isLoading: true,
    //     downloads: null,
    //     error: false,
    // },

    state.isLoading = false;
    state.downloads = downloads;
  },
  loadFail: (state, { payload: { error } }) => {
    state.isLoading = false;
    state.error = error;
  },
};

const slice = createSlice({
  name: 'stats',
  initialState,
  reducers,
});

export const selectAllstate = createSelector(
  (state) => state.isLoading,
  (state) => state.downloads,
  (state) => state.error,
  (isLoading, downloads, error) => ({ isLoading, downloads, error }),
);

export const unsplashStatsSelector = {
  all: (state) => selectAllstate(state['stats']),
};

export const UNSPLASH_STATS = slice.name;
export const unsplashStatsReducer = slice.reducers;
export const unsplashStatsActions = slice.actions;
