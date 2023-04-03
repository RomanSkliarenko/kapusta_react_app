import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://kapusta-backend.goit.global/',
});

// Utility to add JWT
export const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
export const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = '';
};