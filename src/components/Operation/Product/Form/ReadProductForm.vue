<template>
    <v-form ref="form" 
        v-model="updateFormValid" 
        @submit.prevent="update" >

        <v-row class="justify-start">
    

            <!-- #region (產品分類) -->
            <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    產品分類:
                </div>

                <v-text-field
                    outlined readonly
                    :value="origin_data['category_name']">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (產品名稱) -->
            <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    產品名稱:
                </div>

                <v-text-field v-model="origin_data['name']"
                    background-color="white" outlined readonly
                    placeholder="填寫範例: 哈哈電鍋">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (產品定價) -->
            <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    產品定價:
                </div>

                <v-text-field :value="origin_data['price']"
                    background-color="white" outlined 
                    readonly
                    prepend-inner-icon="mdi-currency-usd">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (產品描述) -->
            <v-col cols="12" md="6" lg="6" xl="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    產品描述:
                </div>

                <CustomTextArea
                    v-model="origin_data['description']"
                    label="請填寫產品描述"
                    clearable
                    readonly>
                </CustomTextArea>
            </v-col> 
            <!-- #endregion -->
        </v-row>

    </v-form>
                
</template>

<script>
import { ProductService } from '@/api/services'
import CustomTextArea from '@/components/utils/Form/CustomTextArea.vue';
export default {
    name: "ReadProductForm",
    components: {
        CustomTextArea,
    },
    props: {
        id: {
            type: String,
            default: null,
        }
    },

    data(){
        return {
            //#region (擷取API)
            origin_data: {},
            loading: true,
            //#endregion
        }
    },

    computed: {
    },

    async mounted(){
        await this.fetchData()
    },
    
    methods: {
        //#region (擷取API)
        async fetchData() {
            try {
                const response = await ProductService.get_by_id(this.id)
                if (response.status === 200) {
                    const response_data = response.data
                    this.origin_data = response_data
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                this.loading = false
            }
        },
        //#endregion
        
   
    },
}
</script>

<style scoped>
    div.label-container{
        min-width: 150px;
    }
   
</style>