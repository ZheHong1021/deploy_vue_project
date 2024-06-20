<template>
  <!-- 回頂部的按鈕: 只要頁面往下滑動則會浮出按鈕(手機板不要有 tooltip效果) -->
  <v-tooltip top 
    :color="tooltip_color" 
    :disabled="is_mobile">
    <template v-slot:activator="{ on, attrs }">

    <!-- 當滾動到一定程度，開啟顯示() -->
      <v-btn fab @click="scrollToTop"
        :color="btn_color"
        class="go-top-button" 
        :class="{'show-go-top-button': isTop}"
        v-bind="attrs" v-on="on"
      > 
      <!-- 按鈕顯示圖案 -->
        <v-icon color="white">
            {{ icon }}
        </v-icon>
      </v-btn>
    </template>

    <!-- 顯示文字 -->
    <span>{{ tooltip_text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "goTopButton",
data(){
    return {
        scrollNum: 0, // 當前往下滾動的距離
        isTop: false, // 是否顯示回到頂部按鈕
        trigger_top: 200, // 觸動顯示回頂部按鈕的高度

        //#region (按鈕樣式)
        btn_color: "#57606f",
        icon: "mdi-arrow-up",
        //#endregion

        //#region (tooltip樣式)
        tooltip_color: "blue-grey darken-4",
        tooltip_text: "回頂部",
        //#endregion

    }
  },


  async mounted(){
    // scroll btn 出現(只要移動高度超過 200)
    /* https://iter01.com/548137.html */
      window.addEventListener("scroll", this.ListenDisplayTopButton);

  },
  methods:{
    // 監聽是否需要顯示回頂部按鈕
    ListenDisplayTopButton(){
        // 捕捉當前滾動距離
        let top =
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                window.pageYOffset;
        // 記錄下來
        this.scrollNum = top;

        // 判斷是否需要顯示頂部按鈕
        this.isTop = top >= this.trigger_top
    },

    scrollToTop(){
        this.$scrollTo({
            el: '#app',
            offset: -65,
        })    
    }

  },

};
</script>


<style lang="scss">


/* 回頂部按鈕樣式設計 */
.go-top-button {
  position: fixed;
  z-index: 10;
  transition: 0.3s ease-in-out;
  bottom: -200px;
  right: 5%;
}

/* 允許出現回頂部按鈕 */
.show-go-top-button {
  transition: 0.3s ease-in-out;
  bottom: 1%;
}



/* 手機介面下，下面一點 */
@media screen and (max-width: 577px) {
  .show-go-top-button {
    bottom: 2.5%;
  }
}


</style>