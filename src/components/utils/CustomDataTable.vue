<template>
    <v-row>
        <!-- 欄位顯示功能 -->
        <v-col cols="12" v-if="!hideFilterColumn" class="d-flex flex-wrap gap-4 align-end">
            
            <!-- 搜尋功能 -->
            <v-text-field
                ref="table-search"
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                label="搜尋..."
                single-line
                outlined
                background-color="white"
                hide-details
                style="max-width: 250px;"
                @change="goSearch"
                clearable clear-icon="mdi-close-circle"
                @click:clear="clearSearch"
            ></v-text-field>

            <!-- 新增按鈕 -->
            <v-btn 
                v-if="!hideCreate"
                :x-small="rwd_name === 'xs'" 
                :small="rwd_name !== 'xs'"
                height="50" class="d-flex align-center rounded-lg" 
                color="pink darken-2" 
                :disabled="loading"
                @click="create">
                <v-icon color="white" left size="20">mdi-plus-circle</v-icon>
                <span class="font-weight-black text-subtitle-1 white--text">
                    {{ createButtonText }}
                </span>
            </v-btn>

            
            <!-- 欄位顯示 -->
            <v-menu v-model="show_header_menu" :close-on-content-click="false" :nudge-width="200" offset-y>
               <template v-slot:activator="{ on, attrs }">
                   <v-btn :x-small="rwd_name === 'xs'" :small="rwd_name !== 'xs'"
                       height="50" class="d-flex align-center rounded-lg" 
                       :color="show_header_menu ? 'grey darken-3' : 'blue-grey lighten-3'"
                       v-bind="attrs" v-on="on">
                           <v-icon left size="20" :color="show_header_menu ? 'white' : 'black'">mdi-eye</v-icon>
                           <span class="font-weight-black text-subtitle-1" :class="show_header_menu ? 'white--text' : 'black--text'">欄位顯示</span>
                   </v-btn>
               </template>

               <!-- 觸發內容(selected: vuex的chart_selected ； items: vuex的當前檢驗數據所參與的場列表) -->
               <v-card>
                   <CustomMenuSelectList 
                       :selected="selectedHeaders"
                       :items="headers"
                       :disabled_select="disabled_select"
                       item-title="欲顯示及匯出的欄位"
                       item-text="text"
                       item-value="value"
                       icon="mdi-view-column-outline"
                       icon-color="grey lighten-3"
                       @change="changeSelect"
                       @toggle="changeSelect"
                   />
               </v-card>
            </v-menu>


            <!-- 匯出按鈕 -->
            <v-btn 
                v-if="!hideExport"
                :x-small="rwd_name === 'xs'" 
                :small="rwd_name !== 'xs'"
                height="50" class="d-flex align-center rounded-lg" 
                color="indigo darken-2" 
                :disabled="loading"
                @click="exportExcel('all')">
                <v-icon color="white" left size="20">mdi-file-export</v-icon>
                <span class="font-weight-black text-subtitle-1 white--text">匯出報表</span>
            </v-btn>
            
            <v-spacer></v-spacer>

            <!-- 排序資訊 -->
            <CustomSortDisplay
                v-if="!hideSortBox"
                :sortBy="options['sortBy'][0]"
                :sortDesc="options['sortDesc'][0]"
                :headers="headers"
                @clearSortable="clearSortable"
            />
            
        </v-col>

        <!-- 表格 -->
        <v-col cols="12">
            <v-data-table
                class="data-table elevation-2"
                :headers="selectedHeaders"
                :items="items"
                item-key="id"
                :item-class="itemRowBackground"
                :server-items-length="itemsLength"
                :loading="loading"
                loading-text="載入資料中"
                :options.sync="emitOptions"
                :footerProps="footerProps"
                hide-default-footer
                :hide-default-header="hideDefaultHeader"
                @update:options="emitUpdateOptions"
                :mobile-breakpoint="0"
                fixed-header
                :height="table_height"
                :show-group-by="showGroupBy"
                :search="search"
                no-data-text="無任何資料"
                no-results-text="查詢不到你所蒐尋的內容"
                v-model="selected"
                :show-select="showSelect"
                single-expand
                :show-expand="showExpand"
                :expanded.sync="expanded"
            >   

                <!-- Header Group -->
                <template v-slot:group.header="{ group, isOpen, toggle, items }">
                    <td :colspan="headers.length" class="grey lighten-2 pointer"
                        :ref="`group-expand-${isOpen}-${group}`"
                        @click="toggle">
                        <div class="group-sticky-column d-flex align-end gap-2">
                            <v-btn fab :color="isOpen ? '' : 'grey darken-1'" x-small>
                                <v-icon :color="isOpen ? 'grey darken-4' : 'amber darken-2'" small>
                                    {{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
                                </v-icon>
                            </v-btn>
                            
                            <span class="font-weight-black text-subtitle-2 text-md-subtitle-1 ">
                                群組名稱: {{ group }}
                            </span>
                            
                            <!-- 數量 -->
                            <v-chip class="white--text font-weight-bold" label color="success darken-1" small>
                                數量: {{ items.length }}
                            </v-chip>
                        </div>
                    </td>
                </template>



                <!-- #region (Parent Slots) -->
                <!-- pass through scoped slots -->
                <template
                    v-for="(_, scopedSlotName) in $scopedSlots"
                    v-slot:[scopedSlotName]="slotData"
                >
                    <slot :name="scopedSlotName" v-bind="slotData" />
                </template>

                <!-- pass through normal slots -->
                <!-- https://stackoverflow.com/questions/69455710/vuetify-access-v-slotitem-in-datatable-custom-component -->
                <template 
                    v-for="(_, slotName) in $slots" 
                    v-slot:[slotName]>
                        <slot :name="slotName" />
                </template>
                <!-- #endregion -->

                <!-- 操作(item.actions) -->
                <template #item.actions="{item}">
                    <td @click.stop class="py-4">
                        <template v-for="btn in actions_buttons">
                            <v-tooltip 
                                :key="btn['title']"
                                v-if="!btn['hide']"
                                bottom 
                                :color="btn['tooltip_color']">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab x-small class="mx-1" v-bind="attrs" v-on="on"
                                        :color="btn['btn_color']"
                                        @click="btn.onClick(item['id'])"
                                        >
                                        <v-icon small :color="btn['icon_color']">
                                            {{btn['icon']}}
                                        </v-icon>
                                    </v-btn>
                                </template>
                                <span class="black--text font-weight-bold">
                                    {{ btn['title'] }}
                                </span>
                            </v-tooltip>
                        </template>
                    </td>
                </template>

                <!-- Expand -->
                <template v-slot:item.data-table-expand="{ item, expand, isExpanded }">
                    <v-btn @click="expand(!isExpanded)"
                        icon  v-if="item['children'] && item['children'].length > 0">
                        <v-icon>
                            {{ isExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                        </v-icon>
                    </v-btn>
                </template>

                <!-- Expanded Item -->
                <!-- <template v-slot:expanded-item="{ item, headers }">
                 
                </template> -->
         

                <!-- 頁尾 -->
                <template v-slot:footer="{ 
                    props: {
                        options: {page},
                        pagination: {pageStart, pageStop, pageCount},
                        itemsPerPageText
                    }
                }">
                <!-- 客製化 -->
                    <v-container fluid class="white d-flex flex-wrap justify-space-between align-center gap-8 py-4">
                        <!-- 查詢筆數 -->
                        <div class="d-flex align-center gap-2">
                            <v-icon color="primary" >
                                mdi-information
                            </v-icon>
                            <span class="font-weight-bold text-subtitle-1 text-sm-h6">查詢資料筆數: {{ itemsLength }}</span>
                        </div>
                        
                        
                        <div class="d-flex flex-wrap gap-8">
                            <div class="d-flex flex-wrap gap-8 align-end">
                                <!-- 單頁幾筆 -->
                                <div class="d-flex gap-2 flex-column flex-sm-row align-start align-sm-center" >
                                    <h6 class="font-weight-black text-subtitle-2">
                                        <!-- 單頁筆數： -->
                                        {{ itemsPerPageText }}
                                    </h6>
                                    <v-select 
                                        v-model="emitOptions['itemsPerPage']" 
                                        :items="footerProps['itemsPerPageOptions']"
                                        item-text="text"
                                        item-value="value"
                                        outlined label="顯示數" 
                                        background-color="grey lighten-4" 
                                        dense hide-details
                                        style="max-width: 120px;"
                                        @change="updateItemsPerPage"
                                        >
                                    </v-select>
                                </div>
        
                                <!-- 第幾筆 -->
                                <v-chip color="grey darken-2" label small
                                    class="white--text text-subtitle-2 text-sm-subtitle-1 py-4">
                                    {{ pageStart + 1 }} ~ {{ pageStop }} 
                                    &nbsp;(共{{ itemsLength }}筆)
                                </v-chip>
                            </div>
    
                            <!-- 換頁 -->
                            <div class="d-flex align-center gap-2">
                                <!-- 往第一頁 -->
                                <!-- Disabled: 添加 Loading => 避免重複 -->
                                <v-btn  x-small height="34" 
                                    :disabled="loading || page === 1 || pageCount === 0"
                                    color="grey lighten-4" class="text-subtitle-2 primary--text"
                                    @click="updatePage(1)">
                                    <v-icon :small="is_mobile">mdi-skip-previous</v-icon>
                                </v-btn>
    
                                <!-- 往前一頁 -->
                                <v-btn  x-small height="34" 
                                    :disabled="loading || page === 1 || pageCount === 0"
                                    color="grey lighten-4" class="text-subtitle-2 primary--text"
                                    @click="updatePage(emitOptions['page'] - 1)">
                                    <v-icon :small="is_mobile">mdi-chevron-left</v-icon>
                                </v-btn>
                                
                                <!-- 頁數 -->
                                <span class="text-subtitle-1 text-sm-h6">
                                    第
                                    {{ page }} / {{ pageCount }}
                                    頁
                                </span>
    
                                <!-- 往下一頁 -->
                                <v-btn  x-small height="34" 
                                    :disabled="loading || page === pageCount || pageCount === 0"
                                    color="grey lighten-4" class="text-subtitle-2 primary--text"
                                    @click="updatePage(emitOptions['page'] + 1)">
                                    <v-icon :small="is_mobile">mdi-chevron-right</v-icon>
                                </v-btn>
    
                                <!-- 往最後一頁 -->
                                <v-btn  x-small height="34" 
                                    :disabled="loading || page === pageCount || pageCount === 0"
                                    color="grey lighten-4" class="text-subtitle-2 primary--text"
                                    @click="updatePage(pageCount)">
                                    <v-icon :small="is_mobile">mdi-skip-next</v-icon>
                                </v-btn>
    
                            </div>
                        </div>

                    </v-container>

                </template>

            </v-data-table>
        </v-col>

        <!-- 表格單一選擇匯出 -->
        <CustomTableSelectExpand
            :table_selected="selected"
            @delete="deleteSelect"
            @delete-all="selected = []"
            @export="exportExcel('select')"
            >
            <!-- 客製化顯示畫面 -->
            <template v-slot:expand="slotData">
                <slot name="expand" v-bind="slotData" />
            </template>
        </CustomTableSelectExpand>
    </v-row>
</template>

<script>
import CustomSortDisplay from '@/components/utils/CustomSortDisplay.vue'
import CustomMenuSelectList from '@/components/utils/CustomMenuSelectList.vue'
import CustomTableSelectExpand from '@/components/utils/CustomTableSelectExpand.vue'
export default {
    // 只適用於跟 Server相關的表格
    name: "CustomDataTable",
    components:{
        CustomSortDisplay, // 排序狀態
        CustomMenuSelectList, // 欄位篩選
        CustomTableSelectExpand, // 表格單一選擇匯出
    },
    props: {
        fixHeader: { // 是否有要固定表頭
            type: Boolean,
            default: false,
        },

        height: { // 表格最大高度(通常要跟 fixHeader搭配使用)
            type: Number,
            default: undefined,
        },

        items: { // 表格數據
            type: Array,
            default: () => []
        },

        itemsLength: { // 表格數據數量
            type: Number,
            default: 0,
        },

        headers: { // 表頭資訊
            type: Array,
            default: () => []
        },

        options: { // 設定 (第幾頁、單筆筆數、排序、排序狀態)
            type: Object,
            default: () => {}
        },

        loading: { // 是否在載入數據
            type: Boolean,
            default: true,
        },

        loading_text: { // 載入時的文字
            type: String,
            default: '載入資料中',
        },

        
        disabled_select: { // 在篩選欄位顯示功能 disabled不給選取
            type: Array,
            default: () => []
        },
        showGroupBy:{ // 顯示群組
            type: Boolean,
            default: false,
        },
        
        showSelect:{ // 顯示 select可以進行單選
            type: Boolean,
            default: false,
        },
        
        showExpand:{ // 顯示 expand
            type: Boolean,
            default: false,
        },

        hideFilterColumn: { // 隱藏篩選欄位顯示的功能
            type: Boolean,
            default: false,
        },
        hideSortBox: { // 隱藏排序顯示功能
            type: Boolean,
            default: false,
        },
            
        hideExport:{ // 隱藏匯出按鈕
            type: Boolean,
            default: false,
        },
        hideCreate:{ // 隱藏新增按鈕
            type: Boolean,
            default: false,
        },
        hideDefaultHeader: {
            type: Boolean,
            default: false,
        },
        createButtonText: { // 創建按鈕的文字
            type: String,
            default: "新增資料"
        },

        actions: { // 顯示方式
            type: Array,
            default: () => ['read', 'update', 'delete']
        },

        
      
    },

    inject: { // 由ParentComponent 透過 provide傳遞
        tableHeaderBackgroundColor: {
            type: String,
            default: '#ebc89f',
        },
        tableHeaderTextColor: {
            type: String,
            default: 'black',
        },
    },


    data(){
        return {
            footerProps: { // Footer設定
                "itemsPerPageOptions": [
                { text: '全部', value: -1 },
                { text: '10筆', value: 10 },
                { text: '30筆', value: 30 },
                { text: '50筆', value: 50 },
                { text: '100筆', value: 100 },
                { text: '200筆', value: 200 }
                ], // -1: 代表全部
                "items-per-page-text": "單頁筆數：",
                "items-per-page-all-text": "全部",
                "show-current-page": true,
                "show-first-last-page": true,
                "first-icon": "mdi-skip-previous-circle",
                "last-icon": "mdi-skip-next-circle",
                "prev-icon": "mdi-arrow-left-drop-circle",
                "next-icon": "mdi-arrow-right-drop-circle",
            },

            //#region (欄位顯示)
            show_header_menu: false,
            selectedHeaders: [], // 被選擇顯示的欄位 (text) => 預設會被全部讀取
            //#endregion

            // 搜尋的內容
            search: '',

            // 勾選列內容
            selected: [],

            expanded: [],

            // 該子組件專門使用的，最後會 $emit回去
            emitOptions: {},


            
        }
    },

    computed: {
        table_height(){
            const { height, rwd_name } = this
            const map_height = {
                'xs': '400',
                'sm': '500',
                'md': '600',
                'lg': '700',
                'xl': '800',
            }

            return height || map_height[rwd_name]
        },

        actions_buttons(){
            return [
                {
                    title: '瀏覽', 
                    icon: 'mdi-eye', icon_color: 'grey darken-1', 
                    tooltip_color: 'grey lighten-2', 
                    btn_color: 'blue-grey lighten-4', 
                    onClick: this.read,
                    hide: !this.actions.includes("read")
                },
                {
                    title: '修改', 
                    icon: 'mdi-pencil', icon_color: 'primary darken-1', 
                    tooltip_color: 'blue lighten-4', 
                    btn_color: 'primary lighten-4', 
                    onClick: this.update,
                    hide: !this.actions.includes("update")
                },
                {
                    title: '刪除', 
                    icon: 'mdi-delete', icon_color: 'error darken-1', 
                    tooltip_color: 'error lighten-4', 
                    btn_color: 'error lighten-4', 
                    onClick: this.delete,
                    hide: !this.actions.includes("delete")
                },
            ]
        } 
    },

    watch: {
        headers: { // 表頭有改變
            deep: true,
            handler(newVal){
                // 預設選擇顯示的Header: 全部
                this.selectedHeaders = JSON.parse(JSON.stringify(newVal))
            },
        },
    },

    mounted(){
        // 預設選擇顯示的Header: 全部
        this.selectedHeaders = JSON.parse(JSON.stringify(this.headers))
        
        // 預設將設定都給讀取
        this.emitOptions = JSON.parse(JSON.stringify(this.options))
    },

    methods: {
        //#region (篩選查看的欄位)
        changeSelect(selected){ // Select Component @emit
            this.selectedHeaders = selected
        },
        //#endregion

        //#region (影響Option並重新呼叫API)
        // 將 options返回
        emitUpdateOptions(){
            if(!this.loading){ // 透過 loading => 避免重複呼叫API的情況
                this.$emit('emitUpdateOptions', this.emitOptions)
            }
        },

        // 切換頁數
        updatePage(page){ // 往哪一頁前進
            // console.log("💣💣💣updatePage");
            this.emitOptions['page'] = page
            this.$emit('emitUpdateOptions', this.emitOptions)
        },

         // 變換單頁顯示筆數
        updateItemsPerPage(value){
            // console.log(`😭😭updateItemsPerPage: ${value}`);
            this.emitOptions['page'] = 1
            this.$emit('emitUpdateOptions', this.emitOptions)
        },

        
        // 清除排序功能
        clearSortable(){
            this.emitOptions['sortBy'] = []
            this.emitOptions['sortDesc'] = []
            this.$emit('emitUpdateOptions', this.emitOptions)
        },
        //#endregion
        
        //#region (搜尋內容)
        // 搜尋
        goSearch(search){
            this.cancelFocus() // 取消 text-field的 focus
            this.emitOptions['page'] = 1 // 也要變第一頁
            this.emitOptions['search'] = search
            this.$emit('emitUpdateOptions', this.emitOptions)
        },
        
        // 清空
        clearSearch(){
            this.cancelFocus() // 取消 text-field的 focus
            // 清空搜尋內容
            this.emitOptions['search'] = null
        },

     
        // 取消 focus
        cancelFocus(){
            const el = this.$refs['table-search']
            el.blur()
        },

        //#endregion

        // 匯出成 Excel
        exportExcel(mode='all'){
            // mode = all: 全部匯出
            // mode = select: 依照選項匯出
            const { selectedHeaders, selected } = this

            // 依照匯出狀態匯出
            const select = mode === 'select' 
                            ? selected.map(select=>select['id'])
                            : []

            const emitData = {
                headers: selectedHeaders, // 當前顯示的欄位
                select: select, // 已選擇的數據ID
            }
            this.$emit('export', emitData)
        },

        //#region (CRUD $emit)
        create(){
            this.$emit('create')
        },  
        read(id){
            this.$emit("read", id)
        },
        update(id){
            this.$emit("update", id)
        },
        delete(id){
            this.$emit("delete", id)
        },

        //#endregion



        //#region (select)
        // [select] 被勾選時的觸發樣式
        itemRowBackground(item) { // 觸發背景顏色
            const idx = this.selected.findIndex( (select) => select['id'] === item['id'] )
            return idx !== -1 ? 'amber lighten-3 select-row' : ''
        },
        // 刪除單一選擇的數據
        deleteSelect(select){
            this.selected = this.selected.filter(item => item['id'] !== select['id'])
        },
        //#endregion

        //#region (expand)
        toggleExpand(item) {
            item.isExpanded = !item.isExpanded;
        },

        //#endregion





    },


}
</script>


<style scoped>
    /* Header欄位的樣式 */
    .data-table >>> .v-data-table__wrapper thead th{
        font-size: 1rem;
        font-weight: bolder;
    }

     /* 表格標題 (固定欄不要動到) */
     .data-table >>> .v-data-table__wrapper thead th:not(.header-freeze){
        background-color: v-bind('tableHeaderBackgroundColor') !important;
        color: v-bind('tableHeaderTextColor') !important;
    }
  
    /* 固定在最左邊 (得這樣設定) */
    .data-table >>> .v-data-table__wrapper thead th.active-left,
    .data-table >>> .v-data-table__wrapper tbody tr td{
        left: 0 !important;
    }

    /* sticky-column */
    /* Body (odd、event) */
    .data-table >>> .v-data-table__wrapper tbody tr:nth-of-type(odd):not(.select-row) td.sticky-column  {
        background-color: #dfe4ea !important;
    }
    .data-table >>> .v-data-table__wrapper tbody tr:nth-of-type(even):not(.select-row) td.sticky-column  {
        background-color: #ecf0f1 !important;
    }

    /* select樣式處理 */
    /* Head */
    .data-table >>> .v-data-table__wrapper thead th:has(.v-data-table__checkbox) {
        background-color: #fff !important;
    }

    /* Body (odd、event) */
    .data-table >>> .v-data-table__wrapper tbody tr:nth-of-type(odd):not(.select-row) td:has(.v-data-table__checkbox)  {
        background-color: #dfe4ea !important;
    }
    .data-table >>> .v-data-table__wrapper tbody tr:nth-of-type(even):not(.select-row) td:has(.v-data-table__checkbox)  {
        background-color: #ecf0f1 !important;
    }

    /* 被選擇的Fixed樣式。(沒有Fixed透過上面的函式處理了) */
    .data-table >>> .v-data-table__wrapper tbody tr.select-row td{
        background-color: #FFE082 !important;
    }

</style>