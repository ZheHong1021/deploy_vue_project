<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn @click="dialog = true">新增數據</v-btn>
        <CustomDialog v-model="dialog">
          <template v-slot:body>
            <div>
              測試內容
            </div>
          </template>
        </CustomDialog>
       
      </v-col>

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
            @create="clickCreateButton"
            show-select
            >
            <!--#region (Items) -->
            <template #item.icon="{item}">
              <td>
                <v-icon>{{ item['icon'] }}</v-icon>
              </td>
            </template>
            <!-- #endregion -->

            <template #expand="{item}">
              <div>
                <h6 class="font-weight-bold text-subtitle-2">{{ item['title'] }}</h6>
              </div>
            </template>
        </CustomDataTable>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomDialog from "@/components/utils/CustomDialog.vue";
import CustomDataTable from "@/components/utils/CustomDataTable.vue";
import { MenuService } from '@/api/services';
import { get_api_pagniation_query_parameter } from "@/utils"
export default {
  components: {
    CustomDialog,
    CustomDataTable,
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
          sortDesc: [true], // 排序狀態
      },
      headers: [ // 欄位設定
          { text: '菜單標題', value: 'title', sortable: true,},
          { text: '菜單圖案', value: 'icon', sortable: true,},
          { text: '創建時間', value: 'created_at', sortable: true, },
          { text: '更新時間', value: 'updated_at', sortable: true, },
      ],

      //#endregion
    };
  },

  computed: {

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

        clickCreateButton(){
            this.$router.push({
                name: "CreateAnnouncement"
            })
        },

    //#endregion

  },
};
</script>

<style>
</style>