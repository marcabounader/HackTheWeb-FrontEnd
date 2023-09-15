import { createSlice } from '@reduxjs/toolkit';

const labSlice = createSlice({
  name: 'labs',
  initialState: {
    labs: [],
    activeLabs: [],
    completedLabs: [],
    badges: [],
    statistics: {},
    labCategories: [],
    labDifficulties: [],
    badgeCategories: []
  },
  reducers: {
    resetLabState: (state) => {
      state.labs = [];
      state.activeLabs = [];
      state.completedLabs = [];
      state.badges = [];
      state.statistics = {};  
    },
    setLabs: (state, action) => {
      state.labs = action.payload;
    },
    setActiveLabs: (state, action) => {
      state.activeLabs = action.payload;
    },
    setLabCategories: (state, action) => {
      state.labCategories = action.payload;
    },
    setBadgeCategories: (state, action) => {
      state.badgeCategories = action.payload;
    },
    setLabDifficulties: (state, action) => {
      state.labDifficulties = action.payload;
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
        delete labToDeactivate.active_lab;
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
    modifyLab: (state, action) => {
      const lab = action.payload;
      const labIndex = state.labs.findIndex((old_lab) => old_lab.id === lab.id);
    
      if (labIndex !== -1) {
        state.labs = [
          ...state.labs.slice(0, labIndex),
          lab,
          ...state.labs.slice(labIndex + 1),
        ];
      }
    },
    modifyBadge: (state, action) => {
      const badge = action.payload;
      const badgeIndex = state.badges.findIndex((old_badge) => old_badge.id === badge.id);
    
      if (badgeIndex !== -1) {
        state.badges = [
          ...state.badges.slice(0, badgeIndex),
          badge,
          ...state.badges.slice(badgeIndex + 1),
        ];
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
  addBadge,
  resetLabState,
  modifyLab,
  setLabCategories,
  setLabDifficulties,
  setBadgeCategories,
  modifyBadge
} = labSlice.actions;

export default labSlice.reducer;
