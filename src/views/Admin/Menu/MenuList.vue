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
            :disabled_select="disabled_select"
            fixed-header
            :height="550"
            @emitUpdateOptions="emitUpdateOptions"
            @create="emitCreate"
            show-expand

            >
            <!--#region (Items) -->
            <template v-slot:item="{ item, headers, expand, isExpanded }">
              <MenuTableItem
                  :class="{ 'green lighten-5' : isExpanded}"
                  :item="item" 
                  :headers="headers" 
                  :expand="expand" 
                  :isExpanded="isExpanded"
                  :actions_buttons="actions_buttons"
              />
              
            </template>
            <!-- #endregion -->

            <template v-slot:expanded-item="{ headers, item }">
              <MenuTableItem
                  class="expanded-row"
                  v-for="menu in item['children']"
                  :key="menu['id']"
                  :item="menu" 
                  :headers="headers" 
                  :expand="expand" 
                  :isExpanded="isExpanded"
                  :actions_buttons="actions_buttons"
              />
            </template>

            <template #expand="{item}">
              <div>
                <h6 class="font-weight-bold text-subtitle-2">{{ item['title'] }}</h6>
              </div>
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
        <div>
          Create
        </div>
      </template>
    </CustomDialog>

    <!-- Read -->
    <CustomDialog 
      v-model="read_dialog"
      title="瀏覽菜單"
      color="grey darken-2">
      <template v-slot:body>
        <div>
          Read
        </div>
      </template>
    </CustomDialog>

    <!-- Update -->
    <CustomDialog 
      v-model="update_dialog"
      title="修改菜單"
      color="primary darken-2">
      <template v-slot:body>
        <div>
          Update
        </div>
      </template>
    </CustomDialog>
  </v-container>
</template>

<script>
import CustomDialog from "@/components/utils/CustomDialog.vue";
import CustomDataTable from "@/components/utils/CustomDataTable.vue";
import { MenuService } from '@/api/services';
import { get_api_pagniation_query_parameter } from "@/utils"
import MenuTableItem from '@/components/Admin/Menu/MenuTableItem.vue';
export default {
  components: {
    CustomDialog,
    CustomDataTable,
    MenuTableItem,
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
          { text: '路徑', value: 'path', sortable: true,},
          { text: '組件名稱', value: 'name', sortable: true,},
          { text: '組件路徑', value: 'component', sortable: true,},
          { text: '跳轉路徑', value: 'redirect', sortable: true,},
          { text: '創建時間', value: 'created_at', sortable: true, },
          { text: '更新時間', value: 'updated_at', sortable: true, },
      ],

      //#endregion
    
      //#region (Dialog)
      create_dialog: false,
      read_dialog: false,
      update_dialog: false,
      //#endregion

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
        const response = await MenuService.getAll(params)
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
        },
        update(id){
          this.update_dialog = true
        },
        delete(id){
          this.$swal.fire("刪除", id, "warning")
        },

    //#endregion

  },
};
</script>

<style>
    .expanded-row td:first-child {
        border-left: 10px solid green !important;
    }
</style>