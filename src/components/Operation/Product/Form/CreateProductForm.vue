<template>
    <v-form ref="form" 
        v-model="createFormValid" 
        @submit.prevent="create" >

        <v-row class="justify-start">
    

            <!-- #region (產品分類) -->
            <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    產品分類:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <CustomSelect
                    v-model="create_data['category']"
                    :items="product_categories"
                    :loading="product_category_loading"
                    label="請選擇產品分類"
                    placeholder="選擇範例：廚房用具"
                    item-text="name"
                    item-value="id"
                    :rules="[rules['requiredRules']]"
                >
                </CustomSelect>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (產品名稱) -->
            <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    產品名稱:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['name']"
                    background-color="white" outlined label="請填寫產品名稱"
                    :rules="[rules['requiredRules'], rules.minLengthRules(2), rules.maxLengthRules(12)]"
                    placeholder="填寫範例: 哈哈電鍋">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (產品定價) -->
            <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    產品定價:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model.number="create_data['price']" type="number" inputmode="numeric"
                    background-color="white" outlined label="請填寫產品定價"
                    :rules="[rules['requiredRules'], rules['isNumbericRules'], rules['limitNumberRangeRules'](1, 99999)]"
                    placeholder="填寫範例: 10000"
                    prepend-inner-icon="mdi-currency-usd">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (產品描述) -->
            <v-col cols="12" md="6" lg="6" xl="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    產品描述:
                    <strong class="blue--text font-weight-bold text-caption text-left text-sm-right">
                        (*非必填)
                    </strong>
                </div>

                <CustomTextArea
                    v-model="create_data['description']"
                    label="請填寫產品描述"
                    clearable>
                </CustomTextArea>
            </v-col> 
            <!-- #endregion -->


            <v-col cols="12" class="d-flex align-center justify-center gap-4">
                <v-btn color="pink darken-2" type="submit" class="font-weight-bold white--text"
                    width="150" height="50">
                    創建
                </v-btn>
            </v-col>
        </v-row>

    </v-form>
                
</template>

<script>
import { ProductService, ProductCategoryService } from '@/api/services'
import { rules } from '@/utils';
import CustomSelect from '@/components/utils/Form/CustomSelect.vue';
import CustomTextArea from '@/components/utils/Form/CustomTextArea.vue';
export default {
    name: "CreateProductForm",
    components: {
        CustomSelect,
        CustomTextArea,
    },

    data(){
        return {
            //#region (擷取API)
            product_categories: [],
            product_category_loading: true,

            //#endregion

            create_data: {
                "name": null, // 產品名稱
                "category": null, // 產品項目
                "description": null, // 產品描述
                "price": null, // 定價
            },
            createFormValid: false, // 是否符合規則
            rules: rules,
        }
    },

    computed: {
    },

    async mounted(){
        await this.fetchProductCategory()
    },
    
    methods: {
        //#region (擷取API)
        async fetchProductCategory(){
            try{
                const params = new URLSearchParams({
                    page_size: -1, // 希望分頁可以一次查詢全部
                })
                const response = await ProductCategoryService.get_all(params)
                if(response.status === 200){
                    const { data } = response.data
                    this.product_categories = data
                }
            }catch(err){
                console.error(err)
            }finally{
                this.product_category_loading = false
            }
        },
        //#endregion


        async create(){
            this.$refs.form.validate()
            if(!this.createFormValid){
                this.$swal.fire("請確實填寫內容", "", "error")
                return
            }

            try{
                const formData = new FormData()
                for(const [key, value] of Object.entries(this.create_data)){
                    if (value !== null && value !== undefined) {
                        formData.append(key, value)
                    }
                }
                const response = await ProductService.create(formData)
                if(response.status === 201){
                    this.$swal.fire("創建成功", "", "success")
                    this.$emit("refresh")
                }
                else{
                    this.$swal.fire("創建失敗", "", "error")
                }
            }
            catch(err){
                console.error(err);
            }
        },

        
   
    },
}
</script>

<style scoped>
    div.label-container{
        min-width: 150px;
    }
   
</style>