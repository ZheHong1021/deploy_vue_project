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

        </CustomDataTable>
      </v-col>
    </v-row>

    <!-- Create -->
    <CustomDialog
      v-model="create_dialog"
      title="新增產品分類"
      color="pink darken-2"
    >
      <template v-slot:body>
        <CreateProductCategoryForm v-if="create_dialog" @refresh="refreshData" />
      </template>
    </CustomDialog>

    <!-- Read -->
    <CustomDialog v-model="read_dialog" title="瀏覽產品分類" color="grey darken-2">
      <template v-slot:body>
        <ReadProductCategoryForm v-if="read_dialog" :id="read_id" />
      </template>
    </CustomDialog>

    <!-- Update -->
    <CustomDialog
      v-model="update_dialog"
      title="修改產品分類"
      color="primary darken-2"
    >
      <template v-slot:body>
        <UpdateProductCategoryForm 
          v-if="update_dialog" 
          :id="update_id" 
          @refresh="refreshData" 
        />
      </template>
    </CustomDialog>
  </v-container>
</template>

<script>
import { ProductCategoryService } from "@/api/services";
import {
  get_api_pagniation_query_parameter,
  showConfirmDelete,
  showDeleteWarning,
} from "@/utils";
import CustomDataTable from "@/components/utils/Table/CustomDataTable.vue";
import CustomDialog from "@/components/utils/CustomDialog.vue";
import CreateProductCategoryForm from "@/components/Operation/Product/Category/Form/CreateProductCategoryForm.vue";
import ReadProductCategoryForm from "@/components/Operation/Product/Category/Form/ReadProductCategoryForm.vue";
import UpdateProductCategoryForm from "@/components/Operation/Product/Category/Form/UpdateProductCategoryForm.vue";
import ProductStatus from '@/components/Operation/Product/ProductStatus.vue';
export default {
  components: {
    CustomDataTable,
    CustomDialog,
    ProductStatus,
    CreateProductCategoryForm,
    ReadProductCategoryForm,
    UpdateProductCategoryForm,
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
      disabled_select: ["name"], // 不給選的 (text)

      options: {
        // 表格設定
        page: 1, // 當前頁數
        itemsPerPage: 30, // 單頁筆數: -1: 代表全部顯示
        sortBy: ["created_at"], // 排序
        sortDesc: [true], // 排序狀態
      },
      headers: [
        // 欄位設定
        { text: "種類名稱", value: "name", sortable: true },
        { text: "操作", value: "actions", sortable: true },
        { text: "描述", value: "description", sortable: true },
        { text: "顏色", value: "color", sortable: true },
        { text: "建立時間", value: "created_at", sortable: true },
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
        const response = await ProductCategoryService.get_all(params);
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
                const response = await ProductCategoryService.delete(id)
                if(response.status === 204){
                    this.$swal.fire('刪除成功', '', 'success')
                    await this.fetchData() // 重新讀取資料
                }
            }
            catch(err){
              console.log(err);
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