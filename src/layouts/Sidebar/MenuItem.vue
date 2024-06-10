<template>
    <!-- Router Link List -->
    <v-list nav class="my-0 py-0">
        <div v-for="route in filterRoutes" :key="route['name']" class="py-0 my-0">

            <!-- 沒有子路由 -->
            <v-list-item v-if="!route.children" 
                class="menu v-list-item my-1" link
                :dense="depth > 0"
                :to="{name: route['name']}"
                active-class="active-menu"
                :class="{'d-flex flex-row-reverse pl-10': depth > 0}">

                <!-- 路由 Icon -->
                <v-list-item-icon v-if="depth === 0 || !route.children">
                    <v-icon class="menu-icon">
                      {{ route['meta']['icon'] }}
                    </v-icon>
                </v-list-item-icon>

                <!-- 路由標題 -->
                  <v-list-item-title class="menu-text"
                    :style="`font-size: ${depthFontSize};`">
                    {{ route['meta']['title'] }}
                  </v-list-item-title>
            </v-list-item>

            <!-- 有子路由處理 -->
            <v-list-group class="my-2"
                v-else no-action 
                :prepend-icon="route['meta']['icon']" 
                :key="route['name']"
                :value="isGroupActive(route)">
                <template v-slot:activator>
                    <v-list-item class="menu v-list-item menu-group px-0"
                        :class="{'pl-8': depth > 0}">
                        
                        <v-list-item-content>
                            <!-- 路由標題 -->
                            <v-list-item-title class="menu-text"
                                :style="`font-size: ${depthFontSize};`">
                                {{ route['meta']['title'] }} 
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                
                <!-- 子路由列表 => 重新呼叫該 Component進行 => 實現遞迴效果 -->
                <!-- Recursive Route List -->
                <menu-item
                    :routes="route.children"
                    :depth="depth + 1"
                />
            </v-list-group>

        </div>
    </v-list>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name: "MenuItem",
    props: {
        routes: { // 路由列表
            type: Array,
            default: () => []
        },

        depth: { // 子路由的深度
            type: Number,
            default: 0
        },
    },
    data: ()=>({

    }),

    mounted(){
        // console.log(this.$route.path);
    },
    computed: {

        filterRoutes(){ // 篩選匯入進來的路由是否符合菜單條件
            // is_menu: 用於菜單使用
            // roles: 該頁面用戶角色是否能瀏覽(如果 router的 meta有 roles的話才需要比較)
            let filterRoutes  = []
            if(this.roles){ // 多個角色
                filterRoutes = this.routes.filter((route) => 
                    route['meta'] && route['meta']['is_menu'] 
                    // && (!route['meta']['roles'] || route['meta']['roles'].some(role => this.roles.includes(role))) // 如果沒有 roles或 當前role in roles中
                )
            }else{ // 單一角色
                filterRoutes = this.routes.filter((route) => 
                    route['meta'] && route['meta']['is_menu']
                    // && (!route['meta']['roles'] || route['meta']['roles'].includes(this.role)) // 如果沒有 roles或 當前role in roles中
                )
            }
            return filterRoutes
        },

        depthFontSize(){
            const { depth } = this
            const map_depth_size = {
                0: '1rem',
                1: '0.8rem',
                2: '0.8rem',
            }
            return map_depth_size[depth]
        },
    },

    methods: {
       isGroupActive(route){ // 判斷該 Group是否為 active

            return route['children'].some(
                item => 
                    this.$route.path.startsWith(item['path']) // 第一層
                || (item['children'] && this.isGroupActive(item)) // 第二層(遞迴): 如果下方還有 children
            )
       }
    },
    
}
</script>


<style lang="scss" scoped>

    // Before Hover
    .menu{
        transition: 0.3s ease-in-out;

        .menu-text{
            color: black;
        }
        .menu-icon{
            color: grey;
        }
    }

    // Active Menu + After Hover
    .active-menu{
        font-weight: bolder;
        background: #0575E6;  /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #021B79, #0575E6);  /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #021B79, #0575E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

        .menu-text{
            color: white;
        }

        .menu-icon{
            color: white;
        }
    }


</style>