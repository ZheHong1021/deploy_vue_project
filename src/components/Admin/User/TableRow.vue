<template>
  <tr>
    <template v-for="header in headers">
        <!-- Expand -->
        <td v-if="header['value'] === 'data-table-expand'"
            class="data-table-expand-column"
            :key="header['value']">

            <v-btn icon @click="expand(!isExpanded)" 
                :disabled="!checkHasChildren(item)"
                :color="isExpanded 
                            ? 'purple' 
                            : checkHasChildren(item)
                                ? 'primary' : ''
                        "
                >
                <v-icon >{{ isExpanded ? 'mdi-arrow-up-drop-circle' : 'mdi-arrow-down-drop-circle' }}</v-icon>
            </v-btn>
        </td>

        <!-- name -->
        <td v-else-if="header['value'] === 'name'"
            :class="`column-depth-${depth}-padding`"
            :key="header['value']">
            {{ item[header.value] }}
        </td>

        <!-- age -->
        <td v-else-if="header['value'] === 'age'" style="width: 150px;"
            :key="header['value']">
            <v-chip color="amber">{{ item[header.value] }}</v-chip>
        </td>
        <!-- age -->
        <td v-else-if="header['value'] === 'icon'" style="width: 150px;"
            :key="header['value']">
            <v-icon>{{ item[header.value] }}</v-icon>
        </td>

        <td v-else style="width: 150px;"
            :key="`${header['value']}-2`">
            {{ item[header.value] }}
        </td>
    </template>
</tr>
</template>

<script>
export default {
    name: "TableRow",
    props: {
        item: {
            type: Object,
            default: () => {}
        },
        headers: {
            type: Array,
            default: () => []
        },
        expand: {
            type: Function,
            default: undefined
        },
        isExpanded: {
            type: Boolean,
            default: false
        },
        depth: {
            type: Number,
            default: 1,
        },
    },
    data(){
        return {

        }
    },
    methods: {
        checkHasChildren(item){
            return item['children'] && item['children'].length > 0
        },
    }
}
</script>

<style scoped>
    td.data-table-expand-column{
        width: 50px;
    }

    td.column-depth-1-padding{
        padding-left: 1rem !important;
    }
    td.column-depth-2-padding{
        padding-left: 2rem !important;
    }
    td.column-depth-3-padding{
        padding-left: 3rem !important;
    }
    td.column-depth-4-padding{
        padding-left: 4rem !important;
    }

</style>