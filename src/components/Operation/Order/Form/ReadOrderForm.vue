<template>
    <v-row class="justify-start">


        <!-- #region (代號) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                角色代號:
            </div>

            <v-text-field v-model="read_data['name']" background-color="white" outlined label="請填寫代號" readonly
                placeholder="填寫範例: role">
            </v-text-field>
        </v-col>
        <!-- #endregion -->


        <!-- #region (名稱) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                角色名稱:
            </div>

            <v-text-field v-model="read_data['name_zh']" background-color="white" outlined label="請填寫名稱" readonly
                placeholder="填寫範例: 角色">
            </v-text-field>
        </v-col>
        <!-- #endregion -->

     
        
    </v-row>
</template>

<script>
import { OrderService } from '@/api/services'
export default {
    name: "ReadOrderForm",
    components: {},
    props: ['id'],
    data() {
        return {
            loading: true,
            read_data: {
                name: null,
                name_zh: null,
            },
        }
    },

    watch: {
        id: {
            immediate: true,
            handler(newVal){
                if(newVal){
                    this.fetchData()
                }
            }
        }
    },

    methods: {
        async fetchData() {
            try {
                const response = await OrderService.get_by_id(this.id)
                if (response.status === 200) {
                    const Order = response.data
                    this.read_data = {
                        name: Order['name'],
                        name_zh: Order['name_zh'],
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                this.loading = false
            }
        },

    },
}
</script>

<style scoped>
div.label-container {
    min-width: 150px;
}
</style>