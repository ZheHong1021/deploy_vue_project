import { apiAuthToken } from "@/api/services";
import Swal from 'sweetalert2';
import router from "@/router";
export default {
  namespaced: true,
  state: {
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
  },
  getters: {
    isLoggedIn: state => !!state.accessToken,
  },
  mutations: {

    setAccessToken(state, payload){
      state.accessToken = payload
      localStorage.setItem("accessToken", payload)
    },
    setRefreshToken(state, payload){
      state.refreshToken = payload
      localStorage.setItem("refreshToken", payload)
    },

    // 清除所有TOKEN (意味著登出)
    clearToken(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  },
  actions: {
    // 刷新 TOKEN
    async refreshToken({state, commit}, payload){
      try{
        const response = await apiAuthToken.refresh_token(state.refreshToken)
        if(response.status === 200){
          const new_access_token = response.data['access']
          commit('setAccessToken', new_access_token)
        }
      }
      catch(err){
        // 如果失敗代表Refresh Token過期了，無法再進行更新(必須重新登入)
        const swal = await Swal.fire({
            title: "權限過期", 
            icon: "error",
            confirmButtonText: "重新登入",
            allowOutsideClick: false,
            allowEscapeKey: false,
        })

        if (swal.isConfirmed){
          // 清除Token
          commit("clearToken")

          // 導引到登入頁面
          router.push({name: "Login"})
        }
      }
    },

    // 驗證 ACCESS TOKEN
    async verifyAccessToken({state, dispatch}, payload){
      try{
        const response = await apiAuthToken.verify_token(state.accessToken)
        if(response.status === 200){
          // console.log(response.data);
        }
      }
      catch(err){
        await dispatch("refreshToken")
        console.log(err);
      }
    },
    
    // 登入
    async login({commit}, payload){
      try{
        const response = await apiAuthToken.login(payload)
        if(response.status === 200){
          Swal.fire("登入成功", "", "success")

          // 將數據傳入到 VueX當中
          const { data: {access, refresh} } = response
          commit("setAccessToken", access)
          commit("setRefreshToken", refresh)

          // 成功登入後導引到首頁
          router.push({name: "Home"})
        }
        else{
          Swal.fire("登入失敗", "發生非200狀態碼", "error")
        }
      }
      catch(err){
        Swal.fire("登入失敗", err, "error")
      }

    },
  },

};
