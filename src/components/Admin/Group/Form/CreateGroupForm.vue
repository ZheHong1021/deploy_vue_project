<template>
    <v-form ref="form" 
        v-model="createFormValid" 
        @submit.prevent="create" >

        <v-row class="justify-start">
    

            <!-- #region (代號) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    角色代號:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['name']"
                    background-color="white" outlined label="請填寫角色代號"
                    :rules="[rules['requiredRules']]"
                    placeholder="填寫範例: role">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->
    

            <!-- #region (角色名稱) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    角色名稱:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['name_zh']"
                    background-color="white" outlined label="請填寫角色名稱"
                    :rules="[rules['requiredRules']]"
                    placeholder="填寫範例: 角色">
                </v-text-field>
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
import { GroupProfileService } from '@/api/services'
import { rules } from '@/utils';
export default {
    name: "CreateGroupForm",
    components: {
    },

    data(){
        return {
            create_data: {
                "name": null,
                "name_zh": null,
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

            try{
                const formData = new FormData()
                for(const [key, value] of Object.entries(this.create_data)){
                    if (value !== null && value !== undefined) {
                        formData.append(key, value)
                    }
                }
                const response = await GroupProfileService.create(formData)
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