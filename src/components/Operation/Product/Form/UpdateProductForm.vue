<template>
    <v-form ref="form" v-model="updateFormValid" @submit.prevent="update">

        <v-row class="justify-start">


            <!-- #region (代號) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    角色代號:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="update_data['name']" background-color="white" outlined label="請填寫代號"
                    :rules="[rules['requiredRules']]" placeholder="填寫範例: teacher">
                </v-text-field>
            </v-col>
            <!-- #endregion -->


            <!-- #region (名稱) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    角色名稱:
                    <strong class="red--text font-weight-bold text-caption text-left text-sm-right">
                        (*必填)
                    </strong>
                </div>

                <v-text-field v-model="update_data['name_zh']" background-color="white" outlined label="請填寫名稱"
                    :rules="[rules['requiredRules']]" placeholder="填寫範例: 老師">
                </v-text-field>
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
import { ProductService } from '@/api/services'
import { rules } from '@/utils';
export default {
    name: "UpdateProductForm",
    components: {},
    props: ['id'],
    data() {

        return {
            loading: true,
            update_data: {},
            updateFormValid: false, // 是否符合規則
            rules: rules
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
                const response = await ProductService.get_by_id(this.id)
                if (response.status === 200) {
                    const Product = response.data
                    this.update_data = {
                        name: Product['name'],
                        name_zh: Product['name_zh'],
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
                const response = await ProductService.update(this.id, formData)
                if (response.status === 200) {
                    this.$swal.fire("儲存成功", "", "success")
                    this.$emit("refresh")
                }
                else {
                    this.$swal.fire("儲存失敗", "", "error")
                }
            }
            catch (err) {
                console.error(err);
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