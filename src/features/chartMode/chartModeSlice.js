import {createSlice} from '@reduxjs/toolkit';

export const chartModeSlice = createSlice({
  name: "chartMode",
  initialState: {
    value: "player",
  },
  reducers: {
    setChartMode: (state, stats) => {
      state.value = stats.payload;
    }
  }
});

export const { setChartMode } = chartModeSlice.actions;
export default chartModeSlice.reducer;