<template>

  <v-dialog 
    v-model="dialog"
    :width="dialogWidth"
    persistent>

    <v-card>
      <!-- 頂部區域 -->
      <v-toolbar dark color="primary">
        <!-- 關閉按鈕 -->
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close-thick</v-icon>
        </v-btn>

        <!-- 標題 -->
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>

        <!-- 內容區域 -->
      <v-card-text class="py-4 black--text">

        <slot name="body"></slot>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {

    value: { // Parent提供的Dialog
      type: Boolean,
      default: false,
    },
    color: { // title背景顏色
        type: String,
        default: "primary",
    },
    title: { // title標題名稱
        type: String,
        default: "開啟"
    }
  },
  data() {
    return {
      dialog: false,

      originPath: null,
    };
  },

  computed:{
    dialogWidth(){
      const { rwd_name } = this
      const width = {
        'xs': '95%',
        'sm': '80%',
        'md': '70%',
        'lg': '60%',
        'xl': '50%',
      }

      return width[rwd_name]
    }
  },
  
  watch: {
    // Parent有trigger時
    value(val) {
      this.dialog = val;

      if(val){ // 打開時
        // 原始頁面的Path
        this.originPath = window.location.hash

        // Path改為 #dialog
        history.pushState(
          {dialogOpen: true }, // stateObj
          '', // title
          `${this.originPath}#dialog` // [, url]
        );

        // 監聽觸發上下頁時
        window.addEventListener('popstate', this.handlePopState);
      }
      else{ // 關閉時
        window.removeEventListener('popstate', this.handlePopState);
      }

    },

    // 如果有進行關閉 => 會回傳給 Parent做同步
    dialog(val) {
      this.$emit('input', val); // 通常都是關閉
    }
  },

  mounted() {

    // 如果之前有重新整理 => #dialog(還會存在) => 但這樣會累積超多#dialog#dialog
    if (window.location.hash === '#dialog') {
      // 要刪除
      this.restoreOriginalHash();
    }
  },

  beforeDestroy() { // 離開時也會關閉
    window.removeEventListener('popstate', this.handlePopState);
  },

  methods: {
    // 關閉Dialog
    closeDialog() {
      this.dialog = false; // 關閉
      history.back(); // 調用後則會回到正常的URL
    },


    // 處理返回按鈕事件
    handlePopState(event) {
      // 判斷hash是否有 #dialog
      if (window.location.hash === '#dialog') {
        this.dialog = true; // 有 #hash: 代表開啟Dialog中
      } 
      else {
        this.dialog = false;
      }
    },


    // 回復最一開始的樣子
    restoreOriginalHash() {
      const { pathname, search } = window.location
      // pathname: /f
      // search: ?record_date=2024-06-06
      const url = pathname + search

      // 恢復
      history.replaceState(null, '', url);
    }
   

  }
};
</script>

<style scoped>


</style>
