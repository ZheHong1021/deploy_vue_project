<template>
  <v-footer color="primary lighten-1" padless>
    <v-row justify="center" no-gutters>

      <v-col class="blue lighten-5 py-4 text-center " cols="12">
        <strong>&copy; {{ new Date().getFullYear() }} — 開發</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Footer",
    data: () => ({
       
    }),

    computed:{
      
    }
}
</script>

<style lang="scss" scoped>
</style>