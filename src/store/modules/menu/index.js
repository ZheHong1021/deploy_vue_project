import { MenuService } from '@/api/services'
import { generateRoutes } from '@/router/utils';
import router, { resetRouter } from "@/router"

// 將vue-router的路由轉成能讓Sidebar讀取
const transformRouterToSidebar = (route) => {
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
                          .map(menu => transformRouterToSidebar(menu))

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

      await generateRoutes()
      
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
          // is_menu: true, // 必須為菜單
          is_disabled: false, // 必須是起用中
        })
        const response = await MenuService.get_all(params)
        if(response.status === 200){
          const menus = response.data
          
          // 設定路由到store中
          commit("setMenus", menus)

          // 添加進去前，先清除一次
          // 不用await，因為不需要等待
          resetRouter()
          
          // 請求完畢後 => 添加進前端路由
          await generateRoutes()
          
        }
      }
      catch(err){
        console.log(err);
      }
    },

    // 刪除菜單列
    async clearMenus({state, commit}, payload){
      // 清空菜單(只保留預設的菜單)
      await commit("setMenus", [])

      // 登出後清空路由
      resetRouter()
    }
   
  },

};
