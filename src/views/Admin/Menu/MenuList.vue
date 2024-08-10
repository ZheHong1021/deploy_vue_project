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
            :loading="loading"
            height="100%"
            :disabled_select="disabled_select"
            :fixed-header="false"
            @emitUpdateOptions="emitUpdateOptions"
            @create="emitCreate"
            show-expand
            >
            <template v-slot:item="{ item, headers, expand, isExpanded }">
              <MenuTableItem
                  :class="{ 'purple lighten-5' : isExpanded}"
                  :item="item" 
                  :headers="headers" 
                  :expand="expand" 
                  :isExpanded="isExpanded"
                  :actions_buttons="actions_buttons"
              />
              
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <MenuRecursiveTable 
                    :items="item['children']"
                    :headers="headers"
                    :loading="loading"
                    hide-default-header
                    :actions_buttons="actions_buttons"
                    :depth="depth + 1">
                </MenuRecursiveTable>
            </td>
            </template>
        </CustomDataTable>
      </v-col>
    </v-row>


    <!-- Create -->
    <CustomDialog 
      v-model="create_dialog"
      title="新增菜單"
      color="pink darken-2">
      <template v-slot:body>
        <CreateMenuForm v-if="create_dialog" @refresh="refreshData"/>
      </template>
    </CustomDialog>

    <!-- Read -->
    <CustomDialog 
      v-model="read_dialog"
      title="瀏覽菜單"
      color="grey darken-2">
      <template v-slot:body>
        <ReadMenuForm v-if="read_dialog"
          :id="read_id"
        />
      </template>
    </CustomDialog>

    <!-- Update -->
    <CustomDialog 
      v-model="update_dialog"
      title="修改菜單"
      color="primary darken-2">
      <template v-slot:body>
        <UpdateMenuForm v-if="update_dialog"
          :id="update_id"
          @refresh="refreshData"
        />
      </template>
    </CustomDialog>
  </v-container>
</template>

<script>
import { MenuService } from '@/api/services';
import { get_api_pagniation_query_parameter, showConfirmDelete, showDeleteWarning } from "@/utils"
import CustomDialog from "@/components/utils/CustomDialog.vue";
import CustomDataTable from "@/components/utils/Table/CustomDataTable.vue";
import MenuTableItem from '@/components/Admin/Menu/MenuTableItem.vue';
import MenuRecursiveTable from "@/components/Admin/Menu/MenuRecursiveTable.vue"
import ReadMenuForm from '@/components/Admin/Menu/Form/ReadMenuForm.vue';
import CreateMenuForm from '@/components/Admin/Menu/Form/CreateMenuForm.vue';
import UpdateMenuForm from '@/components/Admin/Menu/Form/UpdateMenuForm.vue';
export default {
  components: {
    CustomDialog,
    CustomDataTable,
    MenuTableItem,
    MenuRecursiveTable,
    ReadMenuForm,
    CreateMenuForm,
    UpdateMenuForm,
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
      disabled_select: ['title'], // 不給選的 (text)
      
      options: { // 表格設定
          page: 1, // 當前頁數
          itemsPerPage: 30, // 單頁筆數: -1: 代表全部顯示
          sortBy: ['priority'], // 排序
          sortDesc: [false], // 排序狀態
      },
      headers: [ // 欄位設定
          { text: '', value: 'data-table-expand' },
          { text: '菜單標題', value: 'title', sortable: true,},
          { text: '操作', value: 'actions', sortable: true,},
          { text: '菜單圖案', value: 'icon', sortable: true,},
          { text: '顯示順序', value: 'priority', sortable: true,},
          { text: '菜單', value: 'is_menu', sortable: true,},
          { text: '狀態', value: 'is_disabled', sortable: true,},
          { text: '路徑', value: 'path', sortable: true,},
          { text: '組件名稱', value: 'name', sortable: true,},
          { text: '組件路徑', value: 'component', sortable: true,},
          { text: '跳轉路徑', value: 'redirect', sortable: true,},
      ],

      //#endregion
    
      //#region (Dialog)
      create_dialog: false,
      read_dialog: false,
      update_dialog: false,
      read_id: null, // 要修改的數據ID
      update_id: null, // 要修改的數據ID
      //#endregion

      depth: 1,

    };
  },

  computed: {
    actions_buttons(){
        return [
            {
                title: '瀏覽', 
                icon: 'mdi-eye', icon_color: 'grey darken-1', 
                tooltip_color: 'grey lighten-2', 
                btn_color: 'blue-grey lighten-4', 
                onClick: this.read,
            },
            {
                title: '修改', 
                icon: 'mdi-pencil', icon_color: 'primary darken-1', 
                tooltip_color: 'blue lighten-4', 
                btn_color: 'primary lighten-4', 
                onClick: this.update,
            },
            {
                title: '刪除', 
                icon: 'mdi-delete', icon_color: 'error darken-1', 
                tooltip_color: 'error lighten-4', 
                btn_color: 'error lighten-4', 
                onClick: this.delete,
            },
        ]
    } 
  },

  async mounted() {
    await this.fetchData()
  },

  methods: {
    //#region (API擷取)
    async fetchData(){
      this.loading = true
      try{
        // 得到Pagination必要的parameter
        const params = get_api_pagniation_query_parameter(this.options)

        // 只抓取Parent Menu
        params.append("is_children", false)

        // 必須包含Children
        params.append("include_children", true)
        const response = await MenuService.get_all(params)
        if(response.status === 200){
          const { data, count } = response.data
          this.items = data
          this.itemsLength = count
        }
      }
      catch(err){
        console.error(err);
      }
      finally{
        this.loading = false
      }
    },
    //#endregion

    //#region ($emit)
    // 更新option並且重新呼叫API
        emitUpdateOptions(options){
            this.options = options
            this.fetchData()
        },
        
        emitCreate(){
          this.create_dialog = true
        },
        read(id){
          this.read_dialog = true
          this.read_id = id
        },
        
        update(id){
          this.update_dialog = true
          this.update_id = id
        },

        async delete(id){
            const first_response = await showDeleteWarning() // 第一次提醒Alert
            if(first_response.isConfirmed){ // 點擊確定
              const is_confirm = await showConfirmDelete() // 最後一次確定的 alert
              if(is_confirm){ // 最後一次依舊確定
                try{ // 進行刪除
                    const response = await MenuService.delete(id)
                    if(response.status === 204){
                        this.$swal.fire('刪除成功', '', 'success')
                        await this.fetchData() // 重新讀取資料
                        await this.$store.dispatch("menu/getMenus")
                    }
                }
                catch(err){
                    this.$swal.fire('刪除失敗', err, 'error')
                }
              }
            }
        },


        async refreshData(){
          // 重新讀取資料
          await this.fetchData()
          this.create_dialog = false
          this.update_dialog = false
        },

    //#endregion

  },
};
</script>

<style scoped>

</style>