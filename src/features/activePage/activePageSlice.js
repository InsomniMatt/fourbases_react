import {createSlice, } from '@reduxjs/toolkit';

export const activePageSlice = createSlice({
  name: "activePage",
  initialState: {
    value: "home",
  },
  reducers: {
    setActivePage: (state, page) => {
      state.value = page.payload;
    }
  }
});

export const { setActivePage } = activePageSlice.actions;
export default activePageSlice.reducer;