import axios from "axios";
// 這邊不使用 server.js
const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  });
  

const login = (data) => http.post("token/", data)

const verify_token = (access_token) => http.post("token/verify/", {
    token: access_token
})
const refresh_token =  (refresh_token) => http.post("token/refresh/", {
    refresh: refresh_token
})

export default {
    login,
    verify_token,
    refresh_token,
}