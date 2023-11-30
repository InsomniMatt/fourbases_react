import {createSlice} from '@reduxjs/toolkit';

export const activePlayerSlice = createSlice({
  name: "activePlayer",
  initialState: {
    value: {},
  },
  reducers: {
    setActive: (state, player) => {
      state.value = player.payload;
    }
  }
});

export const { setActive } = activePlayerSlice.actions;
export default activePlayerSlice.reducer;