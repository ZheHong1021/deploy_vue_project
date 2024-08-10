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
    ></v-textarea>
</template>

<script>
export default {
    name: "CustomTextArea",
    props: {
        value: {
            type: [String],
            default: null,
        },

        label: {
            type: String,
            default: "請填寫內容"
        },

        placeholder: {
            type: String,
            default: "請開始填寫您想輸入的內容"
        },

        rules: {
            type: Array,
            default: () => []
        },

        rows: {
            type: Number,
            default: 4
        },

        rowHeight: {
            type: Number,
            default: 30
        },

        shaped: {
            type: Boolean,
            default: false,
        },

        clearable: {
            type: Boolean,
            default: false,
        },


    }
}
</script>

<style>

</style>