import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getUserThunk, googleAuthThunk, loginThunk, logoutThunk, refreshThunk, signUpThunk} from './authOperations';
import {AuthInitialStateType} from './authTypes';

const initialState:AuthInitialStateType = {
  isLoading: false,
  isLogin: false,
  error: null,
  userEmail: null,
  userSid: null,
  accessToken: null,
  refreshToken: null,
  transactions: null,
  balance: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    // signUp
    addCase(signUpThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(signUpThunk.fulfilled, (state) => {
      state.error = null;
    });
    addCase(signUpThunk.rejected, (state, { payload }: PayloadAction<any>) => {
      state.error = payload;
      state.isLoading = false;
    });
    // login
    addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.userSid = payload.sid;
      state.userEmail = payload.userData.email;
      state.transactions = payload.userData.transactions;
      state.isLoading = false;
      state.isLogin = true;
      state.error = null;
    });
    addCase(loginThunk.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    // logout
    addCase(logoutThunk.pending, (state) => {
      state.isLoading = true;
    });
    addCase(logoutThunk.fulfilled, (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.userSid = null;
      state.userEmail = null;
      state.transactions = null;
      state.isLoading = false;
      state.isLogin = false;
      state.error = null;
    });
    addCase(logoutThunk.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    // refresh
    addCase(refreshThunk.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    addCase(refreshThunk.fulfilled, (state, { payload }) => {
      state.error = null;
    });
    addCase(refreshThunk.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    // get User
    addCase(getUserThunk.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    addCase(getUserThunk.fulfilled, (state, { payload }) => {
      state.userEmail = payload.email;
      state.isLogin = true;
      state.isLoading = false;
      state.transactions = payload.transactions;
      state.balance = payload.balance;
      state.error = null;

    });
    addCase(getUserThunk.rejected, (state,action: PayloadAction<any>) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    // google auth
    addCase(googleAuthThunk.fulfilled, (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload.accessToken;
      state.userSid = action.payload.sid;
      state.refreshToken = action.payload.refreshToken;
      state.userEmail = null;
      state.transactions = null;
      state.isLoading = false;
      state.isLogin = false;
      state.error = null;
    });
  },
});

export const authReducer = authSlice.reducer;
