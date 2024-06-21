import Vue from 'vue';
import Vuex from 'vuex';
import auth from "@/store/modules/auth"
import menu from "@/store/modules/menu"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: auth,
    menu: menu,
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },

});
