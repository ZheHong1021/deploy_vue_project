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


//#region (sweetalert2)
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
//#endregion


async function initApp() {
  // 當前用戶是否登入
  const isLoggedIn = store.getters['auth/isLoggedIn'];
  
  if (isLoggedIn){
    // 登入後要向後端請求相對應的菜單列
      await store.dispatch("menu/getMenus")
  }

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount('#app');
}

initApp();