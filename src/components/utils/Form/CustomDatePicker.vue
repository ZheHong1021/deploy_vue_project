<template>
    <div>
        <!-- Dialog -->
        <v-dialog 
            ref="dialog" v-model="menu" width="290px">
                <!--  主要顯示內容 -->
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        v-model="date_str"
                        :label="label"
                        prepend-inner-icon="mdi-calendar"
                        readonly v-bind="attrs" v-on="on"
                        :filled="filled"
                        :outlined="outlined"
                        :hide-details="hideDetails" 
                        :background-color="backgroundColor"
                        :style="{
                            'width': width
                        }"
                        :clearable="clearable" clear-icon="mdi-close-circle"
                        :rules="rules"
                        :disabled="disabled"
                    ></v-text-field>
                </template>

                <!-- 日期 -->
                <v-date-picker
                    :value="value"
                    :type="type"
                    :range="range"
                    @change="ChangeDatePicker"
                    @input="$event => $emit('input', $event)"
                    :allowed-dates="allowedDates"
                    :events="events"
                    :event-color="eventColor"
                    :header-color="headerColor"
                    :color="color"
                    locale="zh-tw"
                    show-current>
                </v-date-picker>

                <!-- 詳細資訊 -->
                <slot name="detail"></slot>

                <!-- 日期範圍篩選提示功能 -->
                <div v-if="range" 
                    class="d-flex flex-wrap justify-center align-center grey lighten-3 pa-4" >
                    <v-icon color="primary" left small>mdi-information</v-icon>
                    <!-- 選擇第一個日期時 (通常會為 null 或是 []) -->
                    <!-- 或是已經選完 .length === 2 -->
                    <span v-show="isNoSelectOrSelectAll" class="text-subtitle-2">
                        {{ is_no_select_or_select_all_text }}
                    </span>
                    
                    <!-- 選擇第二個日期時 (通常會為 [<date1>, ]) -->
                    <span v-show="isOnlySelectOne" class="text-subtitle-2">
                        {{ is_only_select_one_text }}
                    </span>
                </div>

        
        </v-dialog> 


    </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
    name: "CustomDatePicker",
    props: {
        value: { // 值
            type: [Array, String],
            default: null
        },
        
        type: { // 日 / 月
            type: String,
            default: 'date' // date / month
        },

        range: { // 是否為複選
            type: Boolean,
            default: false,
        },

        label: { // text-field的 label
            type: String,
            default: "請選擇欲搜尋的日期範圍",
        },

        backgroundColor: { // 背景顏色
            type: String,
            default: 'white'
        },

        headerColor: { // date-picker header color
            type: String,
            default: "grey darken-2"
        },

        color: { // date-picker color
            type: String,
            default: "grey"
        },

        filled: {
            type: Boolean,
            default: true,
        },

        outlined: {
            type: Boolean,
            default: false,
        },

        events: { // 點點
            type: [Array, Function],
            default: undefined
        },

        eventColor:{ // 點點顏色
            type: String,
            default: "black"
        },

        min: { // 最小顯示年分
            type: Number,
            default: undefined
        },
        max: { // 最大顯示年分
            type: Number,
            default: undefined
        },

        width: { // text-field 寬度
            type: String,
            default: '300px'
        },

        clearable: { // 允許 text-field可以進行清除
            type: Boolean,
            default: false
        },

        hideDetails: { // 是否要隱藏提示
            type: Boolean,
            default: false,
        },

        rules: { // 限定規則
            type: Array,
            default: ()=> []
        },

        disabledFuture: { // 不能選擇外來日期
            type: Boolean,
            default: true,
        },

        disabled: { // 不能選擇外來日期
            type: Boolean,
            default: false,
        }

    },

    data(){
        return {
            menu: false, // 開關
            is_no_select_or_select_all_text: "請先選擇第一個日期",
            is_only_select_one_text: "請再選擇第二個日期，形成日期範圍",
        }
    },

    computed: {
        date_str:{ // 輸入框中的文字內容
            get(){
                // 單選
                if(!this.range) return this.value
                // 複選
                return this.value
                        ? this.value.join('~')
                        : null
            },
            set(val){ // 變成空
                this.clearDateIdx()
            },
        },

        isNoSelectOrSelectAll(){ // 均未選擇或全選了 => 請選擇第一個日期
            const { value } = this
            return !value || value.length === 0 || value.length === 2
        },

        isOnlySelectOne(){ // 只選一個日期 => 請再選擇第二個日期，形成日期範圍
            const { value } = this
            return value && value.length === 1
        },

    },

    methods: {
         // 只允許今天(含)以前的日期能選擇
        allowedDates(val){
            // 代表可以選擇
            if(!this.disabledFuture){
                return val
            }

            const targetDate = dayjs(val); // 替换为您要计算的目标日期
            const today = dayjs();
            const diffInDays = today.diff(targetDate, 'day', true);
            return diffInDays >= 0 // 大於等於0才可以進行
        },


        // 修改日期的Event
        ChangeDatePicker(date){
            this.menu = false // 確定選取完成後 => 關閉 menu
            // 如果是複選 => 需要將日期做排序
            if(this.range){
                date = date.sort( (a, b) => new Date(a) - new Date(b) )
            }
            this.$emit('change', date) // 這邊依照日期用@change比較合適
        },


        // 清空日期
        clearDateIdx(){
            const clear_date_idx = this.range
                                    ? []
                                    : null
            this.$emit('input', clear_date_idx) // 注意這邊要使用@input
        },
    },
}
</script>

<style lang="scss" scoped>

</style>