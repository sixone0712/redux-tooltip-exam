import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';

import Header from './components/Header';
import ImageGrid from './components/ImageGrid';

// import configureStore from './store';
// const store = configureStore();

import createStore from './features';
const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Header />
        <ImageGrid />
      </Fragment>
    </Provider>
  );
}

export default App;
