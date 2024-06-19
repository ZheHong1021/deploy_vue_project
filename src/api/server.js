// src/api/apiClient.js
import axios from 'axios';
import store from '@/store';

const server = axios.create({
  // baseURL: "/api",
  baseURL: process.env.VUE_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

server.interceptors.request.use(async (config) => {
  // 當前TOKEN(在 localStorage)
  let accessToken = localStorage.getItem('accessToken') || null;
  
  // 如果有 TOKEN => 需要去驗證
  if (accessToken) {
    await store.dispatch("auth/verifyAccessToken")

    // 可能會刷新 TOKEN，因此要重新捕捉
    accessToken = localStorage.getItem('accessToken')
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

server.interceptors.response.use(response => {
  return response;
}, error => {

  return Promise.reject(error);
});

export default server;