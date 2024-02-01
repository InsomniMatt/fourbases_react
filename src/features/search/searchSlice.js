import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import fourBases from "../../request";

export const searchApi = createAsyncThunk(
    "searchApi",
    async (ThunkArg) => {

      const res = await fourBases("/players/search", {query: ThunkArg});
      return res;
    }
)

export const defaultSearch = createAsyncThunk(
    "defaultSearch",
    async (ThunkArg) => {
      const res = await fourBases("/players/trending");

      return res;
    }
)

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    value: {
      term: "",
      results:{
        teams: [],
        players: [],
      },
    },
  },
  reducers: {
    setTerm: (state, change) => {
      state.value.term = change.payload;
    },
    clearResults: (state) => {
      state.value.results = {teams: [], players: []};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchApi.fulfilled, (state, {payload}) => {
      console.log('success');
      state.loading = false;
      state.value.results = payload;
    });
    builder.addCase(searchApi.rejected, (state, {payload}) => {
      console.log('error');
      state.loading = false;
    });
    builder.addCase(defaultSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(defaultSearch.fulfilled, (state, {payload}) => {
      console.log('success');
      state.loading = false;
      state.value.results = payload;
    });
    builder.addCase(defaultSearch.rejected, (state, {payload}) => {
      console.log('error');
      state.loading = false;
    });
  }
});

export const {setTerm, clearResults} = searchSlice.actions
export const searchReducer = searchSlice.reducer;