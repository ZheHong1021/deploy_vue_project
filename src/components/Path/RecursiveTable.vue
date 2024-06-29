<template>
  <v-data-table
        class="data-table"
        :headers="headers"
        :items="items"
        :expanded.sync="expanded"
        item-key="name"
        single-expand
        show-expand
        :hide-default-header="hideDefaultHeader"
        hide-default-footer>

        <template v-slot:item="{ item, headers, expand, isExpanded }">
            <TableRowVue
                :class="{ 'green lighten-5' : isExpanded}"
                :item="item"
                :headers="headers"
                :expand="expand"
                :isExpanded="isExpanded"
                :depth="depth"
            ></TableRowVue>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <RecursiveTable 
                    :items="item['children']"
                    :headers="headers"
                    hide-default-header
                    :depth="depth + 1">
                </RecursiveTable>
            </td>
        </template>
    </v-data-table>
</template>

<script>
import TableRowVue from './TableRow.vue'
export default {
    name: "RecursiveTable",
    props: {
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
        }
    },
    components: {
        TableRowVue
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