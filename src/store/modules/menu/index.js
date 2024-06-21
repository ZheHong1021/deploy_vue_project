import { MenuService } from '@/api/services'
import { generateRoutes } from '@/router/utils/generateRoutes';
import { resetRouter } from '@/router';

export default {
  namespaced: true,
  state: {
    // 菜單 (預設所需)
    menus: JSON.parse(localStorage.getItem("menus")) || [], 
  },
  getters: {
  },
  mutations: {
    // 設定菜單列
    async setMenus(state, payload){
      state.menus = payload
      localStorage.setItem("menus", JSON.stringify(payload))
      
      // 請求完畢後 => 添加進前端路由
      await resetRouter()
      await generateRoutes()
    },
    
    // 刪除菜單列
    clearMenus(state, payload){
      state.menus = []
      localStorage.removeItem("menus")

      // 登出後清空路由
      resetRouter()
    },
   
  },
  actions: {
    // 取得菜單
    async getMenus({state, commit, dispatch}, payload){
      try{
        const params = new URLSearchParams({
          is_children: false,
        })
        const response = await MenuService.getAll(params)
        if(response.status === 200){
          const menus = response.data
          commit("setMenus", menus)
          generateRoutes()
        }
      }
      catch(err){
        console.log(err);
      }
    },
   
  },

};
