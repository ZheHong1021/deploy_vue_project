<template>
    <v-form ref="form" 
        v-model="updateFormValid" 
        @submit.prevent="update" >

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
                    v-model="update_data['category']"
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

                <v-text-field v-model="update_data['name']"
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

                <v-text-field v-model.number="update_data['price']" type="number" inputmode="numeric"
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
                    v-model="update_data['description']"
                    label="請填寫產品描述"
                    clearable>
                </CustomTextArea>
            </v-col> 
            <!-- #endregion -->


            <v-col cols="12" class="d-flex align-center justify-center gap-4">
                <v-btn color="primary darken-2" type="submit" class="font-weight-bold white--text"
                    width="150" height="50">
                    儲存
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
    name: "UpdateProductForm",
    components: {
        CustomSelect,
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
            product_categories: [],
            product_category_loading: true,

            origin_data: {},
            loading: true,

            //#endregion

            update_data: {
                "name": null, // 產品名稱
                "category": null, // 產品項目
                "description": null, // 產品描述
                "price": null, // 定價
            },
            updateFormValid: false, // 是否符合規則
            rules: rules,
        }
    },

    computed: {
    },

    async mounted(){
        await this.fetchProductCategory()
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
                    this.update_data = {
                        "name": response_data['name'], // 產品名稱
                        "category": response_data['category'], // 產品項目
                        "description": response_data['description'], // 產品描述
                        "price": response_data['price'], // 定價
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


        async update(){
            this.$refs.form.validate()
            if(!this.updateFormValid){
                this.$swal.fire("請確實填寫內容", "", "error")
                return
            }

            const swal_response = await this.$swal.fire({
                title: "提交提醒", 
                text: "正在提交表單進行儲存", 
                icon: "info",
                showCancelButton: true,
                cancelButtonText: "取消",
                confirmButtonText: "儲存"
            })

            if(!swal_response.isConfirmed){
                return
            }

            try{
                const formData = new FormData()
                for(const [key, value] of Object.entries(this.update_data)){
                    if (value !== null && value !== undefined) {
                        formData.append(key, value)
                    }
                }
                const response = await ProductService.update(this.id, formData)
                if(response.status === 200){
                    this.$swal.fire("儲存成功", "", "success")
                    this.$emit("refresh")
                }
                else{
                    this.$swal.fire("儲存失敗", "", "error")
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