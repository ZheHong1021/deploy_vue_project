<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        {{ $store.state.user.user }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
    };
  },

  computed: {},


  async mounted() {
  },


  methods: {},
};
</script>

<style>
</style>