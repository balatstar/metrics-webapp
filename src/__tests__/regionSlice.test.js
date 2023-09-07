import configureStore from 'redux-mock-store';
import regionSlice from '../redux/region/regionSlice';

const mockStore = configureStore([]);

describe('regionSlice reducer', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      regions: [],
      loading: 'idle',
      error: null,
      uniqueIntensityIndexValues: [],
      lowestForecastValues: {},
    });
  });

  it('should handle fetchRegions.pending', () => {
    const action = { type: 'regions/fetchRegions/pending' };
    const newState = regionSlice(store.getState(), action);
    expect(newState.loading).toBe('loading');
  });

  it('should handle fetchRegions.fulfilled', () => {
    const fakeRegionData = {
      regions: [{ name: 'Region 1' }, { name: 'Region 2' }],
      uniqueIntensityIndexValues: [1, 2, 3],
      lowestForecastValues: { 1: 10, 2: 20, 3: 30 },
    };

    const action = {
      type: 'regions/fetchRegions/fulfilled',
      payload: fakeRegionData,
    };

    const newState = regionSlice(store.getState(), action);
    expect(newState.loading).toBe('succeeded');
    expect(newState.regions).toEqual(fakeRegionData.regions);
    expect(newState.uniqueIntensityIndexValues).toEqual(fakeRegionData.uniqueIntensityIndexValues);
    expect(newState.lowestForecastValues).toEqual(fakeRegionData.lowestForecastValues);
  });

  it('should handle fetchRegions.rejected', () => {
    const action = {
      type: 'regions/fetchRegions/rejected',
      error: true,
      payload: 'Network Error',
    };

    const newState = regionSlice(store.getState(), action);
    expect(newState.loading).toBe('failed');
  });
});
