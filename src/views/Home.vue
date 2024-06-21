<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        12312
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
    };
  },
  async mounted() {
  },

  computed: {
    ...mapState('menu', ['menus']),
    ...mapGetters('auth', ['isLoggedIn']),
  },


  methods: {

  },
};
</script>
