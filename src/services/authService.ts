import {axiosInstance} from './instance';

interface UserTypes {
  email: string,
  password: string
}

export const registerUserApi = async (user:UserTypes) => {
  const { data } = await axiosInstance.post('auth/register', user);
  return data;
};

export const loginUserApi = async (user:UserTypes) => {
  const { data } = await axiosInstance.post('auth/login', user);
  return data;
};

export const logoutUserApi = async () => {
  const { data } = await axiosInstance.post('auth/logout');
  return data;
};
export const refreshUserApi = async (sid:string) => {
  const { data } = await axiosInstance.post('auth/refresh', sid);
  return data;
};

export const getUserInfoApi = async () => {
  const { data } = await axiosInstance.get('user');
  return data;
};

export const registerGoogleApi = async () => {
  const { data } = await axiosInstance.get('auth/google');
  return data;
};