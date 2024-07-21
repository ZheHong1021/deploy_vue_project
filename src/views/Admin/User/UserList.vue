<template>
  <v-container fluid>
    <v-row>
      <!-- 表格區域 -->
      <v-col cols="12">
        <CustomDataTable
          :items="items"
          :itemsLength="itemsLength"
          :options="options"
          :headers="headers"
          height="100%"
          :loading="loading"
          :disabled_select="disabled_select"
          :fixed-header="false"
          @emitUpdateOptions="emitUpdateOptions"
          @create="emitCreate"
          @read="emitRead"
          @update="emitUpdate"
          @delete="emitDelete"
          show-expand
        > 
        <!-- #region (Item) -->
        <!-- 年齡(age) -->
          <template v-slot:item.age="{item}">
            <td>
              <template v-if="item['age']">{{ item['age'] }}歲</template>
              <template v-else>未提供</template>
            </td>
          </template>

        <!-- 性別(gender) -->
          <template v-slot:item.gender="{item}">
            <td>
              <v-icon :color="get_gender_style(item['gender'], 'color')">
                {{ get_gender_style(item['gender'], 'icon') }}
              </v-icon>
              {{ item['gender_display'] }}
            </td>
          </template>


        <!-- 啟動狀態(is_active) -->
          <template v-slot:item.is_active="{item}">
            <td>
              <v-chip class="elevation-4 black--text font-weight-bold" 
                label
                :color="get_is_active_style(item['is_active'], 'bg_color')"
              >
                <v-icon small left 
                  :color="get_is_active_style(item['is_active'], 'color')">
                  mdi-circle
                </v-icon>
                {{ get_is_active_style(item['is_active'], 'text') }}
              </v-chip>
            </td>
          </template>

          <!-- 最後登入時間(last_login) -->
          <template v-slot:item.last_login="{item}">
            <td>
              <span class="font-weight-bold grey--text text--darken-2">
                <template v-if="item['last_login']">{{ item['last_login'] }}</template>
                <template v-else>
                  <v-icon color='red'>mdi-close-thick</v-icon>
                  無登入紀錄
                </template>
              </span>
            </td>
          </template>

        <!-- #endregion -->
        </CustomDataTable>
      </v-col>
    </v-row>

    <!-- Create -->
    <CustomDialog
      v-model="create_dialog"
      title="新增角色"
      color="pink darken-2"
    >
      <template v-slot:body>
        <CreateUserForm v-if="create_dialog" @refresh="refreshData" />
      </template>
    </CustomDialog>

    <!-- Read -->
    <CustomDialog v-model="read_dialog" title="瀏覽角色" color="grey darken-2">
      <template v-slot:body>
        <ReadUserForm v-if="read_dialog" :id="read_id" />
      </template>
    </CustomDialog>

    <!-- Update -->
    <CustomDialog
      v-model="update_dialog"
      title="修改角色"
      color="primary darken-2"
    >
      <template v-slot:body>
        <UpdateUserForm v-if="update_dialog" :id="update_id" @refresh="refreshData" />
      </template>
    </CustomDialog>
  </v-container>
</template>

