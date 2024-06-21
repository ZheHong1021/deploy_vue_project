<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h4>Parent</h4>
      </v-col>
      <v-col cols="12">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},
};
</script>

<style>
</style>