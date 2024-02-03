import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fourBases from "../../request";

export const getStats = createAsyncThunk(
    "player/getStats",
    async (ThunkArg) => {
      const res = await fourBases("/players/" + ThunkArg.playerId + "/stats", ThunkArg.query);

      res.queryAttributes = ThunkArg.query;
      return res;
    }
)

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    value: {},
  },
  reducers: {
    setPlayer: (state, change) => {
      state.value = change.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getStats.pending, (state) => {
      state.loading = true;
      state.status = "loading";
    });
    builder.addCase(getStats.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.value = payload;
    });
    builder.addCase(getStats.rejected, (state, {payload}) => {
      state.loading = false;
    });
  }
});

export const {setPlayer} = playerSlice.actions
export const playerReducer = playerSlice.reducer;