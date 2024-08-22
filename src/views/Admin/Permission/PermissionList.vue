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
          height="500px"
          :loading="loading"
          :disabled_select="disabled_select"
          :fixed-header="false"
          @emitUpdateOptions="emitUpdateOptions"
          @read="emitRead"
          @update="emitUpdate"
          :actions="['read', 'update']"
          show-expand
        > 
        </CustomDataTable>
      </v-col>
    </v-row>


    <!-- Read -->
    <CustomDialog v-model="read_dialog" title="瀏覽權限" color="grey darken-2">
      <template v-slot:body>
        <ReadPermissionForm v-if="read_dialog" :id="read_id" />
      </template>
    </CustomDialog>

    <!-- Update -->
    <CustomDialog
      v-model="update_dialog"
      title="修改權限"
      color="primary darken-2"
    >
      <template v-slot:body>
        <UpdatePermissionForm v-if="update_dialog" :id="update_id" @refresh="refreshData" />
      </template>
    </CustomDialog>
  </v-container>
</template>

<script>
import { PermissionService } from "@/api/services";
import {
  get_api_pagniation_query_parameter,
  showConfirmDelete,
  showDeleteWarning,
} from "@/utils";
import CustomDataTable from "@/components/utils/Table/CustomDataTable.vue";
import CustomDialog from "@/components/utils/CustomDialog.vue";
import ReadPermissionForm from "@/components/Admin/Permission/Form/ReadPermissionForm.vue";
import UpdatePermissionForm from "@/components/Admin/Permission/Form/UpdatePermissionForm.vue";
export default {
  components: {
    CustomDataTable,
    CustomDialog,
    ReadPermissionForm,
    UpdatePermissionForm,
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
      disabled_select: ["codename"], // 不給選的 (text)

      options: {
        // 表格設定
        page: 1, // 當前頁數
        itemsPerPage: 30, // 單頁筆數: -1: 代表全部顯示
        sortBy: ["id"], // 排序
        sortDesc: [false], // 排序狀態
      },
      headers: [
        // 欄位設定
        { text: "編號", value: "id", sortable: true },
        { text: "操作代號", value: "codename", sortable: true },
        { text: "操作", value: "actions", sortable: false },
        { text: "操作說明", value: "name", sortable: true },
        { text: "操作對象", value: "content_type_name", sortable: false},
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
        const response = await PermissionService.get_all(params);
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
    
   
    emitRead(id){
      this.read_id = id
      this.read_dialog = true
    },
    emitUpdate(id){
      this.update_id = id
      this.update_dialog = true
    },
 
    //#endregion
  },
};
</script>

<style scoped>
</style>