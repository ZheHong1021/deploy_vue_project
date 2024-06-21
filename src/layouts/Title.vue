<template>
  <v-col cols="12" v-if="title">
    <h6 class="text-h6 font-weight-bold">
        {{ title }}
    </h6>
  </v-col>
</template>

<script>
export default {
    name: "Title",
    data(){
        return {
        }
    },

    computed: {
        title(){ // 當前頁面的標題
            return this.$route?.meta?.title
        }
    }
}
</script>

<style>

</style>