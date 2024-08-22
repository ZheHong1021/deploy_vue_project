<template>
    <v-form ref="form" v-model="updateFormValid" @submit.prevent="update">

        <v-row class="justify-start">
            <!-- #region (方法 - codename) -->
            <v-col cols="12" class="d-flex flex-wrap gap-2">
                <span class="label-container font-weight-bold text-subtitle-1 ">
                    方法:
                </span>

                <PermissionActionChip :action="response_data['action']" />
            </v-col>
            <!-- #endregion -->

            <!-- #region (操作代號 - codename) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    操作代號:
                </div>

                <v-text-field v-model="response_data['codename']" background-color="white" outlined 
                    label="" readonly  disabled hint="無法修改" persistent-hint
                    placeholder="填寫範例: 操作代號">
                </v-text-field>
            </v-col>
            <!-- #endregion -->

            <!-- #region (操作對象 - content_type_name) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    操作對象:
                </div>

                <v-text-field v-model="response_data['content_type_name']" background-color="white" outlined 
                    label="" readonly disabled hint="無法修改" persistent-hint
                    placeholder="填寫範例: 操作對象">
                </v-text-field>
            </v-col>
            <!-- #endregion -->

            <!-- #region (操作說明 - name) -->
            <v-col cols="12"  class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    操作說明:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>
            
                <CustomTextArea 
                    v-model="update_data['name']" 
                    :rules="[rules['requiredRules']]"
                    label="請填寫操作說明">
                </CustomTextArea>
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
import { PermissionService } from '@/api/services'
import { rules } from '@/utils';
import CustomTextArea from '@/components/utils/Form/CustomTextArea.vue';
import PermissionActionChip from '../PermissionActionChip.vue';
export default {
    name: "UpdatePermissionForm",
    components: {
        CustomTextArea,
        PermissionActionChip
    },
    props: ['id'],
    data() {

        return {
            loading: true,
            response_data: {}, // 後端回傳資料
            update_data: {}, // 更新資料
            updateFormValid: false, // 是否符合規則
            rules:rules,
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
                const response = await PermissionService.get_by_id(this.id)
                if (response.status === 200) {
                    this.response_data = response.data
                    
                    this.update_data = {
                        name: this.response_data['name'], // 只有操作說明能修改
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
                    if (value !== null && value !== undefined) {
                        formData.append(key, value)
                    }
                }
                const response = await PermissionService.update(this.id, formData)
                if (response.status === 200) {
                    this.$swal.fire("儲存成功", "", "success")
                    this.$emit("refresh")
                    this.$store.dispatch("permission/getPermissions")
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