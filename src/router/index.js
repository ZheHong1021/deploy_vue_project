import Vue from 'vue';
import VueRouter from 'vue-router';
import {checkAuthIsLoggedIn} from "@/router/utils"
import {loadView} from "@/router/utils/loadView"

Vue.use(VueRouter);


// 固定路由路徑
const routes = [
  { // 『/』導引到 『/f ({name: Home})』
    path: '/',
    redirect: (to) => ({ name: "Home" }),
    meta: {
      is_menu: false,
    }
  },
  {
    path: '/f',
    name: 'Home',
    component: loadView('Home'),
    meta: {
      is_menu: true,
      title: '首頁',
      icon: 'mdi-home',
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: loadView('Auth/Login'),
    meta: {
      is_menu: false,
    }
  },

  {
    path: '*',
    name: '404_NotFoundPage',
    component: loadView('Errors/ErrorView/404_NotFound'),
    meta: {
      is_menu: false,
    }
  }
];

// 解決重複點擊路由所報錯的BUG
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// 建立 Router(初始化設定)
const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 套用初始化設定 => 之後會變動
const router = createRouter()


router.beforeEach((to, from, next) => {

  // 檢查路由是否需要進行登入驗證
  if (checkAuthIsLoggedIn(to)) {
    next({name: 'Login'});
  }

  next()
})

// 重設路由
export function resetRouter() {
  const newRouter = createRouter(); // 變回初始化設定
  router.matcher = newRouter.matcher; // 重置路由匹配器
}


export default router;
