import {createSlice} from '@reduxjs/toolkit';

export const queryAttributesSlice = createSlice({
  name: "dateRange",
  initialState: {
    value: {
      startDate: "",
      endDate: "",
      groupCount: 50,
      groupType: "At Bats",
    },
  },
  reducers: {
    setStartDate: (state, change) => {
      state.value.startDate = change.payload;
    },
    setEndDate: (state, change) => {
      state.value.endDate = change.payload;
    },
    setGroupCount: (state, change) => {
      state.value.groupCount = change.payload;
    },
    setGroupType: (state, change) => {
      state.value.groupType = change.payload;
    }
  }
});

export const { setStartDate, setEndDate, setGroupCount, setGroupType } = queryAttributesSlice.actions;
export default queryAttributesSlice.reducer;