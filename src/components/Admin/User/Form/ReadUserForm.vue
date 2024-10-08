<template>
    <v-form ref="form" 
        @submit.prevent="read" >

        <v-row class="justify-start">
            <!-- #region (帳號) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    帳號:
                </div>

                <v-text-field v-model="read_data['username']" readonly
                    background-color="white" outlined label="請填寫帳號"
                    placeholder="填寫範例: example">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (信箱) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    信箱:
                </div>

                <v-text-field v-model="read_data['email']" readonly
                    background-color="white" outlined label="請填寫信箱"
                    placeholder="填寫範例: example@gmail.com">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            
            <!-- #region (姓氏) -->
            <v-col cols="12" md="4" lg="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    姓氏:
                </div>

                <v-text-field v-model="read_data['lastname']" readonly
                    background-color="white" outlined label="請填寫姓氏"
                    placeholder="填寫範例: 林">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (名字) -->
            <v-col cols="12" md="4" lg="3" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    名字:
                </div>

                <v-text-field v-model="read_data['firstname']" readonly
                    background-color="white" outlined label="請填寫名字"
                    placeholder="填寫範例: 大明">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->

            
            <!-- #region (手機號碼) -->
            <v-col cols="12" md="4" lg="4" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    手機號碼:
                </div>

                <v-text-field v-model="read_data['phone_number']" readonly
                    background-color="white" outlined label="請填寫手機號碼"
                    placeholder="填寫範例: 0912345678">
                </v-text-field>
            </v-col> 
            <!-- #endregion -->


            <!-- #region (性別) -->
            <v-col cols="12" md="6" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    性別:
                </div>
                <v-radio-group readonly
                    v-model="read_data['gender']" row>
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
                <v-switch readonly
                    v-model="read_data['is_active']"
                    inset>
                    <template #label>
                        <span>{{ read_data['is_active'] ? '啟用' : '停用'}}</span>
                    </template>
                </v-switch>
            </v-col> 
            <!-- #endregion -->

            <!-- #region (角色選擇) -->
            <v-col cols="12" class="d-flex flex-column gap-2">
                <div class="label-container font-weight-bold text-subtitle-1">
                    角色選擇:
                </div>
                <GroupCheckedList v-model="read_data['groups']" readonly/>
            </v-col>
            <!-- #endregion -->

            <!-- #region (權限選擇) -->
            <v-col cols="12" class="d-flex flex-column gap-2">
                <PermissionCheckedList 
                    v-model="read_data['user_permissions']"
                    :group_checked="group_permission_checked"
                    readonly/>
            </v-col>
            <!-- #endregion -->
        </v-row>

    </v-form>
                
</template>

<script>
import { UserService } from '@/api/services'
import PermissionCheckedList from '../../Permission/PermissionCheckedList.vue';
import GroupCheckedList from '../../Group/GroupCheckedList.vue';
export default {
    name: "ReadUserForm",
    components: {
        PermissionCheckedList,
        GroupCheckedList
    },
    props: ['id'],

    data(){
        return {
            loading: true,
            read_data: {},

            group_permission_checked: [], // 透過Group選取的權限 (只會在 User相關頁面使用)

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
                    this.read_data = {
                        "username": response_data['username'],
                        "email": response_data['email'],
                        "firstname": response_data['firstname'],
                        "lastname": response_data['lastname'],
                        "phone_number": response_data['phone_number'],
                        "gender": response_data['gender'],
                        "is_active": response_data['is_active'],
                        "user_permissions": response.data.user_permissions.map(permission => permission.id),
                        "groups": response.data.groups.map(group => group.id),
                    }
                    
                    // 透過Group選取的權限 (只會在 User相關頁面使用)
                    this.group_permission_checked = response_data.groups.flatMap(group => group.permissions)
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
    div.label-container{
        min-width: 150px;
    }
   
</style>
