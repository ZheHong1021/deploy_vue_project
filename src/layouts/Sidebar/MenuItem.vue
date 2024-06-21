<template>
    <!-- Router Link List -->
    <v-list nav class="my-0 py-0">
        <div v-for="menu in menus" :key="menu['name']" class="py-0 my-0">

            <!-- 沒有子路由 -->
            <v-list-item v-if="!has_children_menu(menu)" 
                class="menu v-list-item my-1" link
                :dense="depth > 0"
                :to="{name: menu['name']}"
                active-class="active-menu"
                :class="{'d-flex flex-row-reverse pl-10': depth > 0}">

                <!-- 路由 Icon -->
                <v-list-item-icon v-if="depth === 0 || !menu['children']">
                    <v-icon class="menu-icon">
                      {{ menu['icon'] }}
                    </v-icon>
                </v-list-item-icon>

                <!-- 路由標題 -->
                  <v-list-item-title class="menu-text"
                    :style="`font-size: ${depthFontSize};`">
                    {{ menu['title'] }}
                  </v-list-item-title>
            </v-list-item>

            <!-- 有子路由處理 -->
            <v-list-group v-else no-action 
                class="my-2"
                :prepend-icon="menu['icon']" 
                :key="menu['name']"
                :value="isGroupActive(menu)">
                <template v-slot:activator>
                    <v-list-item class="menu v-list-item menu-group px-0"
                        :class="{'pl-8': depth > 0}">
                        
                        <v-list-item-content>
                            <!-- 路由標題 -->
                            <v-list-item-title class="menu-text"
                                :style="`font-size: ${depthFontSize};`">
                                {{ menu['title'] }} 
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                
                <!-- 子路由列表 => 重新呼叫該 Component進行 => 實現遞迴效果 -->
                <!-- Recursive Route List -->
                <menu-item
                    v-if="has_children_menu(menu)"
                    :menus="menu['children']"
                    :depth="depth + 1"
                />
            </v-list-group>

        </div>
    </v-list>
</template>

<script>
export default {
    name: "MenuItem",
    props: {
        menus: { // 路由列表
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
    },
    computed: {
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
       isGroupActive(menu){ // 判斷該 Group是否為 active
            return menu['children'].some(
                item => 
                    this.$route.path.startsWith(item['path']) // 第一層
                || (item['children'] && this.isGroupActive(item)) // 第二層(遞迴): 如果下方還有 children
            )
       },

        // 判斷是否該路由有 children
       has_children_menu(menu){
        return menu['children'] && menu['children'].length > 0
       },
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