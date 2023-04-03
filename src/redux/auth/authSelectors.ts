import {RootState} from '../store';

export const getIsLoading = (state: RootState): boolean => state.auth.isLoading;
export const getIsLogin = (state: RootState): boolean => state.auth.isLogin;
export const getError = (state: RootState): string | null => state.auth.error;
export const getAccessToken = (state: RootState): string | null => state.auth.accessToken;
export const getUserEmail = (state: RootState): string | null => state.auth.userEmail;
export const getUserBalance = (state: RootState): number | null => state.auth.balance;
