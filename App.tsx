import React from 'react';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import Navigator from './src/navigation/Navigator';
import tvSeriesReducer from './src/store/reducers/tvSeries';

const rootReducer = combineReducers({
  tvSeries: tvSeriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
};

export default App;
