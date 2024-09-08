import { UserService } from '@/api/services'


export default {
  namespaced: true,
  state: {
    user: {}, // 當前使用者資訊
  },
  getters: {
  },
  mutations: {
    // 設定
    async setUser(state, payload){
      state.user = payload
    },
  
   
  },
  actions: {
    // 取得當前使用者資訊
    async getUser({state, commit, dispatch}, payload){
      try{
        const params = new URLSearchParams()
        const response = await UserService.get_current_user(params)
        if(response.status === 200){
          const response_data = response.data
          commit("setUser", response_data)
        }
      }
      catch(err){
        console.log(err);
      }
    },

    
    // 清除使用者資訊(基本上是登出)
    clearUser({state, commit}, payload){
      commit("setUser", {})
    } 
  },


};
