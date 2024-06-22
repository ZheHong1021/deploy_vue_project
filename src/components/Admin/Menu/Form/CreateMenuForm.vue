<template>
    <v-form ref="form" 
        v-model="createFormValid" 
        @submit.prevent="create" >

        <v-row class="justify-start">
    

            <!-- #region (標題) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    菜單標題:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['title']"
                    background-color="white" outlined label="請填寫標題"
                    :rules="[rules['required']]"
                    placeholder="填寫範例: 菜單標題">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->
    

            <!-- #region (路徑) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    菜單路徑:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['path']"
                    background-color="white" outlined label="請填寫路徑"
                    :rules="[rules['required']]"
                    placeholder="填寫範例: /path">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (組件名稱) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    組件名稱:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['name']"
                    background-color="white" outlined label="請填寫組件名稱"
                    :rules="[rules['required']]"
                    placeholder="填寫範例: PathName">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (組件路徑) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    組件路徑:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['component']"
                    background-color="white" outlined label="請填寫組件路徑"
                    :rules="[rules['required']]"
                    placeholder="填寫範例: Path/PathName">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (菜單圖案) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    菜單圖案:
                    <strong class="blue--text font-weight-bold text-caption text-left text-sm-right">
                        (非必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['icon']"
                    background-color="white" outlined label="請填寫菜單圖案路徑"
                    placeholder="填寫範例: mdi-home">
                    <template #append>
                        <v-icon color="primary">{{ create_data['icon'] }}</v-icon>
                    </template>
                </v-text-field>
            </v-col> 
            <!-- #endregion -->


            <!-- #region (組件路徑) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    跳轉路徑:
                    <strong class="blue--text font-weight-bold text-caption text-left text-sm-right">
                        (非必填)
                    </strong>
                </div>

                <v-text-field v-model="create_data['redirect']"
                    background-color="white" outlined label="請填寫跳轉路徑路徑"
                    placeholder="填寫範例: /redirect-path">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!--#region (顯示順序) -->
            <v-col cols="4" class="d-flex flex-wrap align-center gap-4">
                <span class="font-weight-bold text-subtitle-1">
                    顯示順序：
                </span>

         
                <v-text-field v-model.number="create_data['priority']" type="number" input-mode="tel"
                    background-color="white" outlined label="請填寫跳轉路徑路徑"
                    hide-details=""
                    style="max-width: 150px;"
                    :rules="[rules['required']]">
                </v-text-field>
            </v-col>
            <!-- #endregion -->

            <!--#region (菜單) -->
            <v-col cols="3" class="d-flex flex-wrap align-center gap-4">
                <div class="font-weight-bold text-subtitle-1">
                    菜單：
                </div>
                <v-switch inset class="w-max-content" color="pink"
                    v-model="create_data['is_menu']"
                ></v-switch>
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
import { MenuService } from '@/api/services'
export default {
    name: "CreateMenuForm",
    components: {
    },

    data(){
      
        return {
            create_data: {
                title: null,
                path: null,
                name: null,
                component: null,
                is_menu: null,
                redirect: null,
                priority: null,
            },
            createFormValid: false, // 是否符合規則
            rules: {
                required: value => !!value || '此欄位必須填寫!.',
            },
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
                    if(value){
                        formData.append(key, value)
                    }
                }
                const response = await MenuService.create(formData)
                if(response.status === 201){
                    this.$swal.fire("創建成功", "", "success")
                    this.$emit("refresh")
                    this.$store.dispatch("menu/getMenus")
                }
                else{
                    this.$swal.fire("創建失敗", "", "error")
                }
            }
            catch(err){
                console.log(err);
                this.$swal.fire({
                    title: "創建發生錯誤",
                    text: err,
                    icon: "error",
                })
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