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
            :fixed-header="false"
            @emitUpdateOptions="emitUpdateOptions"
            @create="emitCreate"
            show-expand
            >
        </CustomDataTable>
      </v-col>
    </v-row>


  </v-container>
</template>

<script>
import { GroupService } from '@/api/services';
import { get_api_pagniation_query_parameter, showConfirmDelete, showDeleteWarning } from "@/utils"
import CustomDataTable from "@/components/utils/CustomDataTable.vue";
export default {
  components: {
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
          sortBy: ['id'], // 排序
          sortDesc: [false], // 排序狀態
      },
      headers: [ // 欄位設定
          { text: 'id', value: 'id', sortable: true,},
          { text: '操作', value: 'actions', sortable: true,},
          { text: '角色名稱', value: 'name_zh', sortable: true,},
          { text: '角色代號', value: 'group_name', sortable: true,},
      ],



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
        const response = await GroupService.get_all_group_with_profiles(params)
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

        },
        

    


 

    //#endregion

  },
};
</script>

<style scoped>

</style>