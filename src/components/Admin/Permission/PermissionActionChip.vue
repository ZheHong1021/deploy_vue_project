<template>
  <v-chip label class="w-max-content elevation-2 font-weight-bold black--text" :color="color">
    <!-- 產品圓圈 -->
    <v-icon small left :color="icon_color">
      {{ icon }}
    </v-icon>
    {{ action }}
  </v-chip>
</template>

<script>
export default {
  name: "PermissionActionChip",
  props: {
    action: {
      type: String,
      default: "查看",
    },
  },
  data() {
    return {
      style_hash_map: {
        "查看": {
          color: "success lighten-5",
          icon: "mdi-eye",
          icon_color: "success darken-2",
        },
        "新增": {
          color: "pink lighten-5",
          icon: "mdi-plus-circle",
          icon_color: "pink",
        },
        "修改": {
          color: "primary lighten-5",
          icon: "mdi-pencil",
          icon_color: "primary",
        },
        "刪除": {
          color: "error lighten-5",
          icon: "mdi-delete-circle",
          icon_color: "error",
        },
      },
    };
  },
  computed: {
    status_style() {
      return this.style_hash_map[this.action];
    },
    color() {
      return this.status_style["color"];
    },
    icon_color() {
      return this.status_style["icon_color"];
    },
    icon() {
      return this.status_style["icon"];
    },
  },
};
</script>

<style></style>
