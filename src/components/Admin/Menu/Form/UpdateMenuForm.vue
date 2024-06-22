<template>
    <v-form ref="form" v-model="updateFormValid" @submit.prevent="update">

        <v-row class="justify-start">


            <!-- #region (標題) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    菜單標題:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="update_data['title']" background-color="white" outlined label="請填寫標題"
                    :rules="[rules['required']]" placeholder="填寫範例: 菜單標題">
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

                <v-text-field v-model="update_data['path']" background-color="white" outlined label="請填寫路徑"
                    :rules="[rules['required']]" placeholder="填寫範例: /path">
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

                <v-text-field v-model="update_data['name']" background-color="white" outlined label="請填寫組件名稱"
                    :rules="[rules['required']]" placeholder="填寫範例: PathName">
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

                <v-text-field v-model="update_data['component']" background-color="white" outlined label="請填寫組件路徑"
                    :rules="[rules['required']]" placeholder="填寫範例: Path/PathName">
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

                <v-text-field v-model="update_data['icon']" background-color="white" outlined label="請填寫菜單圖案路徑"
                    placeholder="填寫範例: mdi-home">
                    <template #append>
                        <v-icon color="primary">{{ update_data['icon'] }}</v-icon>
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

                <v-text-field v-model="update_data['redirect']" background-color="white" outlined label="請填寫跳轉路徑路徑"
                    placeholder="填寫範例: /redirect-path">
                </v-text-field>
            </v-col>
            <!-- #endregion -->

            <!--#region (顯示順序) -->
            <v-col cols="4" class="d-flex flex-wrap align-center gap-4">
                <span class="font-weight-bold text-subtitle-1">
                    顯示順序：
                </span>


                <v-text-field v-model.number="update_data['priority']" type="number" input-mode="tel" background-color="white" outlined label="請填寫跳轉路徑路徑"
                    hide-details="" style="max-width: 150px;" :rules="[rules['required']]">
                </v-text-field>
            </v-col>
            <!-- #endregion -->

            <!--#region (菜單) -->
            <v-col cols="3" class="d-flex flex-wrap align-center gap-4">
                <div class="font-weight-bold text-subtitle-1">
                    菜單：
                </div>
                <v-switch inset class="w-max-content" color="primary" v-model="update_data['is_menu']"></v-switch>
            </v-col>
            <!-- #endregion -->

            <!--#region (停用狀態) -->
            <v-col cols="3" class="d-flex flex-wrap align-center gap-4">
                <div class="font-weight-bold text-subtitle-1">
                    停用狀態：
                </div>
                <v-switch inset class="w-max-content" color="primary" v-model="update_data['is_disabled']"></v-switch>
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
import { MenuService } from '@/api/services'
export default {
    name: "UpdateMenuForm",
    components: {
    },
    props: ['id'],
    data() {

        return {
            loading: true,
            update_data: {},
            updateFormValid: false, // 是否符合規則
            rules: {
                required: value => !!value || '此欄位必須填寫!.',
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
                const response = await MenuService.getById(this.id)
                if (response.status === 200) {
                    const menu = response.data
                    
                    this.update_data = {
                        title: menu['title'],
                        path: menu['path'],
                        name: menu['name'],
                        component: menu['component'],
                        is_menu: menu['is_menu'],
                        is_disabled: menu['is_disabled'],
                        redirect: menu['redirect'],
                        priority: menu['priority'],
                        icon: menu['icon'],
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


        async update() {
            this.$refs.form.validate()
            if (!this.updateFormValid) {
                this.$swal.fire("請確實填寫內容", "", "error")
                return
            }

            try {
                const formData = new FormData()
                for (const [key, value] of Object.entries(this.update_data)) {
                    if (value !== null || value !== undefined) {
                        formData.append(key, value)
                    }
                }
                const response = await MenuService.update(this.id, formData)
                if (response.status === 200) {
                    this.$swal.fire("儲存成功", "", "success")
                    this.$emit("refresh")
                    this.$store.dispatch("menu/getMenus")
                }
                else {
                    this.$swal.fire("儲存失敗", "", "error")
                }
            }
            catch (err) {
                console.log(err);
                this.$swal.fire({
                    title: "儲存發生錯誤",
                    text: err,
                    icon: "error",
                })
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