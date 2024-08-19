<template> 
    <v-text-field
        :value="value"
        outlined
        :background-color="backgroundColor"
        :label="label"
        :placeholder="placeholder"
        @input="$emit('input', $event)"
        prepend-inner-icon="mdi-magnify"
        :clearable="clearable" clear-icon="mdi-close-circle"
        hide-details>

    </v-text-field>
</template>

<script>
export default {
    name: "CustomSearchBox",
    props: {
        value: {
            type: String,
            default: null,
        },
        backgroundColor: {
            type: String,
            default: "white",
        },
        label: {
            type: String,
            default: "搜尋",
        },
        placeholder: {
            type: String,
            default: "請搜尋文字",
        },
        clearable: {
            type: Boolean,
            default: false,
        },
    },
    data(){
        return {

        }
    },
}
</script>

<style>

</style>