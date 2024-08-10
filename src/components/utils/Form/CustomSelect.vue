<template>
    <v-select
        :items="items"
        :loading="loading"
        loader-height="4"
        :label="label"
        :item-text="itemText"
        :item-value="itemValue"
        outlined
        :rules="rules"
        no-data-text="無任何可選擇資料"
        :menu-props="{ bottom: true, offsetY: true }">
    </v-select>
</template>

<script>
export default {
    name: "CustomSelect",
    props: {
        value: {
            type: [String, Number, Object],
            default: null,
        },

        label: {
            type: String,
            default: "請選擇內容"
        },

        items: {
            type: Array,
            default: () => []
        },

        loading: {
            type: Boolean,
            default: true
        },

        rules: {
            type: Array,
            default: () => []
        },

        itemText: {
            type: String,
            default: "text"
        },

        itemValue: {
            type: String,
            default: "value"
        }

    }
}
</script>

<style>

</style>