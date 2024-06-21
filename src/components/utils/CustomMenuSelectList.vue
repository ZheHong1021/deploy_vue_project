<template>
    <v-list>
        <!-- 表頭 -->
        <v-list-item disabled>
            <!-- Avatar Icon -->
            <v-list-item-avatar color="grey lighten-3">
                <v-icon>{{ icon }}</v-icon>
            </v-list-item-avatar>

            <!-- 內容 -->
            <v-list-item-content>
                <v-list-item-title class="font-weight-black text-subtitle-2">
                    {{ itemTitle }} 
                </v-list-item-title>
                <v-list-item-subtitle class="d-flex flex-wrap" style="gap: 0.5rem;">
                    <v-chip rounded small color="success">已選: {{ selectedList.length }}</v-chip>
                    <v-chip rounded small color="deep-orange darken-1" class="white--text">總共: {{ items.length }}</v-chip>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider class="mt-2"></v-divider>

        <!-- 全選 -->
        <v-list-item v-if="allowToggle" ripple @mousedown.prevent @click="toggle">
            <v-list-item-action>
                <v-icon :color="items.length > 0 ? 'indigo darken-4' : ''">
                {{ select_All_Icon }}
                </v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title>
                    全選
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        
        <!-- 逐一列表(各欄位勾選) -->
        <v-list-item-group v-model="selectedList" 
            multiple 
            active-class="primary--text"
            class="list-group-container">
            <template v-for="header in items" >
                <!-- disabled: [value, ...] -->
                <v-list-item 
                    :disabled="itemDisabled(header[itemValue])"
                    :value="header[itemValue]"
                    :key="header[itemValue]"
                    @click="change(header)">
                        <template v-slot:default="{ active }">
                            <!-- Checkbox -->
                            <v-list-item-action>
                                <v-checkbox 
                                    :input-value="active" 
                                    :color="getCheckboxColor(header[itemText])">
                                </v-checkbox>
                            </v-list-item-action>
                            
                            <!-- 主題 -->
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ header[itemText] }}
                                    <small 
                                        v-if="itemDisabled(header[itemValue])" 
                                        class="red--text font-weight-black">
                                            (*必選)
                                    </small>
                                </v-list-item-title>
                            </v-list-item-content>
                            
                            <!-- 備註(大多數用不到) -->
                            <v-list-item-action v-if="type === '排程'">
                                <v-chip class="white--text font-weight-black"
                                    :color="get_type_schedule(header)['color']">
                                    {{ get_type_schedule(header)['text']}}
                                </v-chip>
                            </v-list-item-action>
                        </template>
                </v-list-item>
            </template>
        </v-list-item-group>
    
    </v-list>
</template>

<script>
export default {
    name: "CustomMenuSelectList",
    props: {
        selected: { // 目前選擇的內容 => [<Object1>, <Object2>]
            type: Array,
            default: ()=> []
        },
        items: { // 全部內容
            type: Array,
            default: ()=> []
        },
        disabled_select: { // 不允許被勾選跟取消勾選 => [<value1>, ]
            type: Array,
            default: ()=> []
        },

        itemTitle: { // 標題
            type: String,
            default: '',
        },
        itemValue:{ // value: 當成值的屬性名稱
            type: String,
            default: 'value',
        },
        itemText: { // text: 的屬性名稱
            type: String,
            default: 'text',
        },

        icon: {
            type: String,
            default: 'mdi-calendar-month',
        },
        iconColor: {
            type: String,
            default: 'grey--text',
        },

        allowToggle: { // 允許全選功能
            type: Boolean,
            default: true
        },

        type:{ 
            type: String,
            default: '', // 預設空字串
        }

    },
    data(){
        return {
            // 用來觸發 v-list-item-action > v-checkbox使用
            // !!! 這邊只能用純Array (使用value)
            selectedList: [], 
        }
    },
    watch:{
        selected:{
            deep: true,
            handler(newVal){
                this.selectedList = newVal.map(item => item[this.itemValue])
            }
        }
    },
    mounted(){
        this.selectedList = this.selected.map(item => item[this.itemValue])
    },

    computed:{
        selectedDisabledList(){ // 被 Disabled的select
            const { disabled_select, selected, itemDisabled, itemValue } = this
            // 如果沒有 disabled值 => 回傳空陣列
            if(!disabled_select.length === 0) return []

            // 如果有值 => filter出disabled的 header
            return selected.filter(item => itemDisabled(item[itemValue]))
        },
        select_All_Items () { // 全選中
            return this.selectedList.length === this.items.length
        },
        select_Some_Items () { // 有選但沒全選
            return this.selectedList.length > 0 && !this.select_All_Items
        },
        select_All_Icon () { // 全選圖案
            if (this.select_All_Items) return 'mdi-close-box' // 全選時的icon
            if (this.select_Some_Items) return 'mdi-minus-box' // 有選時的icon
            return 'mdi-checkbox-blank-outline' // 都未選的icon
        },
    },

    methods: {
        // 檢查該值是否為 disabled
        itemDisabled(val){
            const {disabled_select} = this
            return disabled_select.includes(val)
        },

        change(select){
            const { itemValue } = this

            if(this.selectedList.find((value) => value === select[itemValue])){
                this.selectedList = this.selectedList.filter((value) => value !== select[itemValue] )
            }else{ // 尚未存在 => 要新增
                this.selectedList.push(select[itemValue])
            }

            // 上面 selectedList處理的都是純陣列: [<value1>, <value2>, ...]
            // 但我們要傳回Object in Array，透過 items + filter處理
            const return_selects = this.items.filter( (item) => this.selectedList.includes(item[itemValue]) )
            this.$emit("change", return_selects)
        },

        // 全選Toggle
        toggle () {
            this.$nextTick(() => {
                const toggle_selected = this.select_All_Items // 如果當前狀態為全選
                                    ? this.selectedDisabledList // (true): 改為全部取消勾選只留下disabled欄位
                                    : this.items // (false): 全部都選擇
                
                // 這邊是 Component這邊需要顯示使用 [<value1>, <value2>]
                this.selectedList = toggle_selected.map((select) => select[this.itemValue])
                this.$emit("toggle", toggle_selected)
            })
        },


        // 得到 checkbox的顏色
        getCheckboxColor(header) {
            return this.itemDisabled(header[this.itemValue]) ? 'grey lighten-1' : 'primary';
        },

        // 得到 type = '排程'的情況
        get_type_schedule(header){
            const { is_new_pool, status } = header
            if(is_new_pool){ // 新池
                return {
                    color: 'error',
                    text: '新池',
                }
            }

            if(status >= 1){ // 運作
                return {
                    color: 'primary',
                    text: '運作',
                }
            }
            return { // 空池
                color: 'grey',
                text: '空池',
            }
        },

        
    },
}
</script>

<style scoped>
    .list-group-container{
        overflow-y: auto; 
        max-height: 300px;
    }

</style>