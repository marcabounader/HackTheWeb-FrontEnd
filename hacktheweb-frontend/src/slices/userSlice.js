import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_id: null,
    token: null,
    name: null,
    type_id: null,
    rank: null,
  },
  reducers: {
    loginUser: (state, action) => {
        state.user_id = action.payload.user_id;
        state.token = action.payload.token;
        state.name = action.payload.name;
        state.type_id = action.payload.type_id;
        state.rank = action.payload.rank;
    },
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
