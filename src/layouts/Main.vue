<template>
    <v-main class="main-container">
      <v-container class="h-100" fluid>
        <!-- 標題 -->
        <Title />

        <!-- 內容 -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

      </v-container>
    </v-main>
</template>

<script>
import Title from '@/layouts/Title.vue'
export default {
    name: "Main",
    components: {
      Title,
    },
}
</script>

<style lang="scss" scoped>
    /* 所有 View的 container */
    .main-container{
        flex: 1;
        background-color: #f5f5f5;
    }
</style>