<template>
    <v-container class="h-screen-minus-header d-flex justify-center align-center">
        <v-row justify="center" align="center">
            <v-col cols="12" class="d-flex flex-column justify-center align-center">
                <h4 class="text-h4 font-weight-black">
                    500 Interval Server Error
                </h4>
            </v-col>
            <v-col cols="12" class="d-flex flex-column gap-4 justify-center align-center">
                <p class="text-h5">
                    伺服器發生點小問題
                </p>

                <v-btn rounded class="font-weight-black text-h6 error--text" color="error lighten-5" 
                    @click="refreshGoBackPage">
                    <v-icon class="mr-1">mdi-update</v-icon>
                    重新載入
                </v-btn>
            </v-col>


            <v-col cols="12" class="d-flex justify-center align-center">
                <v-img 
                    class="error-image"
                    src="@/assets/images/errors/500.png" 
                    ></v-img>
            </v-col>
        </v-row>



    </v-container>
</template>

<script>
export default {
    methods: {
        refreshGoBackPage() { // 回到上一頁
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
    .error-image {
        max-width: 350px;
        border-radius: 10px;
    }
</style>