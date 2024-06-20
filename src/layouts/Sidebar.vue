<template>
  <!-- Drawer Component: 
    ● 行動端: temporary = true
  -->
  <v-navigation-drawer app touchless
      v-model="drawerState"
      color="white" 
      :temporary="is_mobile"
      @input="toggleNavigation">

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

                    <!-- intro -->
                    <v-list-item-content>
                        <!-- 使用者名稱 -->
                        <v-list-item-title class="font-weight-medium d-flex flex-wrap align-center" style="gap: 0.25rem;">
                            <!-- <h6 class="font-weight-black text-subtitle-1 text-lg-h6">{{name}}</h6> -->
                            <h6 class="font-weight-black text-subtitle-1 text-lg-h6">使用者</h6>
                        </v-list-item-title>

                        <!-- 角色 -->
                        <!-- <v-list-item-subtitle class="d-flex flex-wrap gap-2">
                          <v-chip small class="white--text" 
                            v-for="role, i in roles" :key="role"
                              :color="role === 'admin' 
                                  ? 'red darken-2' 
                                    : role === 'manager' 
                                      ? 'green lighten' 
                                      : 'blue'" 
                              >
                              {{ role_names ? role_names[i] : role }}
                          </v-chip>
                        </v-list-item-subtitle> -->
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider width="80%" class="mx-auto my-2"></v-divider>
          
            <!-- Router Link List -->
              <MenuItem
                  :routes="routes"
              />
         
          </div>

          
          <!-- Footer -->
          <div class="sidebar-header">
            <!-- 加條白線 -->

            <v-divider color="white"></v-divider>

            
            <!-- Footer(routes就在該組件中) -->
            <v-list nav shaped class="sidebar-footer">
                
                <!-- 登出 -->
                <v-list-item 
                    class="menu v-list-item" path
                    @click="logout">
                    <!-- 路由 Icon -->
                    <v-list-item-icon>
                        <v-icon class="menu-icon">
                        mdi-logout
                        </v-icon>
                    </v-list-item-icon>

                    <!-- 路由標題 -->
                    <v-list-item-title class="menu-text">
                        登出
                    </v-list-item-title>
                </v-list-item>
            </v-list>
          </div>
      </div>

  </v-navigation-drawer>

   
</template>

<script>
import MenuItem from '@/layouts/Sidebar/MenuItem.vue';
import { RouteService } from '@/api/services'
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


    data: ()=>({
        drawerState: null, // 開關
        // routes: [], // 動態路由(vue-router)

        routes: [ /* 沒有 requireXXX: 代表該頁面只有 Admin才可以瀏覽 ； allowAll: true 代表所有使用者都可以瀏覽 */
            { name: "Home", path: '/f', meta: {is_menu: true, title: '首頁', icon: 'home'} },
            { name: "About", path: '/about', meta: {is_menu: true, title: '關於我們', icon: 'home'} },
            { name: "LoginView", path: '/login', meta: {is_menu: true, title: '登入', icon: 'home'} },
            { name: "ParentView", path: '/parent', meta: {is_menu: true, title: '子路由測試', icon: 'home'} ,
              children: [
                 { name: "Children1", path: '/parent/children-1', meta: {is_menu: true, title: '子路由1', icon: 'home'} },
                 { name: "Children2", path: '/parent/children-2', meta: {is_menu: true, title: '子路由2', icon: 'home'} },
                 { name: "Children3", path: '/parent/children-3', meta: {is_menu: true, title: '子路由3', icon: 'home'} },
              ],
            },
            { name: "WebSocket", path: '/web-socket', meta: {is_menu: true, title: 'WebSocket', icon: 'home'} },
        ],
      
        
    }),

    mounted(){
    //   this.routes = this.$router.options.routes // 讀取 Vue-Router所定義的路由列表
    },

    computed: {
 
    },

    watch: {
      drawer:{ // 監聽 props過來的 drawer(與 Navbar共用)
        handler(newVal){
          this.drawerState = newVal // 該 Component下繼承App.vue的 drawer，會互相影響
        }
      }
    },

    methods: {
      // 將該 Component針對 drawer影響的變化傳回 App.vue
        toggleNavigation(isDraw){ 
            this.$emit( "toggleNavigation", isDraw )
        },


        logout(){ // 登出

        },
       
    },

}
</script>

<style lang="scss" scoped>
    .header{
        position: relative;
    }


    // Before Hover
    .menu{
        transition: 0.3s ease-in-out;

        .menu-icon{
            color: grey;
        }

        .menu-text{
            color: black;
        }
    }

    // Active Menu + After Hover
    .active-menu{
        .menu-icon{
            background: #0575E6;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to bottom, #021B79, #0575E6);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to bottom, #021B79, #0575E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }
        .menu-text{
            background: #0575E6;  /* fallback for old browsers */
            background: -webkit-linear-gradient(to bottom, #021B79, #0575E6);  /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(to bottom, #021B79, #0575E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            font-weight: bolder;
        }

    }

    @media screen and (max-width: 650px) {
      .sidebar-footer{
        margin-bottom: 4rem;
      }
    }




</style>>
