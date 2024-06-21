<template>
  <v-dialog v-model="dialog" fullscreen persistent @keydown.esc="closeDialog">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>新增數據</v-toolbar-title>
      </v-toolbar>

        <!-- 內容區域 -->
      <v-card-text>
        <slot name="body"></slot>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
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
    };
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit('input', val);
    }
  },
  mounted() {
    window.addEventListener('popstate', this.closeDialog);
  },
  beforeDestroy() {
    window.removeEventListener('popstate', this.closeDialog);
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
  }
};
</script>

<style scoped>
.v-dialog--fullscreen {
  max-height: 100%;
  max-width: 100%;
}
</style>
