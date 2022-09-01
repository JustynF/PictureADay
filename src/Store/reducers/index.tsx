import {createSlice} from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'home',
  initialState: {startDate: null, endDate: null},
  reducers: {
    setDateRange: (state, {payload: {startDate, endDate}}) => {
      if (typeof startDate !== 'undefined' && typeof endDate !== 'undefined') {
        state.startDate = startDate;
        state.endDate = endDate;
      }
    },
  },
});

export const {setDateRange} = slice.actions;

export default slice.reducer;
