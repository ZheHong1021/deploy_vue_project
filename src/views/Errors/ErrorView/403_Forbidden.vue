<template>
    <v-container class="h-screen-minus-header d-flex justify-center align-center">
        <v-row justify="center" align="center">
            <v-col cols="12" class="d-flex flex-column justify-center align-center">
                <h4 class="text-h4 font-weight-black">
                    403 Forbidden
                </h4>
            </v-col>
            <v-col cols="12" class="d-flex flex-column gap-4 justify-center align-center">
                <p class="text-h5">
                    權限不足禁止訪問
                </p>
            </v-col>

            <v-col cols="12" class="d-flex justify-center align-center">
                <v-img 
                    class="error-image"
                    src="@/assets/images/errors/403.png" 
                    ></v-img>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    methods: {
      
    }
}
</script>

<style scoped>
    .error-image {
        max-width: 350px;
        border-radius: 10px;
    }
</style>