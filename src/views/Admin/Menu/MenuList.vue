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
    </v-row>
  </v-container>
</template>

<script>
import CustomDialog from "@/components/utils/CustomDialog.vue";
import { MenuService } from '@/api/services';
import { get_api_pagniation_query_parameter } from "@/utils"
export default {
  components: {
    CustomDialog,
  },
  data() {
    return {
      dialog: false,
      //#region (API擷取)
      loading: true,
      items: [],
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
    async fetchData(){
      this.loading = true
      try{
        // 得到Pagination必要的parameter
        const params = get_api_pagniation_query_parameter(this.options)
        const response = await MenuService.getAll(params)
        if(response.status === 200){
          console.log(response.data);
        }
      }
      catch(err){
        console.error(err);
      }
      finally{
        this.loading = false
      }
    },

  },
};
</script>

<style>
</style>