import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fourBases from "../../request";

export const getTeamStats = createAsyncThunk(
    "team/getTeamStats",
    async (ThunkArg) => {
      console.log('ThunkTeam');
      const res = await fourBases("/teams/"+ ThunkArg.teamId + "/stats", ThunkArg.query);
      res.queryAttributes = ThunkArg.query;
      return res;
    }
)

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    value: {},
  },
  reducers: {
    setTeam: (state, change) => {
      state.value = change.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTeamStats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTeamStats.fulfilled, (state, {payload}) => {
      console.log('success');
      state.loading = false;
      state.value = payload;
    });
    builder.addCase(getTeamStats.rejected, (state, {payload}) => {
      console.log('error');
      state.loading = false;
    });
  }
});

export const {setTeam} = teamSlice.actions
export const teamReducer = teamSlice.reducer;