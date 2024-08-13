<template>
    <!-- 透過 @input:進行雙向連線 -->
    <v-textarea
        outlined
        :label="label"
        :rows="rows"
        :row-height="rowHeight"
        :clearable="clearable"
        clear-icon="mdi-close-circle"
        no-resize
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event)"
        :readonly="readonly"
    ></v-textarea>
</template>

<script>
export default {
    name: "CustomTextArea",
    props: {
        value: { // 填寫內容
            type: [String],
            default: null,
        },

        label: { // 標籤
            type: String,
            default: "請填寫內容"
        },

        placeholder: { // 填寫提示
            type: String,
            default: "請開始填寫您想輸入的內容"
        },

        rules: { // 填寫規則
            type: Array,
            default: () => []
        },

        rows: { // 共幾列
            type: Number,
            default: 4
        },

        rowHeight: { // 單列高度
            type: Number,
            default: 30
        },

        shaped: { // 邊框變橢圓
            type: Boolean,
            default: false,
        },

        clearable: { // 允許刪除全部內容
            type: Boolean,
            default: false,
        },

        readonly: { // 唯讀
            type: Boolean,
            default: false,
        },


    }
}
</script>

<style>

</style>