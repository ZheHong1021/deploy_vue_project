<template>
    <v-main class="main-container">
    
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      
    </v-main>
</template>

<script>
export default {
    name: "Main"
}
</script>

<style lang="scss" scoped>
    /* 所有 View的 container */
    .main-container{
        flex: 1;
        background-color: #f5f5f5;
    }
</style>