<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <p v-for="order in orders" :key="order['id']">
          {{ order }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { OrderService } from '@/api/services'
import { mapGetters, mapState } from 'vuex';
export default {
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    this.getOrders()
  },

  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },


  methods: {
    async getOrders(){
      try{
        const params = new URLSearchParams({
          detail: true,
        })

        const response = await OrderService.getAll(params)
        if(response.status === 200){
          this.orders = response.data
        }
      }
      catch(err){
        console.log(err);
      }
    },

  },
};
</script>
