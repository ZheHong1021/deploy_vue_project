<template>
  <v-data-table
        class="data-table"
        :loading="loading"
        :headers="headers"
        :items="items"
        :expanded.sync="expanded"
        item-key="id"
        single-expand
        show-expand
        :hide-default-header="hideDefaultHeader"
        hide-default-footer>

        <template v-slot:item="{ item, headers, expand, isExpanded }">
            <MenuTableItem
                :item="item"
                :headers="headers"
                :expand="expand"
                :isExpanded="isExpanded"
                :depth="depth"
                :actions_buttons="actions_buttons"
            ></MenuTableItem>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <MenuRecursiveTable 
                    v-if="item['children'] && item['children'].length > 0"
                    :items="item['children']"
                    :headers="headers"
                    :loading="loading"
                    hide-default-header
                    :actions_buttons="actions_buttons"
                    :depth="depth + 1">
                </MenuRecursiveTable>
            </td>
        </template>
    </v-data-table>
</template>

<script>
import MenuTableItem from './MenuTableItem.vue'
export default {
    name: "MenuRecursiveTable",
    props: {
        loading: {
            type: Boolean,
            default: true
        },
        items: {
            type: Array,
            default: () => []
        },
        headers: {
            type: Array,
            default: () => []
        },
        hideDefaultHeader: {
            type: Boolean,
            default: false,
        },
        depth: {
            type: Number,
            default: 1,
        },
        actions_buttons: {
            type: Array,
            required: () => [],
        },
    },
    components: {
        MenuTableItem
    },
    data(){
        return {
            expanded: [],
        }
    },

    
}
</script>

<style scoped>

</style>