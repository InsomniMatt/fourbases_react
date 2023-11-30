import {createSlice} from '@reduxjs/toolkit';

export const rollingStatsSlice = createSlice({
  name: "rollingStats",
  initialState: {
    value: {},
  },
  reducers: {
    setRollingStats: (state, stats) => {
      state.value = stats.payload;
    }
  }
});

export const { setRollingStats } = rollingStatsSlice.actions;
export default rollingStatsSlice.reducer;