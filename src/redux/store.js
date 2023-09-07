import { configureStore, combineReducers } from '@reduxjs/toolkit';
import regionReducer from '../redux/region/regionSlice';

const rootReducer = combineReducers({
  regions: regionReducer,
});

const initialState = {
  regions: {
    regions: [],
    loading: 'idle',
    error: null,
    uniqueIntensityIndexValues: [],
    lowestForecastValues: {},
  },
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
