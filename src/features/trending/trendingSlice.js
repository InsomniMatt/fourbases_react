import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fourBases from "../../request";

export const trendingApi = createAsyncThunk(
    "trendingApi",
    async (ThunkArg) => {
      const res = await fourBases("/players/trending");

      return res;
    }
)

export const trendingSlice = createSlice({
  name: "search",
  initialState: {
    value: {
      results:{
        players: [],
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(trendingApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(trendingApi.fulfilled, (state, {payload}) => {
      console.log('success');
      state.loading = false;
      state.value.results = payload;
    });
    builder.addCase(trendingApi.rejected, (state, {payload}) => {
      console.log('error');
      state.loading = false;
    });
  }
});
export const trendingReducer = trendingSlice.reducer;