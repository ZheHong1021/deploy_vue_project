import store from "@/store";
import router from "@/router"

// 檢驗是否有登入
const checkAuthIsLoggedIn = (to) => {
    // [是否登入]: 不存在會返回 undefined
    const isLoggedIn = store.getters['auth/isLoggedIn']

    // 確認該route中的meta有無登入驗證的需求
    const metaIncludeRequireAuth = to.matched.some((route) => route['meta']['requireAuth'])

    // 如果需要驗證但沒登入 => true
    // 反之 => false
    return metaIncludeRequireAuth && !isLoggedIn
}


// 將API傳回的menu轉換成前端路由讀取模式
const transformRoute = (menu) => {
    const children =  menu['children'].map((children_menu) => transformRoute(children_menu))
    return {
        path: menu['path'],
        name: menu['name'],
        component: loadView(menu['component']),
        children: children,
        meta: {
            title: menu['title'],
            icon: menu['icon'],
            is_menu: menu['is_menu'],
        },
    }
}

// 檢查該路由名稱是否存在
const hasRoute = (name) => {
    // 當前前端路由的列表
    const routes = router.getRoutes()

    // 判斷該name是否已經存在
    return routes.some(route => route['name'] === name)
}


// 將後端API的路由添加至vue-router
const generateRoutes = () => {
    const menus = store.state.menu.menus
    
    for(const menu of menus){
        // 讀取路由的專屬名稱
        const { name } = menu 
        
        // 如果尚未存在 => 立即新增
        if(!hasRoute(name)){
            router.addRoute(transformRoute(menu))
        }
    }

}

// 用來載入 view的函式
const loadView = (view) => {
    return () => import(`@/views/${view}.vue`);
}


export {
    checkAuthIsLoggedIn,
    transformRoute,
    hasRoute,
    generateRoutes,
    loadView,
}