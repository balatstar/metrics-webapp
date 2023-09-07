import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRegions = createAsyncThunk('regions/fetchRegions', async () => {
  const response = await fetch('https://api.carbonintensity.org.uk/regional');
  const data = await response.json();

  const uniqueIntensityIndexValues = Array.from(
    new Set(data.data[0].regions.map((region) => region.intensity.index)),
  );

  const lowestForecastValues = {};

  // Store the lowest forecast value for each intensity index
  uniqueIntensityIndexValues.forEach((intensityIndex) => {
    const regionsWithIntensity = data.data[0].regions.filter(
      (region) => region.intensity.index === intensityIndex,
    );
    const lowestForecast = Math.min(
      ...regionsWithIntensity.map((region) => region.intensity.forecast),
    );
    lowestForecastValues[intensityIndex] = lowestForecast;
  });

  return {
    regions: data.data[0].regions,
    uniqueIntensityIndexValues,
    lowestForecastValues,
  };
});

const regionSlice = createSlice({
  name: 'regions',
  initialState: {
    regions: [],
    loading: 'idle',
    error: null,
    uniqueIntensityIndexValues: [],
    lowestForecastValues: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegions.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.regions = action.payload.regions;
        state.uniqueIntensityIndexValues = action.payload.uniqueIntensityIndexValues;
        state.lowestForecastValues = action.payload.lowestForecastValues;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export default regionSlice.reducer;
