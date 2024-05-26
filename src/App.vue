<template>
  <v-app>
    <v-main>
      <div class="d-flex gap-4">
        <router-link v-for="route in routes" :key="route['name']"
          :to="route['path']">
          {{ route['name'] }}
        </router-link>
      </div>


      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    routes: [
      {name: 'HomeView', path: '/'},
      {name: 'AboutView', path: '/about'},
      {name: 'WebSocket', path: '/web-socket'},
    ]

  }),
};
</script>


<style lang="scss" scoped>
 @import url('assets/scss/style.scss');


</style>