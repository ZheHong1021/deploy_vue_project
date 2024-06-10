<template>
  <v-app >

    <!-- 要先登入才能使用 -->
    <Sidebar :drawer="drawer" 
      @toggleNavigation="toggleNavigation"
    />
    
    <!-- 頂端 -->
    <Appbar
      @toggleDrawer="drawer = !drawer"
    />
    
    <!-- Main -->
    <v-main>
    
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>

      <!-- 回頂部的按鈕: 只要頁面往下滑動則會浮出按鈕(手機板不要有 tooltip效果) -->
      <v-tooltip 
        top color="blue-grey darken-4"
        :disabled = "is_mobile">
        <template v-slot:activator="{ on, attrs }">
            <div v-scroll-to="{ el: '#app', offset: -65}" 
                class="goTop d-flex justify-center align-center"
                :class="isTop ? 'goTopAfter' : ''" 
                v-bind="attrs"
                v-on="on">
                <v-icon color="white">mdi-arrow-up</v-icon>
            </div>
        </template>
          <span>回頂部</span>
      </v-tooltip>
      
      <Footer  />
    </v-main>

  </v-app>
</template>

<script>
import Appbar from '@/layouts/Appbar';
import Sidebar from '@/layouts/Sidebar';
import Footer from '@/layouts/Footer';
export default {
  name: 'App',
  components: { 
    Appbar, 
    Sidebar, 
    Footer, 
  },
  
  data(){
    return {
      scrollNum: 0, //滾動距離
      isTop: false, //是否顯示回到頂部按鈕

      drawer: this.is_mobile ? true : false,
    }
  },


  async mounted(){
    // scroll btn 出現(只要移動高度超過 200)
    /* https://iter01.com/548137.html */
      window.addEventListener("scroll", this.scrollToTop);

      console.log(this.$router);

  },
  methods:{
    toggleNavigation(bool){
      this.drawer = bool
    },

    scrollToTop(){
       let top =
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              window.pageYOffset;
          this.scrollNum = top;
          if (top >= 200) {
              this.isTop = true;
          } else {
              this.isTop = false;
          }
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

  .app-container{
    background-color: #eee;
    min-height: 400px;
  }

  /* 所有 View的 container */
  .main-container{
    flex: 1;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 15vh);
  }


  



/* 回頂部按鈕樣式設計 */
.goTop {
  position: fixed;
  bottom: -200px;
  right: 5%;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  z-index: 10;
  background-color: #57606f;
  transition: 0.3s ease-in-out;
  font-size: 30px;
  text-align: center;
  line-height: 60px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}

.goTop:hover {
  background-color: #2c3e50;
  transition: 0.3s ease-in-out;
}
.goTopAfter {
  transition: 0.3s ease-in-out;
  // bottom: 10px;
  bottom: 1%;
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




/* 手機介面下，下面一點 */
@media screen and (max-width: 577px) {
  .goTop{
    width: 50px;
    height: 50px;
    font-size: 12px;
  }

  .goTopAfter {
    bottom: 2.5%;
  }
}


</style>