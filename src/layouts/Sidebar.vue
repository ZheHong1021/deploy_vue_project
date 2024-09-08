<template>
  <!-- Drawer Component: 
    ● 行動端: temporary = true
  -->
  <v-navigation-drawer
    app
    touchless
    v-model="drawerState"
    color="white"
    :temporary="is_mobile"
    @input="toggleNavigation"
  >
    <!-- 用於把 Footer Menu給隔開 -->
    <div class="d-flex flex-column justify-space-between fill-height">
      <!-- Header + Router Link List -->
      <div class="sidebar-header">
        <!-- Header -->
        <v-list class="header">
          <v-list-item>
            <!-- avatar -->
            <v-list-item-avatar>
              <v-img :src="require('@/assets/images/logo.svg')"></v-img>
            </v-list-item-avatar>

            <!-- 用戶資訊 -->
            <v-list-item-content >
              <!-- 使用者名稱 -->
              <v-list-item-title
                class="font-weight-medium d-flex flex-wrap align-center"
                style="gap: 0.25rem"
              >
                <h6 class="font-weight-black text-subtitle-1 text-lg-h6">
                  {{ fullname }}
                </h6>
              </v-list-item-title>

              <!-- 角色 -->
              <v-list-item-subtitle class="d-flex flex-wrap gap-2">
                <v-chip small 
                  class="white--text" 
                  :color="!isLoggedIn || groups.includes('尚未分配') ? 'grey darken-2' : 'info'"
                  v-for="group in groups" :key="group">
                  {{ group }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>
        </v-list>

        <v-divider width="80%" class="mx-auto my-2"></v-divider>

        <!-- Router Link List -->
        <MenuItem
          :menus="filter_menus" />
      </div>

      <!-- Footer -->
      <div class="sidebar-header">
        <!-- 加條白線 -->

        <v-divider color="white"></v-divider>

        <!-- Footer(menus就在該組件中) -->
        <template v-for="menu in footer_menus">
          <v-list v-if="menu['ifShow']" :key="menu['title']"
            nav shaped class="sidebar-footer" 
          >
              <v-list-item
                class="menu v-list-item" path @click="menu['click']">
                  <!-- 路由 Icon -->
                  <v-list-item-icon>
                    <v-icon class="menu-icon"> {{ menu['icon'] }} </v-icon>
                  </v-list-item-icon>

                  <!-- 路由標題 -->
                  <v-list-item-title class="menu-text"> {{menu['title']}} </v-list-item-title>
              </v-list-item>
          </v-list>

        </template>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import MenuItem from "@/layouts/Sidebar/MenuItem.vue";
import { mapGetters, mapState } from 'vuex';
import { filterMenus } from "@/router/utils"
export default {
  name: "Sidebar",
  components: {
    MenuItem,
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    drawerState: null, // 開關
  }),

  mounted() {
  },

  computed: {
    ...mapGetters('auth', ['isLoggedIn']),
    ...mapState('menu', ['menus']),
    ...mapState('user', ['user']),

    // 取得用戶名稱
    fullname(){
      return this.user?.fullname || "訪客"
    },

    // 取得用戶擔任角色
    groups(){
      if(!this.isLoggedIn){
        return ['尚未登入']
      }
      const groups = this.user?.groups 
      return groups && groups.length > 0 
            ? groups.map(group => group.name_zh) 
            : ['尚未分配']
    },
    
    // 過濾只有is_menu=true
    filter_menus(){
      return filterMenus(this.menus)
    },
  
    // 底部 Menus
    footer_menus(){
      return [
        {title: "登出", icon: "mdi-logout", ifShow: this.isLoggedIn, click: this.logout},
        {title: "登入", icon: "mdi-login-variant", ifShow: !this.isLoggedIn, click: this.login},
      ]
    },

  },

  watch: {
    drawer: {
      // 監聽 props過來的 drawer(與 Navbar共用)
      handler(newVal) {
        this.drawerState = newVal; // 該 Component下繼承App.vue的 drawer，會互相影響
      },
    },
  },

  methods: {

    // 將該 Component針對 drawer影響的變化傳回 App.vue
    toggleNavigation(isDraw) {
      this.$emit("toggleNavigation", isDraw);
    },

    // 登出
    async logout() {
      this.$store.dispatch("auth/logout")
    },

    // 登入
    login(){
      this.$router.push({name: "Login"})
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
}

// Before Hover
.menu {
  transition: 0.3s ease-in-out;

  .menu-icon {
    color: grey;
  }

  .menu-text {
    color: black;
  }
}

// Active Menu + After Hover
.active-menu {
  .menu-icon {
    background: #0575e6; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to bottom,
      #021b79,
      #0575e6
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to bottom,
      #021b79,
      #0575e6
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .menu-text {
    background: #0575e6; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to bottom,
      #021b79,
      #0575e6
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to bottom,
      #021b79,
      #0575e6
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    font-weight: bolder;
  }
}

@media screen and (max-width: 650px) {
  .sidebar-footer {
    margin-bottom: 4rem;
  }
}
</style>