import router from "@/router"
import store from "@/store"
import { loadView } from '@/router/utils/loadview';

// 將API傳回的menu轉換成前端路由讀取模式
function transformRoute(menu){
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


// 用來載入 view的函式
export function generateRoutes() {
    const menus = store.state.menu.menus
    
    for(const menu of menus){
        // 當前前端路由的列表
        const routes = router.getRoutes()

        // 讀取路由的專屬名稱
        const { name } = menu 

        // 判斷該name是否已經存在
        const is_exist = routes.some(route => route['name'] === name)
        
        // 如果尚未存在 => 立即新增
        if(!is_exist){
            router.addRoute(transformRoute(menu))
        }
    }

}