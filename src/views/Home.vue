<template>
  <div>
    <v-btn color="primary" @click="getOrders">Click</v-btn>
    {{isLoggedIn }}
    <p v-for="order in orders" :key="order['id']">
      {{ order }}
    </p>

  </div>
</template>

<script>
import { OrderService } from '@/api/services'
import { mapGetters } from 'vuex';
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
