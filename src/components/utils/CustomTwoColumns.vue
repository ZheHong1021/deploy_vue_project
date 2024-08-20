<template>
  <v-row class="d-flex align-stretch">
    <!-- Left -->
    <v-col :cols="leftCols">
      <v-card
        outlined
        class="elevation-2 fill-height"
        :style="cardStyles"
      >
        <!-- Header -->
        <v-card-title
          class="font-weight-bold white--text text-subtitle-1 text-lg-h6"
          :class="leftHeaderColor"
        >
          <div class="d-flex flex-wrap gap-2 w-100">
            <!-- 標題 -->
            {{ leftHeaderTitle }}

            <!-- Left Header Append -->
            <v-spacer></v-spacer>
            <slot name="left-header-append"></slot>
          </div>
        </v-card-title>

        <!-- Body -->
        <v-card-text class="black--text py-4"
            :class="{ 'scrollable-body': scrollable }">
          <slot name="left-body"></slot>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Right -->
    <v-col :cols="rightCols">
      <v-card
        outlined
        class="elevation-2 fill-height"
        :style="cardStyles"
      >
        <!-- Header -->
        <v-card-title
          class="font-weight-bold white--text text-subtitle-1 text-lg-h6"
          :class="rightHeaderColor"
        >
          <div class="d-flex flex-wrap gap-2 w-100">
            <!-- 標題 -->
            {{ rightHeaderTitle }}

            <!-- Right Header Append -->
            <v-spacer></v-spacer>
            <slot name="right-header-append"></slot>
          </div>
        </v-card-title>

        <!-- Body -->
        <v-card-text class="black--text py-4 "
            :class="{ 'scrollable-body': scrollable }">
          <slot name="right-body"></slot>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CustomTwoColumns",
  props: {
    scrollable: {
      type: Boolean,
      default: false, // 默認滾動
    },
    height: {
      type: String,
      default: "100%", // 默認高度
    },
    maxHeight: {
      type: String,
      default: "100%", // 默認最大高度
    },
    leftHeaderTitle: { // 左邊表頭標題
      type: String,
      default: "Left Title",
    },
    rightHeaderTitle: { // 右邊表頭標題
      type: String,
      default: "Right Title",
    },
    leftHeaderColor: { // 左邊表頭顏色
      type: String,
      default: "grey",
    },
    rightHeaderColor: { // 右邊表頭顏色
      type: String,
      default: "grey",
    },

    leftCols: {
      type: [Number, String],
      default: 3,
    },
    rightCols: {
      type: [Number, String],
      default: 9,
    },
  },
  computed: {
    cardStyles() {
      return {
        height: this.height,
        maxHeight: this.maxHeight,
        display: "flex",
        flexDirection: "column",
      };
    },
  },
};
</script>

<style scoped>
.fill-height {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.scrollable-body {
  overflow-y: auto;
  flex: 1;
}
</style>
