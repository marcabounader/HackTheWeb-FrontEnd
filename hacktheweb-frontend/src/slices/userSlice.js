import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_id: null,
    token: null,
    name: null,
    type_id: null,
    profile_url: null
  },
  reducers: {
    loginUser: (state, action) => {
        state.user_id = action.payload.user_id;
        state.token = action.payload.token;
        state.name = action.payload.name;
        state.type_id = action.payload.type_id;
        state.profile_url = action.payload.profile_url;
    },
    updateUser: (state, action) => {
      const { attributeName, attributeValue } = action.payload;
      if (state.hasOwnProperty(attributeName)) {
        state[attributeName] = attributeValue;
      } else {
        console.error(`Attribute '${attributeName}' does not exist in the user state.`);
      }
    },
    resetUserState: (state) => {
      state.user_id = null;
      state.token = null;
      state.name = null;
      state.type_id = null;
      state.profile_url = null;
    },
   
    
  },
});

export const { loginUser,updateUser,resetUserState } = userSlice.actions;
export default userSlice.reducer;
