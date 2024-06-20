<template>
  <div>
    <v-btn color="primary" @click="getOrders">Click</v-btn>
    {{isLoggedIn }}
    <p v-for="order in orders" :key="order['id']">
      {{ order }}
    </p>
    <p v-for="i in 10">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe non eius dolorem a, culpa nemo, laborum quo quae officiis, mollitia nisi accusamus aperiam aliquam. Ipsa minima voluptate commodi? Ea, molestias?
    Nesciunt excepturi nobis accusamus voluptates. Qui laudantium unde laboriosam sunt numquam excepturi vitae alias quis expedita! Unde et totam odio nesciunt quasi, dolorem harum similique repudiandae commodi fuga suscipit qui?
    A commodi distinctio reprehenderit, soluta voluptatum itaque fugit! Sed, praesentium eaque. Atque commodi ad harum soluta minus sint aperiam ipsam quidem esse omnis, rerum animi, quos nam quo est dolore?
    Laudantium voluptas voluptatibus illum culpa molestias quas voluptatum soluta magnam. Eum cum reiciendis molestiae laudantium eaque quam magni recusandae in ipsum vero ipsa, facere vitae ducimus ad veritatis delectus a.
    Facere blanditiis minima, voluptatem nobis impedit eaque culpa eos rerum fuga a dignissimos distinctio minus reiciendis dolorem, odio vitae voluptas iure, vero dolor fugit! Dicta, laudantium perspiciatis. Vero, incidunt dicta.
    Tempore, minus eveniet. Id quos facere aut dolor eaque nihil animi, aspernatur officia expedita est aliquam voluptatem totam recusandae tenetur tempore neque officiis necessitatibus ab provident. Tenetur magnam corporis non.
    Dignissimos, excepturi? Illo possimus harum molestiae soluta voluptates, rem delectus error id repellat tenetur beatae reprehenderit sed quidem. Provident animi aliquid cumque iusto in totam? Facilis, cum voluptas. Exercitationem, ut!
    Quos vitae quae pariatur officia. Perspiciatis itaque dignissimos doloremque ipsum nisi laudantium optio? Iusto placeat praesentium eligendi ratione. Expedita culpa omnis rerum sit reiciendis iure autem qui a maiores nostrum!
    Ratione, veniam hic? Sequi molestias rem, nam voluptate inventore incidunt id, voluptas quae quia, dignissimos porro. Repellat accusantium, soluta enim laboriosam, repellendus et vero officia fugiat, facere harum quod laborum!
    Obcaecati, incidunt. Ex in autem similique harum deserunt ipsum repellat eveniet iusto dicta velit. Quam ex dolores impedit iusto quasi optio est labore aliquid culpa cumque, ipsa voluptas? Laborum, deserunt.</p>

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
