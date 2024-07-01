<template>
    <v-form ref="form" 
        v-model="updateFormValid" 
        @submit.prevent="update" >

        <v-row class="justify-start">
            <!-- #region (帳號) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    帳號:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="update_data['username']"
                    background-color="white" outlined label="請填寫帳號"
                    :rules="[rules['requiredRules']]"
                    placeholder="填寫範例: example">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (信箱) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    信箱:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="update_data['email']"
                    background-color="white" outlined label="請填寫信箱"
                    :rules="[rules['requiredRules'], rules['emailRules']]"
                    placeholder="填寫範例: example@gmail.com">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            
            <!-- #region (姓氏) -->
            <v-col cols="12" md="4" lg="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    姓氏:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="update_data['lastname']"
                    background-color="white" outlined label="請填寫姓氏"
                    :rules="[rules['requiredRules']]"
                    placeholder="填寫範例: 林">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (名字) -->
            <v-col cols="12" md="4" lg="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    名字:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="update_data['firstname']"
                    background-color="white" outlined label="請填寫名字"
                    :rules="[rules['requiredRules']]"
                    placeholder="填寫範例: 大明">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            
            <!-- #region (手機號碼) -->
            <v-col cols="12" md="4" lg="4" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    手機號碼:
                    <strong class="blue--text font-weight-bold text-caption text-left text-sm-right">
                        (非必填)
                    </strong>
                </div>

                <v-text-field v-model="update_data['phone_number']"
                    background-color="white" outlined label="請填寫手機號碼"
                    :rules="[rules['phoneRules']]"
                    placeholder="填寫範例: 0912345678">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->


            <!-- #region (性別) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    性別:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>
                <v-radio-group 
                    v-model="update_data['gender']" row
                    :rules="[rules['requiredRules']]">
                    <v-radio 
                        v-for="gender in gender_select_list"
                        :key="gender['value']"
                        :label="gender['label']"
                        :value="gender['value']"
                    ></v-radio>
                </v-radio-group>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (啟用狀態) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    啟用狀態:
                </div>
                <v-switch 
                    v-model="update_data['is_active']"
                    inset>
                    <template #label>
                        <span>{{ update_data['is_active'] ? '啟用' : '停用'}}</span>
                    </template>
                </v-switch>
            </v-col> 
            
            <!-- #endregion -->
            <v-col cols="12" class="d-flex align-center justify-center gap-4">
                <v-btn color="primary darken-2" type="submit" class="font-weight-bold white--text" width="150" height="50">
                    儲存
                </v-btn>
            </v-col>
        </v-row>

    </v-form>
                
</template>

<script>
import { UserService } from '@/api/services'
import { rules } from '@/utils';
export default {
    name: "UpdateUserForm",
    components: {},
    props: ['id'],

    data(){
        return {
            // 密碼顯示
            password_show: false,

            // 確認密碼顯示
            confirm_password: null,
            confirm_password_show: false,
            loading: true,
            update_data: {},
            updateFormValid: false, // 是否符合規則

            // 規則
            rules: rules,


            // 性別可選選項
            gender_select_list: [
                { label: '男', value: 'male' },
                { label: '女', value: 'female' },
                { label: '其他', value: 'other' },
                { label: '不公開', value: 'private' },
            ]
        }
    },

    computed: {
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

    async mounted(){
    },
    
    methods: {
        async fetchData() {
            try {
                const response = await UserService.get_by_id(this.id)
                if (response.status === 200) {
                    const response_data = response.data
                    this.update_data = {
                        "username": response_data['username'],
                        "email": response_data['email'],
                        "firstname": response_data['firstname'],
                        "lastname": response_data['lastname'],
                        "phone_number": response_data['phone_number'],
                        "gender": response_data['gender'],
                        "is_active": response_data['is_active'],
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
        async update(){
            this.$refs.form.validate()
            if(!this.updateFormValid){
                this.$swal.fire("請確實填寫內容", "", "error")
                return
            }

            try{
                const formData = new FormData()
                for(const [key, value] of Object.entries(this.update_data)){
                    if (value !== null && value !== undefined) {
                        formData.append(key, value)
                    }
                }
                const response = await UserService.update(this.id, formData)
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
