import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

// 阻止啟動生產消息，常用作指令
Vue.config.productionTip = process.env.VUE_APP_ProductionTip || true

// 開啟 DevTools
Vue.config.devtools = process.env.VUE_APP_DevTools || false 


/* 【全域 Mixins】 */
import {globalMixins} from "@/mixins/globalMixins.js"
Vue.mixin(globalMixins)

// 【ScrollTo】
const VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);


// 【material-design-icon】
// npm install --save material-design-icons-iconfont
import 'material-design-icons-iconfont/dist/material-design-icons.css'



// import { loadView } from '@/router/loadview';
// import { RouteService } from '@/api/services'
// function processRoutes(routes) {
//   return routes.map(route => {
//     // 如果有子路由，遞歸處理
//     if (route.children && route.children.length > 0) {
//       route.children = processRoutes(route.children);
//     }

//     // 動態導入組件
//     return {
//       path: `/${route['path']}`,
//       name: route['name'],
//       component: loadView(route['component'])
//     };
//   });
// }

// async function getRoutes() {
//   try {
//     const params = new URLSearchParams({
//       is_children: false,
//     })
//     const response = await RouteService.getAll(params);
//     const routes = processRoutes(response.data);
//     // // 動態添加路由
//     // routes.forEach(route => {
//     //   router.addRoute(route);
//     // });


//   } catch (error) {
//     console.error('Failed to fetch routes:', error);
//   }
// }



// getRoutes().then(() => {
//     new Vue({
//       router,
//       store,
//       vuetify,
//       render: (h) => h(App),
//     }).$mount('#app');
    
//   })
  
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
