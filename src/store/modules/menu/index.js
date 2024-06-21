import { MenuService } from '@/api/services'
import { generateRoutes } from '@/router/utils';
import router, { resetRouter } from "@/router"

// 將vue-router的路由轉成能讓Sidebar讀取
const tranformRouterToSidebar = (route) => {
  return {
    name: route['name'],
    path: route['path'],
    component: route['component'],
    title: route['meta']['title'],
    icon: route['meta']['icon'],
    is_menu: route['meta']['is_menu'],
  }
}

// 預設的前端路由
const CONST_ROUTES = router.options.routes

// 只需要菜單路由
const CONST_MENU_ROUTES = CONST_ROUTES
                          .filter(route => route['meta']['is_menu'])
                          .map(menu => tranformRouterToSidebar(menu))

export default {
  namespaced: true,
  state: {
    // 菜單 (預設所需)
    menus: CONST_MENU_ROUTES, // 預設有CONST的菜單路由
  },
  getters: {
  },
  mutations: {
    // 設定菜單列
    async setMenus(state, payload){
      // 菜單路由
      state.menus = [...CONST_MENU_ROUTES, ...payload]
      
      // 添加進去前，先清除一次
      await resetRouter()
      
      // 請求完畢後 => 添加進前端路由
      await generateRoutes()
    },
    
    // 刪除菜單列
    clearMenus(state, payload){
      // 重新定義
      state.menus = CONST_MENU_ROUTES

      // 登出後清空路由
      resetRouter()
    },
   
  },
  actions: {
    // 取得菜單
    async getMenus({state, commit, dispatch}, payload){
      try{
        const params = new URLSearchParams({
          is_children: false, // 不是子路由
          no_page: true, // 不要分頁
          include_children: true, // 包含children
          is_menu: true, // 必須為菜單
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
