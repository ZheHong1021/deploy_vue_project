// src/api/apiClient.js
import axios from 'axios';

const server = axios.create({
//   baseURL: 'https://api.example.com', // 替換成你的API根URL
  baseURL: 'http://127.0.0.1:8000/api', // 替換成你的API根URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

server.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

server.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    // 處理未授權錯誤
  }
  return Promise.reject(error);
});

export default server;