import Vue from 'vue';
import VueRouter from 'vue-router';
import ParentRoutes  from '@/router/ParentRoutes'
import {checkAuthIsLoggedIn} from "@/router/utils"
import { loadView } from '@/router/loadview';
import { RouteService } from '@/api/services'

Vue.use(VueRouter);



const routes = [
  { // 『/』導引到 『/f ({name: Home})』
    path: '/',
    redirect: (to) => ({ name: "Home" }),
  },
  {
    path: '/f',
    name: 'Home',
    component: loadView('Home'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: loadView('Dashboard'),
    meta: {
      requireAuth: true, // 必須登入才可以進入
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: loadView('Auth/Login'),
  },
  {
    path: '/web-socket',
    name: 'WebSocket',
    component: loadView('WebSocket'),
  },

  ...ParentRoutes,
];




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {

  // 檢查路由是否需要進行登入驗證
  if (checkAuthIsLoggedIn(to)) {
    next({name: 'Login'});
  }

  next()
})


export default router;
