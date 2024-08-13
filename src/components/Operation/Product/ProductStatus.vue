<template>
  <v-chip label class="elevation-2 font-weight-bold black--text" 
    :color="status_style['color']">
    <!-- 產品圓圈 -->
    <v-icon small left :color="status_style['icon_color']">circle</v-icon>
    
    <!-- 產品狀態 -->
    {{ product['status_display'] }}
  </v-chip>
</template>

<script>
export default {
    name: "ProductStatus",
    props: {
        product: {
            type: Object,
            default: ()=> {}
        }
    },
    data(){
        return {
            status_style_map: {
                "available": {
                    color: "primary lighten-5",
                    icon_color: "primary",
                },
                "out_of_stock": {
                    color: "error lighten-5",
                    icon_color: "error",
                },
                "discontinued": {
                    color: "grey lighten-2",
                    icon_color: "grey darken-2",
                },
            }
        }
    },

    computed: {
        status_style(){
            const { status } = this.product
            return this.status_style_map[status]
        },
    },
}
</script>

<style scoped>

</style>