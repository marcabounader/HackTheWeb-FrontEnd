import { createSlice } from '@reduxjs/toolkit';

const labSlice = createSlice({
  name: 'labs',
  initialState: {
    labs: [],
    activeLabs: [],
    completedLabs: [],
    badges: [],
    statistics: {},
  },
  reducers: {
    setLabs: (state, action) => {
      state.labs = action.payload;
    },
    setActiveLabs: (state, action) => {
      state.activeLabs = action.payload;
    },
    setCompletedLabs: (state, action) => {
      state.completedLabs = action.payload;
    },
    setBadges: (state, action) => {
      state.badges = action.payload;
    },
    setStatistics: (state, action) => {
        state.statistics = action.payload;
    },
  },
});

export const {
  setLabs,
  setActiveLabs,
  setCompletedLabs,
  setBadges,
  setStatistics
} = labSlice.actions;

export default labSlice.reducer;
