<template>
    <v-row class="justify-start">


        <!-- #region (操作代號 - codename) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                操作代號:
            </div>

            <v-text-field v-model="read_data['codename']" background-color="white" outlined 
                label="" readonly
                placeholder="填寫範例: 操作代號">
            </v-text-field>
        </v-col>
        <!-- #endregion -->

        <!-- #region (操作對象 - content_type_name) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                操作對象:
            </div>

            <v-text-field v-model="read_data['content_type_name']" background-color="white" outlined 
                label="" readonly
                placeholder="填寫範例: 操作對象">
            </v-text-field>
        </v-col>
        <!-- #endregion -->

        <!-- #region (操作說明 - name) -->
        <v-col cols="12" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                操作說明:
            </div>

            <CustomTextArea 
                v-model="read_data['name']" 
                label=""
                readonly>

            </CustomTextArea>
        </v-col>
        <!-- #endregion -->

        


    </v-row>
</template>

<script>
import { PermissionService } from '@/api/services'
import CustomTextArea from '@/components/utils/Form/CustomTextArea.vue';
export default {
    name: "ReadPermissionForm",
    components: {
        CustomTextArea,
    },
    props: ['id'],
    data() {

        return {
            loading: true,
            read_data: {
                title: null,
              
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
                const response = await PermissionService.get_by_id(this.id)
                if (response.status === 200) {
                    const permission = response.data
                    this.read_data = {
                        content_type_name: permission['content_type_name'],
                        name: permission['name'],
                        codename: permission['codename'],
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

    },
}
</script>

<style scoped>
div.label-container {
    min-width: 150px;
}
</style>