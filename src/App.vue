<template>
  <v-app >

    <!-- 要先登入才能使用 -->
    <Sidebar :drawer="drawer" 
      @toggleNavigation="toggleNavigation"
    />
    
    <!-- 頂端 -->
    <Appbar@toggleDrawer="drawer = !drawer"/>
    
    <!-- 主體內容 -->
    <Main />

    <!-- 當頁面往下滾動到一定高度，會自動彈跳出回頂部的按鈕 -->
    <goTopButton />

    <!-- 表頭 -->
    <Footer  />
  </v-app>
</template>

<script>
import Appbar from '@/layouts/Appbar';
import Sidebar from '@/layouts/Sidebar';
import Main from '@/layouts/Main';
import Footer from '@/layouts/Footer';
import goTopButton from '@/layouts/goTopButton';
export default {
  name: 'App',
  components: { 
    Appbar, 
    Sidebar, 
    Main,
    Footer, 
    goTopButton,
  },
  
  data(){
    return {
      drawer: false, // 開關
    }
  },


  async mounted(){
  },

  methods:{

    // 透過 appBar調整 Sidebar的漢堡選單
    toggleNavigation(bool){
      this.drawer = bool
    },

  },

};
</script>


<style lang="scss">
  @import url('assets/scss/styles.scss');

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
  }

  body{
    font-size: 100%;
    overflow-y: initial;
  }

  a{
    list-style: none;
    text-decoration:none;
  }


  



/* // 【Sidebar】
  //  預設 icon顏色為 black，但背景顏色為深色會看不見
  .v-list-group__header__append-icon .v-icon{
    color: white;
  } */

  /* // v-list-group會有 margin-bottom: 8px的情況。 (很不美觀) */
  .v-list--nav .v-list-item:not(:last-child):not(:only-child){
      margin-bottom: 0px !important;
  }



</style>