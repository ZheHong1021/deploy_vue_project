<template>
    <v-form ref="form" 
        v-model="createFormValid" 
        @submit.prevent="create" >

        <v-row class="justify-start">

            <!-- #region (分類名稱) -->
            <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    分類名稱:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['name']"
                    background-color="white" outlined label="分類名稱"
                    :rules="[rules['requiredRules'], rules.minLengthRules(2), rules.maxLengthRules(12)]"
                    placeholder="填寫範例: 廚房用具">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (代表色碼) -->
            <v-col cols="12" md="6" lg="4" xl="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    代表色碼:
                    <strong class="blue--text font-weight-bold text-caption text-left text-sm-right">
                        (*非必填)
                    </strong>
                </div>

                <v-text-field v-model.number="create_data['color']" 
                    background-color="white" outlined label="請填寫代表色碼"
                    placeholder="填寫範例: #FF0000"
                    prepend-inner-icon="mdi-palette">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (分類描述) -->
            <v-col cols="12" md="6" lg="6" xl="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    分類描述:
                    <strong class="blue--text font-weight-bold text-caption text-left text-sm-right">
                        (*非必填)
                    </strong>
                </div>

                <CustomTextArea
                    v-model="create_data['description']"
                    label="請填寫分類描述"
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
import {ProductCategoryService } from '@/api/services'
import { rules } from '@/utils';
import CustomSelect from '@/components/utils/Form/CustomSelect.vue';
import CustomTextArea from '@/components/utils/Form/CustomTextArea.vue';
export default {
    name: "UpdateProductCategoryForm",
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
            origin_data: {},
            loading: true,

            //#endregion

            create_data: {
                "name": null, // 產品名稱
                "description": null, // 產品描述
                "color": null, // 顏色
            },
            createFormValid: false, // 是否符合規則
            rules: rules,
        }
    },

    computed: {
    },

    async mounted(){
    },
    
    methods: {

        async create(){
            this.$refs.form.validate()
            if(!this.createFormValid){
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
                for(const [key, value] of Object.entries(this.create_data)){
                    if (value !== null && value !== undefined) {
                        formData.append(key, value)
                    }
                }
                const response = await ProductCategoryService.create(formData)
                if(response.status === 201){
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