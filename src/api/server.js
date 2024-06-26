// src/api/apiClient.js
import axios from 'axios';
import store from '@/store';
import { errorHandler } from './errorHandler';

const server = axios.create({
  // baseURL: "/api",
  baseURL: process.env.VUE_APP_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});



import { jwtDecode } from "jwt-decode";

// JWT 檢查是否過期
function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (e) {
    return true;
  }
}


server.interceptors.request.use(async (config) => {
  // 當前TOKEN(在 localStorage)
  let accessToken = localStorage.getItem('accessToken') || null;
  
  // 如果有 TOKEN => 需要去驗證
  if (accessToken) {
    // 驗證該 accessToken是否過期
    if (isTokenExpired(accessToken)) {
      // 透過 VueX去檢查是否驗證成功
      await store.dispatch("auth/verifyAccessToken")

      // 可能會刷新 TOKEN，因此要重新捕捉
      accessToken = localStorage.getItem('accessToken')
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

server.interceptors.response.use(response => {
  return response;
}, (error) => {

  // 客製化錯誤
  errorHandler(error)

  return Promise.reject(error);
});

export default server;