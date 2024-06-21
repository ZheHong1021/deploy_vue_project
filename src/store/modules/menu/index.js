import { MenuService } from '@/api/services'
import { generateRoutes } from '@/router/utils';
import router, { resetRouter } from "@/router"

// 預設的前端路由
const CONST_ROUTES = router.options.routes
const CONST_MENU_ROUTES = CONST_ROUTES.filter(route => route['meta']['is_menu'])
console.log(CONST_MENU_ROUTES);

export default {
  namespaced: true,
  state: {
    // 菜單 (預設所需)
    menus: [], 
  },
  getters: {
  },
  mutations: {
    // 設定菜單列
    async setMenus(state, payload){
      state.menus = payload
      
      // 添加進去前，先清除一次
      await resetRouter()
      
      // 請求完畢後 => 添加進前端路由
      await generateRoutes()
    },
    
    // 刪除菜單列
    clearMenus(state, payload){
      state.menus = []

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
          
          // 設定路由到store中
          commit("setMenus", menus)

          // 將新路添加進去
          generateRoutes()
        }
      }
      catch(err){
        console.log(err);
      }
    },
   
  },

};