<template>
    <v-row class="justify-start">

        <!-- #region (分類名稱) -->
        <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                分類名稱:
            </div>

            <v-text-field v-model="origin_data['name']"
                background-color="white" outlined readonly>
            </v-text-field>
        </v-col> 
        <!-- #endregion -->

        <!-- #region (代表色碼) -->
        <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                代表色碼:
                
            </div>

            <v-text-field :value="origin_data['color']" 
                background-color="white" outlined readonly
                prepend-inner-icon="mdi-palette">
            </v-text-field>
        </v-col> 
        <!-- #endregion -->

        <!-- #region (分類描述) -->
        <v-col cols="12" md="6" lg="6" xl="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                分類描述:
            </div>
            <CustomTextArea
                v-model="origin_data['description']"
                label="請填寫分類描述"
                readonly>
            </CustomTextArea>
        </v-col> 
        <!-- #endregion -->


    </v-row>
</template>

<script>
import {ProductCategoryService } from '@/api/services'
import CustomTextArea from '@/components/utils/Form/CustomTextArea.vue';
export default {
    name: "ReadProductCategoryForm",
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
                const response = await ProductCategoryService.get_by_id(this.id)
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