import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  images: [],
  error: null,
};

const reducers = {
  load: (state) => {
    state.isLoading = true;
  },
  loadSuccess: (state, { payload: images }) => {
    state.isLoading = false;
    state.image.push(...images);
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
  (isLoading, images, error) => {
    return { isLoading, images, error };
  },
);

export const unsplashSelector = {
  all: (state) => selectAllState(state[slice.name]),
};

export const UNSPLASH_IMAGES = slice.name;
export const unsplashImagesReducer = slice.reducer;
export const unsplashImagesAction = slice.actions;
