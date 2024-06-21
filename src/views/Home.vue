<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h6 class="text-h6 font-weight-bold">首頁</h6>

        {{ isLoggedIn }}
      </v-col>

      <v-col cols="12">
        <!-- <p v-for="menu in menus" :key="menu['id']">
          {{ menu }}
        </p> -->


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
