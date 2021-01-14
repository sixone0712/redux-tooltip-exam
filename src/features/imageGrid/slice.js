import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
  isLoading: false,
  images: [],
  error: null,
};

const reducers = {
  load: (state, { payload: { page } }) => {
    console.log('reducers, load');
    console.log('reducers, page', page);
    state.isLoading = true;
  },
  loadSuccess: (state, { payload: { images } }) => {
    state.isLoading = false;
    state.page++;
    state.images.push(...images);
  },
  loadFail: (state, { payload: { error } }) => {
    state.isLoading = false;
    state.error = error;
  },
};

const slice = createSlice({
  name: 'images',
  initialState,
  reducers,
});

const selectAllState = createSelector(
  (state) => state.isLoading,
  (state) => state.images,
  (state) => state.error,
  (state) => state.page,
  (isLoading, images, error, page) => {
    return { isLoading, images, error, page };
  },
);

export const unsplashSelector = {
  all: (state) => selectAllState(state[slice.name]),
};

export const UNSPLASH_IMAGES = slice.name;
export const unsplashImagesReducer = slice.reducer;
export const unsplashImagesAction = slice.actions;
