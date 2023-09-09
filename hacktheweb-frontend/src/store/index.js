import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import labReducer from '../slices/labSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    labs: labReducer,
  },
});

export default store;
