<template>
    <v-row class="justify-start">


        <!-- #region (標題) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                菜單標題:
            </div>

            <v-text-field v-model="read_data['title']" background-color="white" outlined label="請填寫標題" readonly
                placeholder="填寫範例: 菜單標題">
            </v-text-field>
        </v-col>
        <!-- #endregion -->


        <!-- #region (路徑) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                菜單路徑:
            </div>

            <v-text-field v-model="read_data['path']" background-color="white" outlined label="請填寫路徑" readonly
                placeholder="填寫範例: /path">
            </v-text-field>
        </v-col>
        <!-- #endregion -->

        <!-- #region (組件名稱) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                組件名稱:
            </div>

            <v-text-field v-model="read_data['name']" background-color="white" outlined label="請填寫組件名稱" readonly
                placeholder="填寫範例: PathName">
            </v-text-field>
        </v-col>
        <!-- #endregion -->

        <!-- #region (組件路徑) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                組件路徑:
            </div>

            <v-text-field v-model="read_data['component']" background-color="white" outlined label="請填寫組件路徑" readonly
                placeholder="填寫範例: Path/PathName">
            </v-text-field>
        </v-col>
        <!-- #endregion -->

        <!-- #region (菜單圖案) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                菜單圖案:
            </div>

            <v-text-field v-model="read_data['icon']" background-color="white" outlined label="請填寫菜單圖案路徑" readonly
                placeholder="填寫範例: mdi-home">
                <template #append>
                    <v-icon color="primary">{{ read_data['icon'] }}</v-icon>
                </template>
            </v-text-field>
        </v-col>
        <!-- #endregion -->


        <!-- #region (組件路徑) -->
        <v-col cols="12" md="6" class="d-flex flex-column gap-2">
            <div class="label-container font-weight-bold text-subtitle-1">
                跳轉路徑:
            </div>

            <v-text-field v-model="read_data['redirect']" background-color="white" outlined label="請填寫跳轉路徑路徑" readonly
                placeholder="填寫範例: /redirect-path">
            </v-text-field>
        </v-col>
        <!-- #endregion -->

        <!--#region (顯示順序) -->
        <v-col cols="4" class="d-flex flex-wrap align-center gap-4">
            <span class="font-weight-bold text-subtitle-1">
                顯示順序：
            </span>

            <v-text-field v-model.number="read_data['priority']" type="number" input-mode="tel" background-color="white" outlined label="請填寫跳轉路徑路徑" readonly
                hide-details="" style="max-width: 150px;" >
            </v-text-field>
        </v-col>
        <!-- #endregion -->

        <!--#region (菜單) -->
        <v-col cols="3" class="d-flex flex-wrap align-center gap-4">
            <div class="font-weight-bold text-subtitle-1">
                菜單：
            </div>
            <v-switch readonly inset class="w-max-content" color="primary" v-model="read_data['is_menu']"></v-switch>
        </v-col>
        <!-- #endregion -->

        <!--#region (停用狀態) -->
        <v-col cols="3" class="d-flex flex-wrap align-center gap-4">
            <div class="font-weight-bold text-subtitle-1">
                停用狀態：
            </div>
            <v-switch readonly inset class="w-max-content" color="primary" v-model="read_data['is_disabled']"></v-switch>
        </v-col>
        <!-- #endregion -->
        
    </v-row>
</template>

<script>
import { MenuService } from '@/api/services'
export default {
    name: "ReadMenuForm",
    components: {
    },
    props: ['id'],
    data() {

        return {
            loading: true,
            read_data: {
                title: null,
                path: null,
                name: null,
                component: null,
                is_menu: null,
                is_disabled: null,
                redirect: null,
                priority: null,
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
                    this.read_data = {
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

    },
}
</script>

<style scoped>
div.label-container {
    min-width: 150px;
}
</style>