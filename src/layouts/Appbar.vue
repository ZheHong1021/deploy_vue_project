<template>
  <v-app-bar app :color="darkMode ? '#333' : 'white'">
        <!-- 三條線 -->
        <v-app-bar-nav-icon @click="$emit('toggleDrawer')"></v-app-bar-nav-icon>

        <!-- 標題 -->
        <v-toolbar-title class="logo-title font-weight-bold d-flex align-center">
            <img class="mr-2" width="35" height="35" 
                :src="require(`@/assets/images/logo.svg`)" alt=""
            >
            
            {{ title }}
        </v-toolbar-title>

        <v-spacer></v-spacer>


        <!-- 使用者下拉選單 -->
         <div class="d-flex">
             <UserDropMenu />
         </div>
    </v-app-bar>
</template>

<script>
import UserDropMenu from './Appbar/UserDropMenu.vue';

export default {
    name: 'Appbar',
    components: {
        UserDropMenu
    },  
    data(){
        return {
            title: process.env.VUE_APP_TITLE,
            darkMode: false, // sunshine 、 night
        }
    },

    mounted(){
    },

    computed:{
    },

    methods: {
   
    }
}
</script>

<style>

</style>