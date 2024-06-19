<template>
  <div>
    <v-btn color="primary" @click="getOrders">Click</v-btn>

    <p v-for="order in orders" :key="order['id']">
      {{ order }}
    </p>

  </div>
</template>

<script>
import { OrderService } from '@/api/services'
import axios from 'axios'
export default {
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    this.getOrders()
  },
  beforeDestroy() {
    
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
          console.log(this.orders);
        }
      }
      catch(err){
        console.log(err);
      }
    },

  },
};
</script>
