import {createSlice} from '@reduxjs/toolkit';

export const activePlayerSlice = createSlice({
  name: "activePlayer",
  initialState: {
    value: {},
  },
  reducers: {
    setActive: (state, player) => {
      state.value = player.payload;
    },
    setStats: (state, stats) => {
      state.value.stats = stats.payload;
    },
  }
});

export const { setActive } = activePlayerSlice.actions;
export default activePlayerSlice.reducer;