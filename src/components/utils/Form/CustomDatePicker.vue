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
                        class="date-picker-text-field"
                        :style="`width: ${width}`"
                        :clearable="clearable"
                        clear-icon="mdi-close-circle"
                        @click:clear="clearDateIdx"
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
                    show-current
                ></v-date-picker>

                <!-- 詳細資訊 -->
                <slot name="detail"></slot>

                <!-- 日期範圍篩選提示功能 -->
                <div v-if="range" 
                    class="d-flex flex-wrap justify-center align-center grey lighten-3 pa-4" >
                    <v-icon color="primary" left small>mdi-information</v-icon>
                    <!-- 選擇第一個日期時 (通常會為 null 或是 []) -->
                    <!-- 或是已經選完 .length === 2 -->
                    <span v-show="!value || value.length === 2" class="text-subtitle-2">
                        請先選擇第一個日期
                    </span>
                    
                    <!-- 選擇第二個日期時 (通常會為 [<date1>, ]) -->
                    <span v-show="value && value.length === 1" class="text-subtitle-2">
                        請再選擇第二個日期，形成日期範圍
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
            value: null,
        }
    },

    watch: { // 監聽主要v-model資料在 ParentComopnent有無變動
        date_idx: {
            immediate: true,
            handler(newVal){
                this.value = this.date_idx
            }
        }   
    },


    computed: {
        date_str:{
            get(){
                return this.range
                        ? this.value 
                            ? this.value.join('~') // 複選
                            : null
                        : this.value // 單選
            },

            set(val){ // 通常事變空值
                this.value = this.range
                                    ? [] // 複選
                                    : null // 單選
            },
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

        emitEvent($event){
            this.$emit('input', $event)
        },

        // 修改日期的Event
        ChangeDatePicker(date){
            this.menu = false // 確定選取完成後 => 關閉 menu
            
            // 如果是複選 => 需要將日期做排序
            if(this.range){
                date = date.sort( (a, b) => new Date(a) - new Date(b) )
            }

            this.emitEvent(date)
        },


        // 直接清除
        clearDateIdx(){
            this.emitEvent(null)
        },
    },
}
</script>

<style lang="scss" scoped>

</style>