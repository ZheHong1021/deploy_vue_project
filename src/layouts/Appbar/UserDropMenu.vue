<template>
  <!-- (限定已經登入)使用者菜單 -->
  <v-menu v-model="menu" class="user-menu" :offset-y="true" bottom right>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" class="d-flex align-center">
        <div :class="get_menu_active_class" class="gap-1 font-weight-bold d-flex align-center">
          <!-- 使用者ICON -->
          <v-icon :color="get_menu_active_icon_color()">
            mdi-account-circle
          </v-icon>
          <!-- 使用者名稱 -->
          {{ fullname }}
        </div>

        <!-- 菜單 -->
        <v-icon :color="get_menu_active_icon_color()">
          {{ menu ? "mdi-menu-up" : "mdi-menu-down" }}
        </v-icon>
      </div>
    </template>

    <v-list-item-group color="primary" class="elevation-4">
      <!-- 使用者 -->
      <v-list-item v-for="(item, i) in items" :key="i" class="white" link :value="route_name === item['name']"
        :to="{ name: item['name'] }">
        <v-list-item-icon>
          <v-icon :color="route_name === item['name'] ? 'primary' : ''">
            {{ item.icon }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-title :class="route_name === item['name'] ? 'font-weight-bold' : ''">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>

      <v-divider color="white"></v-divider>

      <!-- 最下方 -->
      <template v-for="item in footer_items">
        <v-list-item :key="item['title']" @click="item['click_func']" class="white">
          <v-list-item-icon>
            <v-icon class="menu-icon">{{ item['icon'] }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item['title'] }}</v-list-item-title>
        </v-list-item>
      </template>

    </v-list-item-group>
  </v-menu>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "UserDropMenu",

  data() {
    return {
      menu: false,
      items: [
        // {name: 'UserRegister', title: '開通用戶', icon: 'mdi-account-plus-outline'},
        // {name: 'UserProfile', title: '使用者設定', icon: 'mdi-card-account-details'},
      ],
    };
  },

  mounted() { },

  computed: {
    ...mapState("user", {
      user: (state) => state.user,
    }),
    ...mapGetters("auth", ['isLoggedIn']),

    footer_items() { // 登入 / 登入 (透過是否登入判斷)
      return this.isLoggedIn
        ? [{ title: '登出', click_func: this.logout, icon: 'mdi-logout' }] // 已經登入 => 登出
        : [{ title: '登入', click_func: this.login, icon: 'mdi-login-variant' }] // 尚未登入 => 需要登入

    },

    // 取得用戶全名
    fullname() {
      return this.user?.fullname || "訪客";
    },

    // 取得當前路由名稱
    route_name() {
      return this.$route.name;
    },
  },

  methods: {
    // 前往登入
    login() {
      this.$router.push({ name: "Login" });
    },

    // 登出
    async logout() {
      this.$store.dispatch("auth/logout");
    },

    // 取得菜單樣式(是否active)
    get_menu_active_class() {
      return this.menu ? "primary--text" : "grey--text text--darken-2";
    },

    // 取得菜單ICON樣式(是否active)
    get_menu_active_icon_color() {
      return this.menu ? "primary" : "grey darken-2";
    },

    // 取得菜單路由樣式(是否active)
    get_menu_active_route_style(item) {
      return this.route_name === item['name'] ? 'primary' : '';
    },
  },
};
</script>

<style scoped>
.user-menu {
  z-index: 10;
}
</style>
