import Vue from 'vue';
import VueRouter from 'vue-router';
import ParentRoutes  from '@/router/ParentRoutes'
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
    component: loadView('HomeView'),
  },
  {
    path: '/about',
    name: 'About',
    component: loadView('AboutView'),
  },
  {
    path: '/login',
    name: 'LoginView',
    component: loadView('LoginView'),
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

export default router;
