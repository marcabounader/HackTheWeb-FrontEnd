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
    setLabInactive: (state, action) => {
      const lab_id = action.payload;
      const labToDeactivate = state.labs.find((lab) => lab.id === lab_id);
      if (labToDeactivate) {
        labToDeactivate.isActive = false;
      }
    },
    setLabActive: (state, action) => {
      const lab_id = action.payload;
      const labToDeactivate = state.labs.find((lab) => lab.id === lab_id);
      if (labToDeactivate) {
        labToDeactivate.isActive = true;
      }
    },
    setLabComplete: (state, action) => {
      const lab_id = action.payload;
      const labToDeactivate = state.labs.find((lab) => lab.id === lab_id);
      if (labToDeactivate) {
        labToDeactivate.isComplete = true;
      }
    },
    addBadge: (state,action) => {
      state.badges = [...state.badges,action.payload];
    },
    incrementCompletedLabs: (state) => {
      state.statistics.completed_labs += 1;
    },
    incrementBadgeCount: (state) => {
      state.statistics.badges += 1;
    },
    incrementRewards: (state,action) => {
      state.statistics.rewards += action.payload;
    },
  },
});

export const {
  setLabs,
  setActiveLabs,
  setCompletedLabs,
  setBadges,
  setStatistics,
  setLabActive,
  setLabInactive,
  setLabComplete,
  incrementBadgeCount,
  incrementCompletedLabs,
  incrementRewards,
  addBadge
} = labSlice.actions;

export default labSlice.reducer;
