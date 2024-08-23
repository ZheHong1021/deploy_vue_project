<template>
    <v-container class="h-screen-minus-header d-flex justify-center align-center">
        <v-row justify="center" align="center">
            <v-col cols="12" class="d-flex flex-column justify-center align-center">
                <h4 class="text-h4 font-weight-black">
                    404 Not Found
                </h4>
            </v-col>
            <v-col cols="12" class="d-flex flex-column gap-4 justify-center align-center">
                <p class="text-h5">
                    找不到頁面，請確認網址是否正確
                </p>

                <v-btn rounded class="font-weight-black text-h6 primary--text" color="blue lighten-5" 
                    @click="goToHome">
                    <v-icon class="mr-1">mdi-home</v-icon>
                    回到首頁
                </v-btn>
            </v-col>


            <v-col cols="12" class="d-flex justify-center align-center">
                <v-img 
                    class="error-image"
                    src="@/assets/images/errors/404.png" 
                    ></v-img>
            </v-col>
        </v-row>



    </v-container>
</template>

<script>
export default {
    methods: {
        goToHome() {
            this.$router.push({ name: 'Home' });
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