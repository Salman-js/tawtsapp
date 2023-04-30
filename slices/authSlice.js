import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = true;
    },
    setLoadingFalse: (state, action) => {
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
    },
    setLogout: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setLoadingFalse,
  setUser,
  setAuthenticated,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;
