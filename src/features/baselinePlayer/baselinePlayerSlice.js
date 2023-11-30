import {createSlice} from '@reduxjs/toolkit';

export const baselinePlayerSlice = createSlice({
  name: "baselinePlayer",
  initialState: {
    value: {},
  },
  reducers: {
    setBaseline: (state, player) => {
      state.value = player.payload;
    }
  }
});

export const { setBaseline } = baselinePlayerSlice.actions;
export default baselinePlayerSlice.reducer;