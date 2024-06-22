<template>
    <v-expand-transition class="elevation-10">
            <v-card class="bottom-sheet elevation-10 py-0" v-show="table_selected.length > 0">
                <v-card-title class="font-weight-black text-subtitle-1 py-2"">
                    <div class="d-flex align-center">
                        <span>匯出選擇</span>
                        
                        <v-chip color="indigo darken-1" :small="is_mobile"  
                            label outlined class="ml-2 text-caption text-sm-subtitle-2 font-weight-bold">
                            數量: {{ table_selected.length }}
                        </v-chip>
                    </div>

                    <v-spacer></v-spacer>

                    <!-- 按鈕功能 -->
                    <div class="d-flex gap-2 align-center flex-wrap" >
                        <!-- 清空按鈕 -->
                        <v-tooltip top color="error darken-3">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                    v-bind="attrs" v-on="on"
                                    color="error darken-1" small @click="deleteAllSelect">
                                    <v-icon small color="white" class="mr-1">mdi-delete</v-icon>
                                    <span class="white--text font-weight-black">清空</span>
                                </v-btn>
                            </template>
                            <span>清空所有已選選項</span>
                        </v-tooltip>


                        <!-- 匯出按鈕 -->
                        <v-tooltip top color="indigo darken-3">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn 
                                v-bind="attrs" v-on="on"
                                    color="indigo" small @click="exportBtnSet">
                                    <v-icon small color="white" class="mr-1">mdi-download</v-icon>
                                    <span class="white--text font-weight-black">匯出</span>
                                </v-btn>
                            </template>
                            <span>匯出已選擇{{ table_selected.length }}個項目</span>
                        </v-tooltip>

                        
                        <!-- Expand Event(全螢幕時不用出現) -->
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn class="expand-btn"
                                    v-bind="attrs" v-on="on"
                                    icon @click="is_expand_bottom = !is_expand_bottom">
                                    <v-icon>{{ get_expand_icon() }}</v-icon>
                                </v-btn>
                            </template>
                            <span>{{ is_expand_bottom ? '隱藏選項列表' : '顯示選項列表' }}</span>
                        </v-tooltip>
                    </div>
                </v-card-title>

                <v-divider></v-divider>

                <!-- 顯示列表 -->
                <v-card-text class="d-flex black--text py-0">
                    <v-expand-transition>
                        <!-- 包裝容器 -->
                        <div class="pa-2 bottom-expand-box" v-show="is_expand_bottom">
                            
                            <!-- 透過迴圈將單一數據(item)回傳會去進行樣式的遍及 -->
                            <!-- <slot 
                                v-for="item in table_selected"
                                name="expand" 
                                :item="item" 
                            /> -->

                            <v-alert 
                                v-for="item in table_selected" 
                                :key="item['id']"
                                color="indigo lighten-5" 
                                elevation="2" 
                                width="100%" 
                                class="mb-0 px-2"
                                >
                                <v-row align="center" class="px-3">
                                    <v-col class="grow">
                                        <!-- 客製化內容 -->
                                        <slot name="expand" :item="item"/>
                                    </v-col>
                                
                                    <!-- 刪除 -->
                                    <v-col class="shrink">
                                        <v-tooltip top>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn v-bind="attrs" v-on="on"
                                                    icon @click="deleteSelect(item)">
                                                    <v-icon>mdi-close-circle</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>清除該選項</span>
                                        </v-tooltip>
                                    </v-col>
                                </v-row>
                            </v-alert>
                            
                           
                        </div>
                    </v-expand-transition>
                </v-card-text>
            </v-card>
        </v-expand-transition>
</template>

<script>
export default {
    name: "CustomTableSelectExpand",
    props: {
        table_selected: { // 目前表格選取的資訊
            type: Array,
            default: () => []
        }
    },

    data(){
        return {
            // 顯示 / 隱藏列表
            is_expand_bottom: true,
        }
    },

    computed: {

    },

    methods: {

        // expand Icon
        get_expand_icon(){
            const { is_expand_bottom } = this
            return is_expand_bottom 
                    ? 'mdi-arrow-down-drop-circle' // 開啟時
                    : 'mdi-arrow-up-drop-circle' // 關閉時
        },

        // 匯出按鈕
        exportBtnSet(){ 
            this.$emit("export") // 回傳Parent Component進行匯出
        },

        // 刪除選項
        deleteSelect(select){
            this.$emit('delete', select) // 回傳Parent Component進行刪除
        },
        
        // 刪除全部選項
        deleteAllSelect(){
            this.$emit('delete-all') // 回傳Parent Component進行刪除
        },
    },

}
</script>

<style scoped>
    /* 整個區塊的容器 */
    .bottom-sheet{
        max-width: 400px;
        width: 100%;
        z-index: 10;
        position: fixed;
        bottom: 1.5rem;
    }

    @media screen and (min-width: 650px) {
        .bottom-sheet{
            right: 1.5rem;
        } 
    }

    @media screen and (max-width: 500px) {
        .bottom-sheet{
            width: 80%;
            bottom: 0;
        } 
    }

    /* 匯出列表的容器 */
    .bottom-expand-box{
        height: 150px;
        max-height: 150px;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }



</style>