<script>
import { UserService } from "@/api/services";
import {
  get_api_pagniation_query_parameter,
  showConfirmDelete,
  showDeleteWarning,
} from "@/utils";
import CustomDataTable from "@/components/utils/CustomDataTable.vue";
import CustomDialog from "@/components/utils/CustomDialog.vue";
import CreateUserForm from "@/components/Admin/User/Form/CreateUserForm.vue";
import ReadUserForm from "@/components/Admin/User/Form/ReadUserForm.vue";
import UpdateUserForm from "@/components/Admin/User/Form/UpdateUserForm.vue";
export default {
  components: {
    CustomDataTable,
    CustomDialog,
    CreateUserForm,
    ReadUserForm,
    UpdateUserForm,
  },
  data() {
    return {
      dialog: false,

      //#region (API擷取)
      loading: true,
      items: [],
      itemsLength: 0, // 資料長度
      //#endregion

      //#region (表格)
      // 欄位顯示
      disabled_select: ["username"], // 不給選的 (text)

      options: {
        // 表格設定
        page: 1, // 當前頁數
        itemsPerPage: 30, // 單頁筆數: -1: 代表全部顯示
        sortBy: ["last_login"], // 排序
        sortDesc: [true], // 排序狀態
      },
      headers: [
        // 欄位設定
        { text: "帳號", value: "username", sortable: true },
        { text: "姓名", value: "fullname", sortable: true },
        { text: "操作", value: "actions", sortable: false},
        { text: "信箱", value: "email", sortable: true },
        { text: "年齡", value: "age", sortable: true },
        { text: "性別", value: "gender", sortable: true },
        { text: "啟動狀態", value: "is_active", sortable: true },
        { text: "最後登入時間", value: "last_login", sortable: true },
      ],

      
      //#endregion

      //#region (Dialog)
      create_dialog: false,
      read_dialog: false,
      update_dialog: false,
      read_id: null, // 要修改的數據ID
      update_id: null, // 要修改的數據ID
      //#endregion
    };
  },

  computed: {
  },

  async mounted() {
    await this.fetchData();
  },

  methods: {
    //#region (API擷取)
    async fetchData() {
      this.loading = true;
      try {
        // 得到Pagination必要的parameter
        const params = get_api_pagniation_query_parameter(this.options);
        const response = await UserService.get_all(params);
        if (response.status === 200) {
          const { data, count } = response.data;
          this.items = data;
          this.itemsLength = count;
        }
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    //#endregion

    //#region (表格欄位樣式)
    // 得到啟用狀態樣式
    get_gender_style(item, mode='color'){
      const gender_style = {
        'male': {
          color: 'indigo',
          icon: 'mdi-face-man',
        },
        'female': {
          color: 'pink',
          icon: 'mdi-face-woman',
        },
        'other': {
          color: 'blue-grey darken-2',
          icon: 'mdi-gender-non-binary',
        },
        'private': {
          color: 'grey darken-2',
          icon: 'mdi-crosshairs-question',
        },
       
      }

      return gender_style[item][mode]
    },
    
    // 得到啟用狀態樣式
    get_is_active_style(item, mode='text'){
      const is_active_style = {
        true: {
          color: 'green',
          bg_color: 'success lighten-5',
          text: '啟用',
        },
        false: {
          color: 'red',
          bg_color: 'error lighten-5',
          text: '停用',
        },
      }

      return is_active_style[item][mode]
    },
    //#endregion
    
    // 更新option並且重新呼叫API
    emitUpdateOptions(options) {
      this.options = options;
      this.fetchData();
    },


    //#region ($emit)
    async refreshData(){
      // 重新讀取資料
      await this.fetchData()
      this.create_dialog = false
      this.update_dialog = false
    },
    
    emitCreate(){
      this.create_dialog = true
    },
    emitRead(id){
      this.read_id = id
      this.read_dialog = true
    },
    emitUpdate(id){
      this.update_id = id
      this.update_dialog = true
    },
    async emitDelete(id){
        const first_response = await showDeleteWarning() // 第一次提醒Alert
        if(first_response.isConfirmed){ // 點擊確定
          const is_confirm = await showConfirmDelete() // 最後一次確定的 alert
          if(is_confirm){ // 最後一次依舊確定
            try{ // 進行刪除
                const response = await UserService.delete(id)
                if(response.status === 204){
                    this.$swal.fire('刪除成功', '', 'success')
                    await this.fetchData() // 重新讀取資料
                }
            }
            catch(err){
                this.$swal.fire('刪除失敗', err, 'error')
            }
          }
        }
    },
    //#endregion
  },
};
</script>

<style scoped>
</style>