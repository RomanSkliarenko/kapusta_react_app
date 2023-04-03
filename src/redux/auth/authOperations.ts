import {createAsyncThunk} from '@reduxjs/toolkit';
import Notiflix from 'notiflix';
import {clearAuthHeader, setAuthHeader} from '../../services/instance';
import {getUserInfoApi, loginUserApi, logoutUserApi, registerUserApi} from '../../services/authService';
import {
  GetUserResponse,
  LoginUserData,
  LoginUserResponse,
  NotificationOptionsInterface,
  RegisterUserData,
  RegisterUserResponse
} from './authTypes';
import {RootState} from '../store';

const notlifixOptions:NotificationOptionsInterface = {
  failure: {
    position: 'right-top',
    distance: '80px',
    backOverlay: true,
    clickToClose: true,
    useIcon: true,
  },
  success: {
    position: 'right-top',
    distance: '80px',
    backOverlay: false,
    clickToClose: true,
    useIcon: true,
  },
};

export const signUpThunk = createAsyncThunk<RegisterUserResponse, RegisterUserData>(
  'auth/signUp',
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      Notiflix.Notify.success('signup is success', notlifixOptions.success);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
        return rejectWithValue(error.message);
      } else {
        Notiflix.Notify.failure('Unexpected error', notlifixOptions.failure);
        return rejectWithValue('Unexpected error');
      }
    }
  },
);

export const loginThunk = createAsyncThunk<LoginUserResponse, LoginUserData, { rejectValue: string }>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      setAuthHeader(res.accessToken);
      Notiflix.Notify.success('login is success', notlifixOptions.success);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
        return rejectWithValue(error.message);
      } else {
        Notiflix.Notify.failure('Unexpected error', notlifixOptions.failure);
        return rejectWithValue('Unexpected error');
      }
    }
  },
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (data, { rejectWithValue }) => {
    try {
      const res = await logoutUserApi();
      clearAuthHeader();
      Notiflix.Notify.success('logout is success', notlifixOptions.success);
      return res;
    } catch (error) {
      if (error instanceof Error) {
        Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
        return rejectWithValue(error.message);
      } else {
        Notiflix.Notify.failure('Unexpected error', notlifixOptions.failure);
        return rejectWithValue('Unexpected error');
      }
    }
  },
);

export const getUserThunk = createAsyncThunk<GetUserResponse>(
  'auth/getUser',
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.accessToken;
      if (!token) {
        return rejectWithValue('no token');
      }
      setAuthHeader(token);
      return await getUserInfoApi();
    } catch (error) {
      if (error instanceof Error) {
        Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
        return rejectWithValue(error.message);
      } else {
        Notiflix.Notify.failure('Unexpected error', notlifixOptions.failure);
        return rejectWithValue('Unexpected error');
      }
    }
  },
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (data, { rejectWithValue }) => {
    try {
      return null;
    } catch (error) {
      if (error instanceof Error) {
        Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
        return rejectWithValue(error.message);
      } else {
        Notiflix.Notify.failure('Unexpected error', notlifixOptions.failure);
        return rejectWithValue('Unexpected error');
      }
    }
  },
);

export const googleAuthThunk = createAsyncThunk(
  'auth/googleAuth',
  async (data, { rejectWithValue }) => {
    try {
      return data;
    } catch (error) {
      if (error instanceof Error) {
        Notiflix.Notify.failure(`${error.message}`, notlifixOptions.failure);
        return rejectWithValue(error.message);
      } else {
        Notiflix.Notify.failure('Unexpected error', notlifixOptions.failure);
        return rejectWithValue('Unexpected error');
      }
    }
  },
);